const behavior = require('../../../../../comm/behavior/about_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const fileHelper = require('../../../../../helper/file_helper.js');

Page({

	behaviors: [behavior],

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		options.key = 'SETUP_NOTICE';

		await this._loadMy();

		this._loadDetail(options.key, projectSetting.SETUP_CONTENT_ITEMS);
	}, 

	_loadMy: async function (e) {
		let opts = {
			title: 'bar'
		}
		let user = await cloudHelper.callCloudData('passport/my_detail', {}, opts);
		if (user) {
			return wx.reLaunch({ url: '../../my/index/my_index' });
		}
	},

	url: function (e) {
		pageHelper.url(e, this);
	},
	back: function (e) {
		wx.navigateBack();
	}
})