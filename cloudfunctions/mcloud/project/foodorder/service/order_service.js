/**
 * Notes: 餐品模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-07 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const OrderModel = require('../model/order_model.js');
const OrderStatModel = require('../model/order_stat_model.js');
const GoodsModel = require('../model/goods_model.js');

class OrderService extends BaseProjectService {

	// 下单
	async orderGoods(userId, {
	 
	}) {
		 
	}

	async statGoodsSaleCnt(goodsId) {
		 
	}

	// 统计
	async statOrder(orderId) { 

	}

	async cancelMyOrder(userId, id) {
		let where = {
			_id: id,
			ORDER_USER_ID: userId,
			ORDER_STATUS: OrderModel.STATUS.COMM
		}
		let order = await OrderModel.getOne(where);
		if (!order) this.AppError('该订单不存在');


		await OrderModel.edit(where, { ORDER_STATUS: 9 });

		// 统计 
		this.statOrder(id);


	}

	async getMyOrderDetail(userId, id) {
		let where = {
			ORDER_USER_ID: userId,
			_id: id,
		}
		return await OrderModel.getOne(where);
	}


	async getMyOrdersList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'ORDER_ADD_TIME': 'desc'
		};
		let fields = 'ORDER_ID,ORDER_DAY,ORDER_TOTAL,ORDER_TOTAL_PRICE,ORDER_DESC,ORDER_GOODS_ID,ORDER_ADD_TIME,ORDER_GOODS_TITLE,ORDER_GOODS_CNT,ORDER_SCORE,ORDER_STATUS,goods.GOODS_OBJ.cover';

		let where = {};
		where.and = {
			ORDER_USER_ID: userId,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ORDER_GOODS_TITLE: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status': {
					where.and.ORDER_STATUS = Number(sortVal);
					break;
				}
			}
		}

		return await OrderModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

}

module.exports = OrderService;