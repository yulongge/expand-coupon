const {random} = require('lodash');
const {mock_host, mock_port} = require('../dev.config');

/** 关于劵的相关配置 **/
module.exports = (app, prefix) => {
	/** 领取劵 **/
	app.post(`${prefix}/coupon/get`, function(req, res) {
		res.json({
			errcode: 0,
			errlevel: 'default',
			errmsg: 'success',
			result: {

			}
		})
	})

	/** 助力 **/
	app.post(`${prefix}/coupon/help`, function(req, res) {
		res.json({
			errcode: 0,
			errlevel: 'default',
			errmsg: 'success',
			result: {

			}
		})
	})

	/** 兑换劵 **/
	app.post(`${prefix}/coupon/exchange`, function(req, res) {
		res.json({
			errcode: 0,
			errlevel: 'default',
			errmsg: 'success',
			result: {

			}
		})
	})
}
