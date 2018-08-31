const {random} = require('lodash');
const {mock_host, mock_port} = require('../dev.config');

/** 首页配置信息 **/
module.exports = (app, prefix) => {
	app.get(`${prefix}/index`, function(req, res) {
		res.json({
			errcode: 0,
			errlevel: 'default',
			errmsg: 'success',
			result: {
				activity_title: '裂变营销', //标题
				header_img: "https://yulongge.github.io/images/expand/header.jpg", //头部banner图片,
				background_color: "#33BA73",//背景颜色
				title_color: '#ffffff', //标题及按钮颜色
				activity_start_time: "1534800600", //活动开始时间 2018-08-21 05:30
				activity_end_time: "1536598200", //活动结束时间 2018-08-30 05:30
				share_title: "分享到月球看看就看就看就看就看就看就看就看就看就",
				share_img: "https://yulongge.github.io/images/superdiancan/wxdc/category/2.png",
				share_tagline: '膨胀的很厉害',
				activity_avatarUrl: "https://yulongge.github.io/images/pic.png", //活动人的头像
				get_help_value: 20, //获得的助力值
				status: 1, //{1: 未领取, 2: 已领取，3:已结束}
				coupons: [
					{
						couponId: '',
						coupon_title: '20元膨胀优惠券',
						help_value: 0, //需要的助力值
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/wxdc/dishes03.png",
						value: 30, //劵面值,
						start_date: 1534800600,
						end_date: 1535578200	
					},
					{
						couponId: '',
						coupon_title: '',
						help_value: 10,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/wxdc/dishes02.png",
						value: 50, //劵面值,
						start_date: 1534800600,
						end_date: 1535578200	
					},
					{
						couponId: '',
						coupon_title: '',
						help_value: 20,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/wxdc/dishes04.png",
						value: 100, //劵面值,
						start_date: 1534800600,
						end_date: 1535578200	
					}
				],
				friendlist: [ //好友榜
					{
						id: '1',
						nickName: '李龙', //昵称
						avatarUrl: 'https://yulongge.github.io/images/pic.png', //头像
						help_value: '1' //助力值
					},
					{
						id: '2',
						nickName: '盖玉龙', //昵称
						avatarUrl: 'https://yulongge.github.io/images/pic.png', //头像
						help_value: '1' //助力值
					},
				],
				activity_desc: [ //活动规则
					'本次秒杀活动为云海肴用户专享。',
					'活动期间任何舞弊行为的用户一经发现，取消秒杀活动资格。',
					'秒杀成功与否以实际结果为准。',
					'每名用户每天可成功参与一次秒杀，活动期间每名用户最高可成功秒杀5次。',
					'所有礼品将在活动结束后的15个工作日内免费寄出。',
					'本活动最终解释权归云海肴所有。'
				]

			}
		})
	})
}