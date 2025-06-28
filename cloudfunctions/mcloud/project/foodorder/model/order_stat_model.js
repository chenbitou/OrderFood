/**
 * Notes:  餐品实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-12-05 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class OrderStatModel extends BaseProjectModel {

}

// 集合名
OrderStatModel.CL = BaseProjectModel.C('order_stat');

OrderStatModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ORDER_STAT_ID: 'string|true',

	ORDER_STAT_GOODS_ID: 'string|true|comment=餐品ID',
	ORDER_STAT_GOODS_TITLE: 'string|true|comment=餐品标题',
	ORDER_STAT_GOODS_CNT: 'int|true|default=1|comment=餐品数量',

	ORDER_STAT_PRICE: 'int|true|default=1|comment=单价',
	ORDER_STAT_SIZE: 'string|false|comment=单位',
	ORDER_STAT_TOTAL_PRICE: 'int|true|default=1|comment=总价',

	ORDER_STAT_DAY: 'string|true|comment=日期',

	ORDER_STAT_ADD_TIME: 'int|true',
	ORDER_STAT_EDIT_TIME: 'int|true',
	ORDER_STAT_ADD_IP: 'string|false',
	ORDER_STAT_EDIT_IP: 'string|false',
};

// 字段前缀
OrderStatModel.FIELD_PREFIX = "ORDER_STAT_";


module.exports = OrderStatModel;