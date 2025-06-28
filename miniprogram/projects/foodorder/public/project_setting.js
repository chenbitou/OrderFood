

module.exports = { //foodorder
	PROJECT_COLOR: '#4C7E50',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#4C7E50',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '用户使用协议', key: 'SETUP_YS' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'dept', title: '部门', type: 'text', must: true },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
		forms: 'formForms|array'
	},

	USER_CHECK_FORM1: {
		name: 'formName|must|string|min:1|max:30|name=姓名',
		mobile: 'formMobile|must|mobile|name=手机',
	},


	NEWS_NAME: '公告通知',
	NEWS_CATE: [
		{ id: 1, title: '公告通知' },

	],
	NEWS_FIELDS: [
	],

	GOODS_NAME: '餐品',
	GOODS_CATE: [
		{ id: 1, title: '主食' },
		{ id: 2, title: '热菜' },
		{ id: 3, title: '汤品' },
		{ id: 4, title: '凉菜' },
		{ id: 5, title: '小吃' },
		{ id: 6, title: '饮品' },
		{ id: 7, title: '水果' },
		{ id: 8, title: '其他' },
	],
	GOODS_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'price', title: '单价(单位：分)', type: 'int', ext: { hint: '此处单位为分' }, must: true },
		{ mark: 'size', title: '销售单位', type: 'text', def: '份', must: true },
		{ mark: 'detail', title: '详细介绍', type: 'content', must: false },

	],

	COMMENT_NAME: '评论',
	COMMENT_FIELDS: [
		{ mark: 'content', title: '评论内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },

	],
}