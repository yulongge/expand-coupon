const locale = getApp().locale.index.progress;
Component({
	properties: {
		data: Object,
	},
	data: {
		locale
	},
	methods: {
		_toExchange() {
			wx.navigateTo({
				url: "/pages/exchange/exchange"
			})
		}
	}
})