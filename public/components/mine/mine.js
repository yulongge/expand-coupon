import {date_to_YMD} from '../../utils/time';
const app = getApp();
const locale = app.locale.index.mine;
Component({
    properties: {
        data: {
            type: Object,
            value: {},
            observer: "_obsData"
		},
		isAuthorize: {
			type: Boolean,
			value: false,
			observer: "_obsAuthorize"
		},
		showMine: {
			type: Boolean,
			value: false,
			observer: "_obsShowMine"
		}
	},
	data: {
		userinfo: app.globalData.userInfo,
		locale,
		coupons: []
	},
	ready() {
		console.log(locale, app.globalData.userInfo, 'mine');
	},
    methods: {
		_obsAuthorize(newVal) {
			this.setData({
				userinfo: app.globalData.userInfo
			})
		},
		_obsShowMine() {
			this.setData({
				userinfo: app.globalData.userInfo
			})
		},
		_obsData(newVal, oldVal) {
			console.log(newVal,oldVal , 'data');
			if(newVal) {
				let newData = newVal.coupons.map(item => {
					item.start_time = item.start_time ? date_to_YMD(new Date(item.start_time * 1000 ), ".") : "";
					
					return item;
				})
				console.log(newData, 'newData')
				this.setData({
					coupons: newData
				})
			}
		},
        _close() {
			this.triggerEvent("showMine");
		},
		_toExchange() {
			wx.navigateTo({
				url: "/pages/exchange/exchange"
			})
		}
    }
})