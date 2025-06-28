const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const GoodsBiz = require('../../../biz/goods_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);

	},

	_loadList: async function () {
		let cartList = GoodsBiz.getCartList();
		this.setData({
			isLoad: true,
			cartList
		})

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		this._loadList();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	bindClearTap: function () {
		let cb = () => {
			GoodsBiz.clearCart();
			let cartList = GoodsBiz.getCartList();
			this.setData({
				cartList
			})
		}
		pageHelper.showConfirm('确认清空？', cb);
	},

	//数量计算
	bindNumTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let method = pageHelper.dataset(e, 'method');
		let idx = pageHelper.dataset(e, 'idx');
		let cartList = this.data.cartList;
		let goods = cartList.list[idx];
		if (!goods) return;
		if (method > 0) {
			goods.num++;

			goods.totalPrice = dataHelper.fmtMoney(goods.price) * goods.num;
			goods.totalPrice = dataHelper.fmtMoney(goods.totalPrice);
			GoodsBiz.updateCartList(cartList);
			this.setData({
				cartList: GoodsBiz.getCartList()
			});
		} else {
			goods.num--;
			if (goods.num < 1) {
				goods.num = 1;
				let that = this;
				wx.showModal({
					title: '删除提示',
					content: '是否确认删除？',
					success: function (res) {
						if (res.confirm) {
							cartList.list.splice(idx, 1);
							GoodsBiz.updateCartList(cartList);
							that.setData({
								cartList: GoodsBiz.getCartList()
							});
						} else if (res.cancel) {
						}
					}
				})

			}
			else {
				goods.totalPrice = dataHelper.fmtMoney(goods.price) * goods.num;
				goods.totalPrice = dataHelper.fmtMoney(goods.totalPrice);
				GoodsBiz.updateCartList(cartList);
				this.setData({
					cartList: GoodsBiz.getCartList()
				});
			}
		}



	},

	bindNumInput: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let idx = pageHelper.dataset(e, 'idx');
		let cartList = this.data.cartList;
		let goods = cartList.list[idx];
		if (!goods) return;

		goods.num = Number(e.detail.value);
		goods.totalPrice = dataHelper.fmtMoney(goods.price) * goods.num;

		GoodsBiz.updateCartList(cartList);
		this.setData({
			cartList: GoodsBiz.getCartList()
		});
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindOrderTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let list = this.data.cartList.list;
		if (list.length == 0) return pageHelper.showModal('请先选择要订购的餐品~');

		let cb = async () => {
			try {
				let params = {
					totalPrice: this.data.cartList.totalPrice,
					total: this.data.cartList.total,
					list
				};
				let options = {
					title: '订购中'
				}
				await cloudHelper.callCloudSumbit('order/goods', params, options).then(res => {
					let callback = () => {
						GoodsBiz.clearCart();
						wx.reLaunch({
							url: '../../my/index/my_index',
						});
					}
					pageHelper.showModal('订购成功~', '温馨提示', callback);

				});
			}
			catch (err) {
				console.error(err);
			}
		}
		pageHelper.showConfirm('确认下单？', cb);

	},


})