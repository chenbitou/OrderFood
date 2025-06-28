/**
 * Notes: 餐品模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-07 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const GoodsModel = require('../model/goods_model.js');
const GOODS_CATE = [
	{ id: 1, title: '主食' },
	{ id: 2, title: '热菜' },
	{ id: 3, title: '汤品' },
	{ id: 4, title: '凉菜' },
	{ id: 5, title: '小吃' },
	{ id: 6, title: '饮品' },
	{ id: 7, title: '水果' },
	{ id: 8, title: '其他' },
];

class GoodsService extends BaseProjectService {

	async getAllGoods() {
		// 所有记录
		let orderBy = {
			GOODS_ORDER: 'asc',
			GOODS_ADD_TIME: 'desc'
		}
		let fields = '*';
		let where = { GOODS_STATUS: 1 };

		let goodsListBase = await GoodsModel.getAll(where, fields, orderBy, 1000);



		//### 按分类
		let cateList = [];

		for (let k = 0; k < GOODS_CATE.length; k++) {
			let name = GOODS_CATE[k].title;

			let list = [];
			for (let j = 0; j < goodsListBase.length; j++) {

				if (goodsListBase[j].GOODS_CATE_ID == GOODS_CATE[k].id) {
					list.push({
						id: goodsListBase[j]._id,
						pic: goodsListBase[j].GOODS_OBJ.cover[0],
						name: goodsListBase[j].GOODS_TITLE,
						cate: goodsListBase[j].GOODS_CATE_NAME,
						price: goodsListBase[j].GOODS_OBJ.price,
						size: goodsListBase[j].GOODS_OBJ.size,
						cnt: 0,//订购数量
					});
				}

			}

			let node = {
				name,
				list
			}
			cateList.push(node);
		}

		return { cateList }
	}

	/** 浏览信息 */
	async viewGoods(id) {

		let fields = '*';

		let where = {
			_id: id,
			GOODS_STATUS: GoodsModel.STATUS.COMM
		}
		let goods = await GoodsModel.getOne(where, fields);
		if (!goods) return null;

		GoodsModel.inc(id, 'GOODS_VIEW_CNT', 1);

		return goods;
	}


	/** 取得分页列表 */
	async getGoodsList({
		cateId,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {

		orderBy = orderBy || {
			'GOODS_ORDER': 'asc',
		};
		let fields = 'GOODS_SALE_CNT,GOODS_OBJ,GOODS_VIEW_CNT,GOODS_TITLE,GOODS_CATE_ID,GOODS_ADD_TIME,GOODS_ORDER,GOODS_STATUS,GOODS_CATE_NAME';

		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (cateId) where.and.GOODS_CATE_ID = cateId;

		where.and.GOODS_STATUS = GoodsModel.STATUS.COMM; // 状态  


		if (util.isDefined(search) && search) {
			where.or = [
				{ GOODS_TITLE: ['like', search] },
			];
		} else if (sortType && util.isDefined(sortVal)) {
			// 搜索菜单
			switch (sortType) {
				case 'cateId': {
					if (sortVal) where.and.GOODS_CATE_ID = String(sortVal);
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

}

module.exports = GoodsService;