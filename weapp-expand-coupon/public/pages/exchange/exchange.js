// pages/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	isExchange: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  toExChange() {
	  const _this = this;
	  wx.showModal({
		content: '兑换成功后，膨胀红包将终止，并且无法再继续发起膨胀红包活动，是否兑换？',
		confirmText: "确认兑换",
		cancelText: "暂不兑换",
		cancelColor: "#787878",
		success: function(res) {
		  if (res.confirm) {
			_this.setData({
				isExchange: true
			})
		  } else if (res.cancel) {
			_this.setData({
				isExchange: false
			})
		  }
		}
	  })
  }
})