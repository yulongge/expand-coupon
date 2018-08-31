const {random} = require('lodash');
const {mock_host, mock_port} = require('../dev.config');

/** 个人中心数据  **/
module.exports = (app, prefix) => {
	app.get(`${prefix}/mine`, function(req, res) {
		res.json({
			errcode: 0,
			errlevel: 'default',
			errmsg: 'success',
			result: {
                coupons: [
                    {
						couponId: '1',
						coupon_title: '20元膨胀优惠券',
						help_value: 0, //需要的助力值
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/1.png",
						value: 30, //劵面值
						start_time: "1534800600",
						end_time: "1534800600",
						status: 1 , //{1: 膨胀中, 2: 立即兑换 , 3:查看}
					},
					{
						couponId: '2',
						coupon_title: '30元膨胀优惠券',
						help_value: 10,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/2.png",
						value: 50,
						start_time: "1534800600",
						end_time: "1534800600"
					},
					{
						couponId: '3',
						coupon_title: '50元膨胀优惠券',
						help_value: 20,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/3.png",
						value: 100,
						start_time: "1534800600",
						end_time: "1534800600"
					},
					{
						couponId: '3',
						coupon_title: '80元膨胀优惠券',
						help_value: 20,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/3.png",
						value: 100,
						start_time: "1534800600",
						end_time: "1534800600"
					},
					{
						couponId: '3',
						coupon_title: '20元膨胀优惠券',
						help_value: 20,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/3.png",
						value: 100,
						start_time: "1534800600",
						end_time: "1534800600"
					},
					{
						couponId: '3',
						coupon_title: '全场通用|20元膨胀优惠券',
						help_value: 20,
						img: "https://yulongge.github.io/images/expand/coupon.png",
						small_img: "https://yulongge.github.io/images/superdiancan/portral/puhuo/3.png",
						value: 100,
						start_time: "1534800600",
						end_time: "1534800600"
					}
                ]
            }
        })
    })
}