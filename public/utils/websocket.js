let socketOpen = false;
let SocketTask = null;

const PubSub = (function () {
  let clientList = {},
  listen,
  trigger,
  send,
  close,
  remove;
  trigger =  function () {
    const key = Array.prototype.shift.call(arguments),
    fns = clientList[key];

    if (!fns || fns.length == 0) {
      return false;
    }

    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };

  listen =  function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  remove = function (key, fn) {
    const fns = clientList[key];
    if (!fns) {
      return false;
    }

    if (!fn) {
      fns && (fns.length=0)
    } else {
      for (let l = fns.length; l--;) {
        const _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };

  send =  function (msg) {
    wx.sendSocketMessage({
      data: msg,
      success: function(res) {
        console.log(res, 'websocket 发送到服务器内容：', msg);
      },
      fail: function (err) {
        trigger('reconnect', err);
        console.log(err, 'ws send fail')
      }
    })
  }
  
  close = function() {
    wx.closeSocket();
  }

  return {
    listen,
    trigger,
    remove,
    send,
    close
  }

})();

const WebSocket = function (url) {
  this.url = url;
  this.creat();
}

WebSocket.prototype = {
  creat: function () {
    const that = this;

    SocketTask = wx.connectSocket({
      url: that.url,
    })

    wx.onSocketOpen(function(res) {
      console.log('websocket 链接成功！');
      socketOpen = true;
      PubSub.trigger('open', res);
    })

    wx.onSocketError(function(res){
      console.log('websocket 链接发生错误！', res);
      that.reconnect(res);
    })

    wx.onSocketMessage(function(res) {
      console.log('websocket 接收到服务器内容：', res)
      PubSub.trigger('message', res.data);
    })

    wx.onSocketClose(function(res) {
      console.log('websocket 关闭:', res);
      if (res.code != 1000) {
        that.reconnect(res);
      }
    })
  },
  reconnect: function(res) {
    PubSub.trigger('reconnect', res);
  },
}

const ws = function (opt) {
  return new WebSocket(opt);
}

module.exports = {
  ws,
  pubsub: PubSub,
}
