/**
 * Notes: 餐品后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');

const util = require('../../../../framework/utils/util.js');
const OrderModel = require('../../model/order_model.js');
const OrderStatModel = require('../../model/order_stat_model.js');
const OrderService = require('../order_service.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const UserModel = require('../../model/user_model.js');

// 导出订单统计数据KEY
const EXPORT_ORDER_STAT_DATA_KEY = 'EXPORT_ORDER_STAT_DATA';
const EXPORT_ORDER_DATA_KEY = 'EXPORT_ORDER_DATA';

class AdminOrderService extends BaseProjectAdminService {

	money(priceInFen, showSymbol = true) {
		// 将分转换为元
		const priceInYuan = priceInFen / 100;
		// 保留两位小数
		const formattedPrice = priceInYuan.toFixed(2);
		// 根据参数决定是否加上货币符号
		if (showSymbol) {
			return "￥" + formattedPrice;
		} else {
			return formattedPrice;
		}
	}

	async getAdminOrderStatList({
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
			'ORDER_STAT_GOODS_CNT': 'desc'
		};
		let fields = '*';

		if (search.includes('#')) search = search.split('#')[0];

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.and = { ORDER_STAT_DAY: search };

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'status': {
					where.and.ORDER_STAT_STATUS = Number(sortVal);
					break;
				}
			}
		}

		return await OrderStatModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}


	// #################### ORDER
	async getOrderDetail(id) {
		let order = await OrderModel.getOne(id);
		if (!order) return order;

		let user = await UserModel.getOne({ USER_MINI_OPENID: order.ORDER_USER_ID });
		order.user = user;
		return order;
	}

	async getAdminOrdersList({
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
		let fields = 'ORDER_DESC,ORDER_ID,ORDER_LIST,ORDER_USER_ID,ORDER_TYPE,ORDER_TOTAL_PRICE,ORDER_TOTAL,ORDER_STATUS,ORDER_ADD_TIME,user.USER_NAME,user.USER_MOBILE';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ORDER_DESC: ['like', search] },
				{ 'user.USER_NAME': ['like', search] },
				{ 'user.USER_MOBILE': ['like', search] },
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

		let UserModel = require('../../model/user_model.js');
		let joinParams = {
			from: UserModel.CL,
			localField: 'ORDER_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await OrderModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	async statusOrder(id, status) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	// #####################导出订单统计数据
	/**获取订单统计数据 */
	async getOrderStatDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_ORDER_STAT_DATA_KEY);
	}

	/**删除订单统计数据 */
	async deleteOrderStatDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_ORDER_STAT_DATA_KEY);
	}

	/**导出订单统计数据 */
	async exportOrderStatDataExcel({
		day
	}) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	// #####################导出订单数据
	/**获取订单数据 */
	async getOrderDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_ORDER_DATA_KEY);
	}

	/**删除订单数据 */
	async deleteOrderDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_ORDER_DATA_KEY);
	}

	/**导出订单数据 */
	async exportOrderDataExcel({
		start,
		end,
		status,
	}) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}
}

module.exports = AdminOrderService;