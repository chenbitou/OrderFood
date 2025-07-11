/**
 * Notes: 餐品后台管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-11 07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');

const dataUtil = require('../../../../framework/utils/data_util.js');
const util = require('../../../../framework/utils/util.js');
const cloudUtil = require('../../../../framework/cloud/cloud_util.js');
const GoodsModel = require('../../model/goods_model.js');
const OrderModel = require('../../model/order_model.js');

class AdminGoodsService extends BaseProjectAdminService {

	/**添加 */
	async insertGoods({

	}) {


		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**删除数据 */
	async delGoods(id) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**获取信息 */
	async getGoodsDetail(id) {
		let fields = '*';

		let where = {
			_id: id
		}
		let goods = await GoodsModel.getOne(where, fields);
		if (!goods) return null;

		return goods;
	}

	// 更新forms信息
	async updateGoodsForms({
		id,
		hasImageForms
	}) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**更新数据 */
	async editGoods({

	}) {

		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**取得分页列表 */
	async getAdminGoodsList({
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
			'GOODS_ORDER': 'asc',
			'GOODS_ADD_TIME': 'desc'
		};
		let fields = 'GOODS_TITLE,GOODS_CATE_ID,GOODS_CATE_NAME,GOODS_EDIT_TIME,GOODS_ADD_TIME,GOODS_ORDER,GOODS_STATUS,GOODS_VOUCH,GOODS_QR,GOODS_OBJ.size,GOODS_OBJ.price,GOODS_SALE_CNT';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ GOODS_TITLE: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					where.and.GOODS_CATE_ID = String(sortVal);
					break;
				}
				case 'status': {
					where.and.GOODS_STATUS = Number(sortVal);
					break;
				}
				case 'vouch': {
					where.and.GOODS_VOUCH = 1;
					break;
				}
				case 'top': {
					where.and.GOODS_ORDER = 0;
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'GOODS_ADD_TIME');
					break;
				}
			}
		}

		return await GoodsModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);
	}

	/**修改状态 */
	async statusGoods(id, status) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**置顶与排序设定 */
	async sortGoods(id, sort) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**首页设定 */
	async vouchGoods(id, vouch) {
		this.AppError('[订餐]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

}

module.exports = AdminGoodsService;