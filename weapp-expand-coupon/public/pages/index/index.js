import {
  getIndex,
  getMine
} from '../../app_requests';
import {
	assign
} from '../../utils/object';
const appSession = require('../../app_session');

const app = getApp();
const locale = getApp().locale.index;

Page({
  data: {
    showAuthorize: false,
    authorizeMsg: "",
    authorizeBtn: "",
    backgroundColor: '#33BA73',
	activityData: {},
	currentCoupon: {},
	showMine: false,
	noScroll: false,
	mineData: {},
	locale,
	isAuthroize: false,
	showCelebrateModal: false
  },

  _ready: false, 

  _init() {
	getIndex(rst => {
		this.setData({
			activityData: rst,
			currentCoupon: rst.coupons[0]
		})
		const {background_color, title_color} = rst;

		if(background_color && title_color) {
			this.setData({
				backgroundColor: background_color
			})
			setTimeout(function () {
				wx.setNavigationBarColor({
					backgroundColor: background_color,
					frontColor: title_color
				});
				
			}, 200);
			
		}
	})
  },

  onLoad(option) {
	console.log(option, 'index onLoad option')
	this.onShareControl();
  },

  onShow(option) {
	console.log(option, app.globalData, 'onShow coming....')
	if(!this._ready) return;
  },


  onReady(option) {
    wx.p.showAuthorize = this.showAuthorize;
	wx.p.closeAuthorize = this.closeAuthorize;
	this._init();
	this._ready = true;
	appSession.checkAfterAppLaunch(getApp(), wx.getStorageSync('launch_params')).then(auth => {
		this.setData({
			isAuthorize: auth
		})
	});

  },

  showAuthorize(msg, btn) {
    this.setData({
      showAuthorize: true,
      authorizeMsg: msg,
      authorizeBtn: btn,
    })
  },

  closeAuthorize() {
    this.setData({
      showAuthorize: false
    })
  },

  setNoScroll(scroll) {
	console.log('coming... scroll', scroll)
	if(typeof scroll !== "boolean") {
		scroll = scroll.detail;
	}
	this.setData({
		noScroll: !scroll
	})
  },

  showMine() {
	this.setNoScroll(this.data.showMine);
    if(!this.data.showMine) {	
		getMine(rst => {
			this.setData({
			mineData: rst,
			showMine: true
			})
		});
		return;
    }
    this.setData({
      showMine: false
    })
  },
   /**
   * 用户点击右上角分享
   */
	onShareAppMessage(options) {
		console.log(options, 'onShareAppMessage');
		const {activityData} = this.data,
			_this = this;
		return {
			title: activityData.share_title,
			path: "/pages/index/index",
			imageUrl: activityData.share_img,
			success: (res) => {
				console.log(res, 'success');
			},
			fail: (res) => {
				console.log(res, 'error')
			},
			complete: (res) => {
				_this.setData({
					showCelebrateModal: false
				})
				console.log(res, 'complete')
			}
		}
	},
	onShareControl() {
		wx.showShareMenu({
			withShareTicket: true,
			success: () => {
				console.log('share success!')
			},
			fail: () => {
				console.log('share fail!')
			},
			complete: () => {
				console.log('share complete!')
			}
		})
	},
	onUserInfo(res) {
		const {errMsg} = res.detail;
		const isFail = errMsg !== 'getUserInfo:ok';
		if (isFail) return;
		//wx.p.closeAuthorize();
		console.log(app.globalData, 'app isAuthorize');
		if(app.globalData.isAuthorize) {
			this.showMine();
		} else {
			app.onUserinfoGot(res.detail);
		}
		
	},

})