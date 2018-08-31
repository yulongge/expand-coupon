const { assign } = require('utils/object');
const { promisify } = require('utils/api');
const { parseQuery } = require('utils/format');
const appSession = require('./app_session');
const locale = require('./locale');

let _app = null;

//app.js
App({
  locale,
  requesting: false,
  globalData: {},

  _promisify() { //wx的方法赋值给wx.p
    const keys = Object.keys(wx)
      .filter(key=>typeof wx[key]==='function')
      .filter(key=>!/Sync$/.test(key));
    wx.p = {};
    keys.forEach(method=>wx.p[method]=promisify(wx[method]));
  },

  onLaunch(launchParams) {
    console.log('app.js onLaunch', launchParams);

    this._promisify();
	_app = this;
	wx.setStorageSync('launch_params', launchParams);
    //appSession.checkAfterAppLaunch(_app, launchParams);
  },

  onShow(showParams) {
    console.log('app onShow', showParams, getCurrentPages().map(p => p.route));

    if (_app && _app.globalData) {
      assign(_app.globalData, showParams);
    }
    
  },

  alert(msg, callback = null) {
    wx.p.showModal({
      title: '',
      content: String(msg),
      showCancel: false
    }).then(res=>{
      if (res.confirm && callback) {
        callback();
      }
    })
  },

  showMessagePage(errcode = 0, errmsg = '', buttons = [], iconUrl = null) {
    const c = parseInt(errcode);
    if (isNaN(c)) throw new Error('wrong errcode', errcode);

    const m = encodeURIComponent(errmsg);

    if (buttons
      && (typeof buttons === 'object')
      && !Array.isArray(buttons)) {
      buttons = [buttons];
    }

    if (buttons && buttons.length && !buttons[0].hasOwnProperty('label'))
      throw new Error('wrong buttons', buttons);

    let url = `/pages/msg/msg?code=${c}&message=${m}`;
    if (buttons && buttons.length) {
      url += `&buttons=${encodeURIComponent(JSON.stringify(buttons))}`;
    }
    if (iconUrl) {
      url += `&icon=${iconUrl}`;
    }

    wx.navigateTo({ url });
  },

  //普通请求前校验失败后的重新登录
  reLogin() {
    appSession.onSessionFail();
  },

  //用户已经授权后(由userinfo页面调用)
  onUserinfoGot(userinfo) {
    appSession.onUserinfoGot(userinfo);
  }
})