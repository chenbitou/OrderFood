const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js'); 
const ProjectBiz = require('../../../biz/project_biz.js'); 
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false, 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		if (!pageHelper.getOptions(this, options)) return;
		this._loadDetail(); 
	 
	},

	_loadDetail: async function (e) {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id
		}
		let opts = {
			title: 'bar'
		}
		try {
			let order = await cloudHelper.callCloudData('order/my_detail', params, opts);
			if (!order) {
				this.setData({
					isLoad: null
				})
				return;
			} 

			this.setData({
				isLoad: true,
				order 
			});
		} catch (err) {
			console.error(err);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
 

	url: function (e) {
		pageHelper.url(e, this);
	}, 
	 
})