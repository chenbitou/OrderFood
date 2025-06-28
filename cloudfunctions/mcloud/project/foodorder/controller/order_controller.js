/**
 * Notes: 餐品模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-07 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const OrderService = require('../service/order_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class OrderController extends BaseProjectController {

	/** 订购 */
	async orderGoods() {
		// 数据校验
		let rules = {
			list: 'must|array|name=餐品',
			total: 'must|int|name=数量',
			totalPrice: 'must|int|name=总价'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new OrderService();
		return await service.orderGoods(this._userId, input);
	}

	/** 列表 */
	async getMyOrderDetail() {

		// 数据校验
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new OrderService();
		let order = await service.getMyOrderDetail(this._userId, input.id);

		// 数据格式化  
		if (order) {
			order.ORDER_ADD_TIME = timeUtil.timestamp2Time(order.ORDER_ADD_TIME);
		}
		return order;

	}

	async getMyOrderList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new OrderService();
		let result = await service.getMyOrdersList(this._userId, input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].ORDER_ADD_TIME = timeUtil.timestamp2Time(list[k].ORDER_ADD_TIME);
		}

		return result;

	}

	async cancelMyOrder() {

		// 数据校验
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new OrderService();
		return await service.cancelMyOrder(this._userId, input.id);
	}
}

module.exports = OrderController;