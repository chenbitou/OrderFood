/**
 * Notes: 餐品模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-14 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const cacheHelper = require('../../../helper/cache_helper.js');
const dataHelper = require('../../../helper/data_helper.js');
const projectSetting = require('../public/project_setting.js');
const CACHE_CART = 'CACHE_CART';

class GoodsBiz extends BaseBiz {

	static getCateName(cateId) {
		return BaseBiz.getCateName(cateId, projectSetting.GOODS_CATE);
	}

	static getCateList() {
		return BaseBiz.getCateList(projectSetting.GOODS_CATE);
	}

	static setCateTitle() {
		return BaseBiz.setCateTitle(projectSetting.GOODS_CATE);
	}


	/** 搜索菜单设置 */
	static async getSearchMenu() {
		let sortMenus = [{
			label: '全部',
			type: '',
			value: ''
		}];
		let sortMenusAfter = [{
			label: '最新',
			type: 'sort',
			value: 'new'
		},];
		let sortItems = [];

		sortMenus = sortMenus.concat(sortMenusAfter);

		return {
			sortItems,
			sortMenus
		}
	}

	static updateCartList(cartList) {
		// 统计数量和总价
		this.statCartList(cartList);

		// 重新计算
		cacheHelper.set(CACHE_CART, cartList, 86400 * 1 * 1);
	}


	static getCartList() {
		let cartList = cacheHelper.get(CACHE_CART, { total: 0, totalPrice: 0, list: [] });

		return cartList;
	}

	// 统计数量和总价
	static statCartList(cartList) {

		let list = cartList.list;

		let total = 0;
		let totalPrice = 0.00;

		for (let k in list) {
			total += Number(list[k].num);
			totalPrice += dataHelper.fmtMoney(list[k].totalPrice);
		}

		cartList.total = total;
		cartList.totalPrice = dataHelper.fmtMoney(totalPrice);

	}

	static clearCart() {
		cacheHelper.remove(CACHE_CART);
	}

	/** 添加购物车缓存 
	  * @param {*} size 最大个数
	  * @param {*} expire 过期时间
	  */
	static addCart(goods, size = 60, expire = 86400 * 1 * 1) {

		if (!goods) return;

		let cartList = cacheHelper.get(CACHE_CART, { total: 0, totalPrice: 0, list: [] });

		//查询是否存在 增加数量
		let isExist = false;
		let list = cartList.list;
		for (let k in list) {
			if (list[k].id == goods.id) {
				list[k].title = goods.title;
				list[k].pic = goods.pic;
				list[k].num += Number(goods.num);
				list[k].totalPrice += Number(goods.price);
				isExist = true;
				break;
			}
		}

		// 不存在则加到头部
		if (!isExist) {
			list.unshift(goods);
		}

		// 判断个数， 多的删除
		if (list.length > size)
			list.splice(list.length - 1, 1);

		// 统计数量和总价
		this.statCartList(cartList);

		// 存缓存
		cacheHelper.set(CACHE_CART, cartList, expire);

		return cartList;
	}
}

module.exports = GoodsBiz;