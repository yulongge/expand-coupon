const locale = getApp().locale.countdown;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
	timeto: {
		type: Number,
		value: 0
	},
    interval: {
      type: Number,
      value: 1000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
	day: 0,
    hours: 0,
    minutes: 0,
	seconds: 0,
	locale
  },

  /**
   * 组件的方法列表
   */
  methods: {
    finish() {
      this.triggerEvent('finish', {})
    }
  },

  ready() {
	const { timeto, interval } = this.properties;
	console.log(timeto, locale, 'coming... countdown')
    const now = Date.now();
	let diff = timeto - now;
    const _me = this;
    if (diff <= 0) return;

    this._itv = setInterval(
      function() {
        if (diff <= 0) {
          clearInterval(_me._itv);
          _me.finish();
          return;
        }

		const
			d = parseInt( diff / 1000 / 24 / 60 / 60),
			h = parseInt( (diff - d * 1000 * 24 * 60 * 60) / 1000 / 60 / 60 ),
			m = parseInt( (diff - d * 1000 * 24 * 60 * 60 - h*1000*60*60) / 1000 / 60 ),
			s = parseInt( (diff - d * 1000 * 24 * 60 * 60 - h*1000*60*60 - m*1000*60) / 1000 );

        _me.setData({
			day: d,
			hours: h,
			minutes: m,
			seconds: s
        });
        diff -= interval;
      },
      interval
    );
  },

  detached() {
    clearInterval(this._itv);
  }
})
