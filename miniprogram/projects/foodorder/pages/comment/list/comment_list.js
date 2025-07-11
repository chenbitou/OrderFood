const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: true,
		isAdmin: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;
		if (!pageHelper.getOptions(this, options, 'type')) return;

		this.setData({
			nowUserId: PassportBiz.getUserId(),
			_params: { oid: this.data.id, isLoad: true }
		});

		if (options && options.source && options.source == 'admin') {
			this.setData({ isAdmin: true });
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
		this.setData({
			nowUserId: PassportBiz.getUserId(),
		});
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
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindDelTap: async function (e) {

		let commentId = pageHelper.dataset(e, 'id');
		let cb = async () => {
			try {
				let params = {
					id: commentId,
					isAdmin: this.data.isAdmin
				}
				let opts = {
					title: '删除中'
				}

				await cloudHelper.callCloudSumbit('comment/del', params, opts).then(res => {
					let callback = () => {
						pageHelper.delListNode(commentId, this.data.dataList.list, '_id');
						this.data.dataList.total--;
						this.setData({
							dataList: this.data.dataList
						});
					}
					pageHelper.showSuccToast('删除成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认删除?', cb);
	}
})