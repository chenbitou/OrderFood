const pageHelper = require('../../../../../helper/page_helper.js');
const cacheHelper = require('../../../../../helper/cache_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
const GoodsBiz = require('../../../biz/goods_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		query: '',
		isQuery: false,

		scrollLeftCur: 0, //当前项
		scrollRightCur: 0, // 用于实现左边联动右边 

		pList: [],
	},


	onLoad: async function (options) {
		ProjectBiz.initPage(this);

	},

	_loadList: async function (e) {

		// 第一次加载数据库数据
		if (!this.data.isLoad || !this.data.cateList) {
			let params = {
				floorOptions: projectSetting.FLOOR_OPTIONS
			}
			let opts = {
				title: 'bar'
			};
			await cloudHelper.callCloudSumbit('goods/all', params, opts).then(res => {
				this.setData({
					isLoad: true,
					...res.data,
				}, () => {

				});
			});
		}

		// 加载购物车数据
		let cartList = GoodsBiz.getCartList();
		this.setData({
			cartList
		});


		// 把购物车数据赋给商品
		let cateList = this.data.cateList;
		for (let n = 0; n < cartList.list.length; n++) {
			for (let k = 0; k < cateList.length; k++) {
				for (let j = 0; j < cateList[k].list.length; j++) {
					if (cateList[k].list[j].id == cartList.list[n].id) {
						cateList[k].list[j].cnt = cartList.list[n].num;
					}
				}
			}
		}
		this.setData({ cateList });

	},

	bindAddCartTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		console.log(id)

		let cateList = this.data.cateList;
		let node = null;

		for (let k = 0; k < cateList.length; k++) {
			for (let j = 0; j < cateList[k].list.length; j++) {

				if (cateList[k].list[j].id == id) {
					node = cateList[k].list[j];
					node.cnt++;
					this.setData({
						cateList,
						pList: this.data.pList
					});
					break;
				}
			}
			if (node) break;
		}

		/*
		let goodsList = this.data.goodsList;
		for (let k = 0; k < goodsList.length; k++) {
			if (goodsList[k].id == id) {
				node = goodsList[k];
				node.cnt++;
				this.setData({
					goodsList
				});
				break;
			}
		}*/

		if (!node) return;

		let goods = {
			id: node.id,
			title: node.name,
			price: node.price,
			size: node.size,
			totalPrice: node.price,
			pic: node.pic,
			num: 1
		}
		GoodsBiz.addCart(goods);

		this.setData({
			cartList: GoodsBiz.getCartList()
		});
		//	pageHelper.showNoneToast('已成功加入购物车', 500);
	},

	bindSearchConfirm: function (e) {
		let query = this.data.query.trim();
		if (!query) return wx.showToast({
			icon: 'none',
			title: '请输入搜索关键字',
		});

		wx.showLoading({
			title: '搜索中',
		});

		setTimeout(() => {
			wx.hideLoading();
			let pList = [];
			let cateList = this.data.cateList;

			for (let j = 0; j < cateList.length; j++) {
				for (let k = 0; k < cateList[j].list.length; k++) {

					if (cateList[j].list[k].name.toUpperCase().includes(query.toUpperCase())) {
						pList.push(cateList[j].list[k]);
					}

				}
			}

			this.setData({
				pList,
				scrollLeftCur: 0,
				scrollRightCur: 0,
				isQuery: true,
			});
		}, 1000);


	},

	bindClearSearchTap: function (e) {
		this.setData({
			isQuery: false,
			query: '',
			pList: []
		});
	},

	bindMenuTap: function (e) {
		this.setData({
			isQuery: false,
			pList: [],
			query: '',
			scrollLeftCur: 0,
			scrollRightCur: 0,
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		this._loadList();
	},

	onPullDownRefresh: async function () {
		this.setData({ isLoad: false });
		await this._loadList();
		wx.stopPullDownRefresh();
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
 * 用户点击右上角分享
 */
	onShareAppMessage: function () {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	bindSelectTap(e) {
		this.setData({
			isQuery: false,
			scrollLeftCur: e.currentTarget.id,
			scrollRightCur: e.currentTarget.id,
		});

		cacheHelper.set('left', 'left', 2);
	},

	bindScroll(e) {

		if (cacheHelper.get('left')) return;

		let list = this.data.cateList;
		let itemHeight = 0;
		for (let i = 0; i < list.length; i++) {
			//拿到每个元素
			let node = wx.createSelectorQuery().select("#scroll-" + i);
			node.fields({
				size: true
			}, function (res) {
				list[i].top = itemHeight;
				itemHeight += res.height;
				list[i].bottom = itemHeight;
			}).exec();
		}

		// 拿到滚动的高度
		let scrollTop = e.detail.scrollTop;
		for (let i = 0; i < list.length; i++) {
			if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
				this.setData({
					scrollLeftCur: i,
				})
				return false
			}
		}
	}
})
