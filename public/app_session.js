const { assign, omit } = require('utils/object');
const { init, login }= require('./app_requests');

let _app = null;
let _params = null;

//方法：扩展 _params
const extendMyParams = (...args)=>{
  _params = assign.apply({}, [_params].concat(args));
  _params = omit(_params, 'errMsg', 'rawData'/*, 'requesting', 'locale'*/);
};

//方法：登录并获取第三方信息
const loginAndGetExt = (succCallback, failCallback)=>{
  wx.p.login().then(loginRes=>{
      if (!loginRes.code) {
        failCallback(loginRes.errMsg);
        return;
      }
      wx.p.getExtConfig()
        .then(extCfgRes=>{
			const obj = assign({}, loginRes, extCfgRes);
			console.log('[app.js] login & getExtConfig :', obj);
			succCallback(obj);
        })
        .catch(ex=>failCallback(_app.locale.userInfoModal.extFail));
    })
    .catch(failCallback);
};

//方法：session失效后的重新请求
const onSessionFail = ()=>{
  const launchParams = wx.getStorageSync('launch_params');
  const localLoginState = wx.getStorageSync('login_state');
  const localUserInfo = wx.getStorageSync('user_info');

  loginAndGetExt(obj=>{
    extendMyParams(launchParams, obj, localUserInfo);

    init(_app, _params, result=>{ //fetch
      wx.setStorageSync('global_data', result);
      const isValid = !!localUserInfo
        && result.hasOwnProperty('login_state');

      if (isValid) {
        extendMyParams(result);
        finish(false); //case b
        return;
      }
      confirmLogin(result);
    });
  }, errMsg=>{
    _app.alert(errMsg);
  });
};

//方法：提示用户需要授权
const confirmLogin = (result)=>{
	console.log('[app] call confirmLogin ')
	wx.removeStorageSync('login_state');
	wx.removeStorageSync('user_info');
	const { msg, btn } = result.login_confirm;
	setTimeout(()=>{
		wx.p.showAuthorize(msg, btn);
	}, 500);
};

//方法：结束初始化,转入首页
const finish = (isFromLocal=false)=>{
	if (!isFromLocal) {
		wx.setStorageSync('login_state', _params.login_state);
		assign(_app.globalData, _params);
	}
	return;

	let url = getCurrentPages().length ? 
		getCurrentPages()[getCurrentPages().length-1].route : 
		_params.path;
		url = url.replace(/^\/*/, '/');
		console.log(url, 'url relanuch')

	if (_params.query) {
		url += '?' + Object.keys(_params.query)
		.map(item=>`${item}=${encodeURIComponent(
			decodeURIComponent(_params.query[item])
		)}`)
		.join('&');
	}

	console.log('[app.js] reLaunch url', url);

	setTimeout(()=>{
		wx.p.reLaunch({url})
		.then(res=>console.log("reLaunch succ", _app.globalData.login_state))
		.catch(ex=>console.log("reLaunch fail", ex))
		.finally( ()=>{
			console.log('CHK SESSION FINISH', _app.initializing);
			if (_app.hasOwnProperty('initializing')) {
			_app.initializing = false;
			delete _app.initializing;
			}
		} );
	}, 500);

};

//方法：用户已经授权后(由authorize组件调用)
const onUserinfoGot = (userinfo)=>{
  console.log('用户已经授权后', userinfo);

  wx.setStorageSync('user_info', userinfo);
  extendMyParams(userinfo);

  loginAndGetExt(obj=>{
    extendMyParams(obj);

    login(_app, _params, result=>{ //fetch
      console.log('[app.js] fetch login', _params, result);
	  extendMyParams({isAuthorize: true});
      extendMyParams(result);
      finish(false); //case c
    });
  }, errMsg=>{
    _app.alert(errMsg);
  });
};

//方法：打开 App 后的身份检查
const checkAfterAppLaunch = (app, launchParams)=>{ 
  _app = app;
  _app.initializing = true;
  let isAuthroze = false;

  return wx.p.checkSession()
    .then(res=>{
      const localGlobalData = wx.getStorageSync('global_data');
      const localLoginState = wx.getStorageSync('login_state');
      const localUserInfo = wx.getStorageSync('user_info');

      console.log("[app.js] onLaunch checkSession succ", localGlobalData, localLoginState, localUserInfo);
      if (localUserInfo && localLoginState) {

        extendMyParams(
          localGlobalData,
          launchParams,
          {login_state: localLoginState},
		  localUserInfo,
		  {isAuthorize: true}
        );

        assign(_app.globalData, _params);
        console.log('use local', _params);
        finish(true); //case a
		isAuthroze = true;
        return isAuthroze;
	  }
	  
	  console.log("[app] have no login message!");
	  isAuthroze = false;
	  //onSessionFail();
	  return isAuthroze;
    }).catch(ex=>{
      console.log("[app.js] onLaunch checkSession fail", _params);
	  //onSessionFail();
	  isAuthroze = false;
	  return isAuthroze;
	});
	return isAuthroze;
};


module.exports = {
  checkAfterAppLaunch,
  onUserinfoGot,
  onSessionFail
};