/**
 * Notes:  餐品实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-05 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class OrderModel extends BaseProjectModel {

}

// 集合名
OrderModel.CL = BaseProjectModel.C('order');

OrderModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ORDER_ID: 'string|true',
	ORDER_USER_ID: 'string|true',

	ORDER_TOTAL_PRICE: 'float|true|default=0|comment=总价',
	ORDER_TOTAL: 'int|true|default=0|comment=数量',
	ORDER_LIST: 'array|true|comment=订单信息',
	ORDER_DAY: 'string|true|comment=日期',

	ORDER_DESC: 'string|false|comment=摘要',

	ORDER_STATUS: 'int|true|default=1|comment=状态 0=未确认,1=成功,9=取消',

	ORDER_ADD_TIME: 'int|true',
	ORDER_EDIT_TIME: 'int|true',
	ORDER_ADD_IP: 'string|false',
	ORDER_EDIT_IP: 'string|false',
};

// 字段前缀
OrderModel.FIELD_PREFIX = "ORDER_";

/**
 * 状态 0=未确认,1=成功 
 */
OrderModel.STATUS = {
	UNUSE: 0,
	SUCC: 1,
	CANCEL: 9
};



module.exports = OrderModel;