/**
 * Notes: 餐品模块后台管理-控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-11 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminOrderService = require('../../service/admin/admin_order_service.js');

const timeUtil = require('../../../../framework/utils/time_util.js');
const contentCheck = require('../../../../framework/validate/content_check.js');

class AdminOrderController extends BaseProjectAdminController {

	async statusOrder() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new AdminOrderService();
		return await service.statusOrder(input.id, input.status);
	}

	async getAdminOrderStatList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|must|min:1|max:30|name=日期',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		let result = await service.getAdminOrderStatList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].ORDER_STAT_ADD_TIME = timeUtil.timestamp2Time(list[k].ORDER_STAT_ADD_TIME, 'Y-M-D h:m:s');
		}
		result.list = list;

		return result;

	}

	async getAdminOrderList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		let result = await service.getAdminOrdersList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].ORDER_ADD_TIME = timeUtil.timestamp2Time(list[k].ORDER_ADD_TIME, 'Y-M-D h:m:s');
		}
		result.list = list;

		return result;

	}

	/** 用户信息 */
	async getOrderDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		let order = await service.getOrderDetail(input.id);

		if (order) {
			// 显示转换  
			order.ORDER_ADD_TIME = timeUtil.timestamp2Time(order.ORDER_ADD_TIME);
			;
		}

		return order;
	}

	/**************订单统计数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async orderStatDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();

		if (input.isDel === 1)
			await service.deleteOrderStatDataExcel(); //先删除

		return await service.getOrderStatDataURL();
	}

	/** 导出统计数据 */
	async orderStatDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			day: 'string|must|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		return await service.exportOrderStatDataExcel(input);
	}

	/** 删除导出的统计数据文件 */
	async orderStatDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		return await service.deleteOrderStatDataExcel();
	}


	/**************订单数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async orderDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();

		if (input.isDel === 1)
			await service.deleteOrderDataExcel(); //先删除

		return await service.getOrderDataURL();
	}

	/** 导出订单数据 */
	async orderDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			start: 'string|name=开始日期',
			end: 'string|name=结束日期',
			status: 'int|must|name=状态',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		return await service.exportOrderDataExcel(input);
	}

	/** 删除导出的订单数据文件 */
	async orderDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminOrderService();
		return await service.deleteOrderDataExcel();
	}

}

module.exports = AdminOrderController;