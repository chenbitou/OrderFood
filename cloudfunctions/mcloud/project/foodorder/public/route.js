/**
 * Notes: 路由配置文件
  * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * User: CC
 * Date: 2025-10-14 07:00:00
 */

module.exports = {
	'test/test': 'test/test_controller@test',


	'job/timer': 'job_controller@minuteJob',

	'home/setup_get': 'home_controller@getSetup',

	'passport/check': 'passport_controller@check',
	'passport/login': 'passport_controller@login',
	'passport/phone': 'passport_controller@getPhone',
	'passport/my_detail': 'passport_controller@getMyDetail',
	'passport/register': 'passport_controller@register',
	'passport/edit_base': 'passport_controller@editBase',

	// 收藏
	'fav/update': 'fav_controller@updateFav',
	'fav/del': 'fav_controller@delFav',
	'fav/is_fav': 'fav_controller@isFav',
	'fav/my_list': 'fav_controller@getMyFavList',

	'admin/home': 'admin/admin_home_controller@adminHome',
	'admin/clear_vouch': 'admin/admin_home_controller@clearVouchData',

	'admin/login': 'admin/admin_mgr_controller@adminLogin',
	'admin/mgr_list': 'admin/admin_mgr_controller@getMgrList',
	'admin/mgr_insert': 'admin/admin_mgr_controller@insertMgr#demo',
	'admin/mgr_del': 'admin/admin_mgr_controller@delMgr#demo',
	'admin/mgr_detail': 'admin/admin_mgr_controller@getMgrDetail',
	'admin/mgr_edit': 'admin/admin_mgr_controller@editMgr#demo',
	'admin/mgr_status': 'admin/admin_mgr_controller@statusMgr#demo',
	'admin/mgr_pwd': 'admin/admin_mgr_controller@pwdMgr#demo',
	'admin/log_list': 'admin/admin_mgr_controller@getLogList',
	'admin/log_clear': 'admin/admin_mgr_controller@clearLog#demo',

	'admin/setup_set': 'admin/admin_setup_controller@setSetup#demo',
	'admin/setup_set_content': 'admin/admin_setup_controller@setContentSetup#demo',
	'admin/setup_qr': 'admin/admin_setup_controller@genMiniQr',

	// 用户 
	'admin/user_list': 'admin/admin_user_controller@getUserList',
	'admin/user_detail': 'admin/admin_user_controller@getUserDetail',
	'admin/user_del': 'admin/admin_user_controller@delUser#demo',
	'admin/user_status': 'admin/admin_user_controller@statusUser#demo',

	'admin/user_data_get': 'admin/admin_user_controller@userDataGet',
	'admin/user_data_export': 'admin/admin_user_controller@userDataExport',
	'admin/user_data_del': 'admin/admin_user_controller@userDataDel',

	'admin/user_edit_base': 'admin/admin_user_controller@editAdminBase',

	// 内容  
	'home/list': 'home_controller@getHomeList',

	'news/list': 'news_controller@getNewsList',
	'news/view': 'news_controller@viewNews',

	'admin/news_list': 'admin/admin_news_controller@getAdminNewsList',
	'admin/news_insert': 'admin/admin_news_controller@insertNews#demo',
	'admin/news_detail': 'admin/admin_news_controller@getNewsDetail',
	'admin/news_edit': 'admin/admin_news_controller@editNews#demo',
	'admin/news_update_forms': 'admin/admin_news_controller@updateNewsForms#demo',
	'admin/news_update_pic': 'admin/admin_news_controller@updateNewsPic#demo',
	'admin/news_update_content': 'admin/admin_news_controller@updateNewsContent#demo',
	'admin/news_del': 'admin/admin_news_controller@delNews#demo',
	'admin/news_sort': 'admin/admin_news_controller@sortNews#demo',
	'admin/news_vouch': 'admin/admin_news_controller@vouchNews#demo',
	'admin/news_status': 'admin/admin_news_controller@statusNews#demo',

	// 餐品 
	'goods/all': 'goods_controller@getAllGoods',
	'goods/list': 'goods_controller@getGoodsList',
	'goods/view': 'goods_controller@viewGoods',

	'admin/goods_list': 'admin/admin_goods_controller@getAdminGoodsList',
	'admin/goods_insert': 'admin/admin_goods_controller@insertGoods#demo',
	'admin/goods_detail': 'admin/admin_goods_controller@getGoodsDetail',
	'admin/goods_edit': 'admin/admin_goods_controller@editGoods#demo#demo',
	'admin/goods_update_forms': 'admin/admin_goods_controller@updateGoodsForms#demo',
	'admin/goods_del': 'admin/admin_goods_controller@delGoods#demo',
	'admin/goods_sort': 'admin/admin_goods_controller@sortGoods#demo',
	'admin/goods_vouch': 'admin/admin_goods_controller@vouchGoods#demo',
	'admin/goods_status': 'admin/admin_goods_controller@statusGoods#demo',

	'order/goods': 'order_controller@orderGoods',
	'order/my_list': 'order_controller@getMyOrderList',
	'order/my_detail': 'order_controller@getMyOrderDetail',
	'order/cancel_my': 'order_controller@cancelMyOrder',

	'admin/order_detail': 'admin/admin_order_controller@getOrderDetail',
	'admin/order_list': 'admin/admin_order_controller@getAdminOrderList',
	'admin/order_status': 'admin/admin_order_controller@statusOrder',
	'admin/order_stat_list': 'admin/admin_order_controller@getAdminOrderStatList',

	'admin/order_stat_data_get': 'admin/admin_order_controller@orderStatDataGet',
	'admin/order_stat_data_export': 'admin/admin_order_controller@orderStatDataExport',
	'admin/order_stat_data_del': 'admin/admin_order_controller@orderStatDataDel',

	'admin/order_data_get': 'admin/admin_order_controller@orderDataGet',
	'admin/order_data_export': 'admin/admin_order_controller@orderDataExport',
	'admin/order_data_del': 'admin/admin_order_controller@orderDataDel',

	// 评论
	'comment/list': 'comment_controller@getCommentList',
	'comment/insert': 'comment_controller@insertComment',
	'comment/update_forms': 'comment_controller@updateCommentForms',
	'comment/del': 'comment_controller@delComment',


}