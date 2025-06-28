/**
 * Notes: 样片模块业务逻辑
 */

const BaseProjectService = require('./base_project_service.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const CommentModel = require('../model/comment_model.js');
const UserModel = require('../model/user_model.js');

class CommentService extends BaseProjectService {

	async statComment(type, oid) {
		let cnt = await CommentModel.count({ COMMENT_OID: oid });

		if (type == 'goods') {
			let GoodsModel = require('../model/goods_model.js');
			await GoodsModel.edit(oid, { GOODS_COMMENT_CNT: cnt });
		}

	}

	async delComment(userId, id) {
		let where = {
			_id: id
		}

		// for admin
		if (userId) where.COMMENT_USER_ID = userId;

		let comment = await CommentModel.getOne(id);
		if (!comment) return;

		// 异步处理 新旧文件
		cloudUtil.handlerCloudFilesForForms(comment.COMMENT_FORMS, []);

		await CommentModel.del(where);

		this.statComment(comment.COMMENT_TYPE, comment.COMMENT_OID);
	}

	async insertComment(userId, {
		type,
		oid,
		forms
	}) {
 


		// 赋值 
		let data = {};
		data.COMMENT_USER_ID = userId;
		data.COMMENT_TYPE = type;
		data.COMMENT_OID = oid;
		data.COMMENT_OBJ = dataUtil.dbForms2Obj(forms);
		data.COMMENT_FORMS = forms;

		let id = await CommentModel.insert(data);

		this.statComment(type, oid);

		return {
			id
		};
	}

	// 更新forms信息
	async updateCommentForms({
		id,
		hasImageForms
	}) {
		await CommentModel.editForms(id, 'COMMENT_FORMS', 'COMMENT_OBJ', hasImageForms);

	}

	async getCommentList({
		oid,
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件
		page,
		size,
		isTotal = true,
		oldTotal }) {
		orderBy = orderBy || {
			'COMMENT_ADD_TIME': 'desc'
		};
		let fields = 'COMMENT_ADD_TIME,COMMENT_USER_ID,COMMENT_OBJ,user.USER_NAME,user.USER_PIC';

		let where = { COMMENT_OID: oid };

		let joinParams = {
			from: UserModel.CL,
			localField: 'COMMENT_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		return await CommentModel.getListJoin(joinParams, where, fields, orderBy, page, size, isTotal, oldTotal);
	}

}

module.exports = CommentService;