const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const validate = require('../../../../../../helper/validate.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		isEdit: true,

		userRegCheck: projectSetting.USER_REG_CHECK,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;

		await this._loadDetail();
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
		let user = await cloudHelper.callCloudData('admin/user_detail', params, opts);
		if (!user) {
			this.setData({
				isLoad: null,
			})
			return;
		};

		let fields = projectSetting.USER_FIELDS;


		this.setData({
			isLoad: true,
			isEdit: true,

			user,

			fields,

			formName: user.USER_NAME,
			formMobile: user.USER_MOBILE,
			formForms: user.USER_FORMS
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

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

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

	bindSubmitTap: async function (e) {
		try {
			let data = this.data;
			// 数据校验 
			data = validate.check(data, projectSetting.USER_CHECK_FORM, this);
			if (!data) return;

			let forms = this.selectComponent("#cmpt-form").getForms(true);
			if (!forms) return;
			data.forms = forms;

			let opts = {
				title: '提交中'
			}

			data.id = this.data.id;

			// 图片
			await cloudHelper.transFormsTempPics(forms, 'user/', '');

			await cloudHelper.callCloudSumbit('admin/user_edit_base', data, opts).then(res => {
				let callback = () => {
					wx.navigateBack();
				}
				pageHelper.showSuccToast('修改成功', 1500, callback);
			});
		} catch (err) {
			console.error(err);
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})