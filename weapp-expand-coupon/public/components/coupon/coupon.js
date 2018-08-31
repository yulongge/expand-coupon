import {date_to_YMD} from '../../utils/time';
const locale = getApp().locale.index.coupon;
const app = getApp();

Component({
	properties: {
        data: {
			type: Object,
			value: {},
			observer: "_observerData"
		},
		currentCoupon: {
			type: Object,
			value: {},
			observer: "_obsCurrentCoupon"
		},
		isAuthorize: {
			type: Boolean,
			value: false,
			observer: "_obsAuthorize"
		},
		showCelebrateModal: {
			type: Boolean,
			value: false,
			observer: "_obsCelebrateModal"
		},
	},
	data: {
		locale,
		showCelebrateModal: false,
		timeto: 0,
		start_date: "",
		end_date: "",
		isAuthorize: false
	},
	ready() {
		const {scene} = app.globalData;
		if(scene === 1007 || scene === 1008) {
			this.setData({
				showCelebrateModal: true
			})
		}
	},
    methods: {
		_obsAuthorize(newVal) {
			this.setData({
				isAuthorize: newVal ? newVal : false
			})
		},
		_obsCelebrateModal(newVal) {
			console.log(newVal, 'newVla')
			this.setData({
				showCelebrateModal: newVal ? newVal : false
			})
		},
		_showModal() {
			this.triggerEvent("setNoScroll", this.data.showCelebrateModal);
			const _this = this;
			setTimeout(function() {
				_this.setData({
					showCelebrateModal: !_this.data.showCelebrateModal
				})
			}, 100)
			
		},
		_observerData(newData) {
			const {activity_start_time, activity_end_time} = newData;
			this.setData({
				timeto: activity_end_time ? activity_end_time * 1000 : 0
			})
		},
		_obsCurrentCoupon(newData, oldData) {
			let tempData = newData ? newData : oldData;
			this.setData({
				currentCoupon: tempData,
				start_date: tempData.start_date ? date_to_YMD(new Date(tempData.start_date * 1000 ), ".") : "",
				end_date: tempData.end_date ? date_to_YMD(new Date(tempData.start_date  * 1000 ), ".") : ""
			})
		},
		_onUserInfo(res) {
			const {errMsg} = res.detail;
			const isFail = errMsg !== 'getUserInfo:ok';
			if (isFail) return;
			console.log(this.data.isAuthorize, 'isAuthorize')
			if(this.data.isAuthorize) {
				this._showModal();
			} else {
				app.onUserinfoGot(res.detail);
				this.setData({
					isAuthorize: true
				})
			}
		},
		_onGetUserInfo(res) {
			const {errMsg} = res.detail;
			const isFail = errMsg !== 'getUserInfo:ok';
			if (isFail) return;
			if(this.data.isAuthorize) {
				this._showModal();
			} else {
				app.onUserinfoGot(res.detail);
				this.setData({
					isAuthorize: true
				})
			}
		}

	}
})