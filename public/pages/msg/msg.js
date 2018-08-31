Page({
    data: {
    },
    onLoad(opts) {
        const { code, message, buttons, icon } = opts;
        this.setData({
            message,
            code,
            icon: icon ? decodeURIComponent(icon) : 'initial',
            buttons: buttons ? JSON.parse(decodeURIComponent(buttons)) : []
        });
    },
    onButtonClick(e) {
      const { route } = e.currentTarget.dataset;

      wx.redirectTo({
        url: route,
        fail() {
          wx.showModal({
            title: '提示',
            content: `无法跳转到 ${route}`,
            showCancel: false
          })
        }
      });
    }
});