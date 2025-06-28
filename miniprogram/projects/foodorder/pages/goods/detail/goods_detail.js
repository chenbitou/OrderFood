const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const GoodsBiz = require('../../../biz/goods_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		cartList: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;

		this._loadDetail();

	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let goods = await cloudHelper.callCloudData('goods/view', params, opt);
		if (!goods) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			goods,
			cartList: GoodsBiz.getCartList()
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () { },

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	bindAddCartTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let node = this.data.goods;
		let goods = {
			id: node._id,
			title: node.GOODS_TITLE,
			price: node.GOODS_OBJ.price,
			size: node.size,
			totalPrice: node.GOODS_OBJ.price,
			pic: node.GOODS_OBJ.cover[0],
			num: 1
		}
		GoodsBiz.addCart(goods);
		this.setData({
			cartList: GoodsBiz.getCartList()
		});
		pageHelper.showNoneToast('已成功加入购物车', 500);
	},

	onShareAppMessage: function (res) {
		return {
			title: this.data.goods.GOODS_TITLE,
			imageUrl: this.data.goods.GOODS_OBJ.cover[0]
		}
	}
})