<template>
	<view class="container">
		<!-- 顶部头像和昵称区域，纵向排列 -->
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="storageData.avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
				<text v-if="storageData.login">{{ storageData.nickname }}</text>
				<navigator url="../setting/setting" v-if="storageData.login"><text class="setting-txt">个人设置</text></navigator>
			</view>
		</view>

		<!-- 中间文章数量、好友数量、消息数量等统计区域，横向排列 -->
		<view>
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title" >
				<view
					v-for="(cate, index) in categories"
					:key="index"
					:data-cateid="cate.cateid"
					:data-index="index"
					:class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
					@tap="tabChange"
				>
					{{ cate.name }}
				</view>
			</scroll-view>
			<view class="demo-content" v-if="storageData.login">
				<!-- 文章部分 -->
				<view class="content" v-if="cateCurrentIndex === 0">
					<view class="list">
						<view class="list-item" v-for="(article, index) in articles" :key="index">
							<text @tap="gotoDetail(article.id)">{{ article.title }}</text>
						</view>
					</view>
				</view>
				<!-- 关注部分 -->
				<view class="content" v-if="cateCurrentIndex === 1">
					<view class="list">
						<view class="list-item" v-for="(follow, index) in follows" :key="index">
							<image :src="follow.avatar" class="avatar small"></image>
							<text style="margin-left: 20px;">{{ follow.nickname }}</text>
						</view>
					</view>
				</view>
				<!-- 喜欢部分 -->
				<view class="content" v-if="cateCurrentIndex === 2">
					<view class="list">
						<view class="list-item" v-for="(like, index) in likes" :key="index">
							<image :src="like.title" class="title small"></image>
							<text style="margin-left: 20px;">{{ like.createTime }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var loginRes, _self;
export default {
	data() {
		return {
			storageData: {
				userId: 0,
				nickname: '',
				avatar: '',
				title:'',
				createTime:'',
				login: false
			},
			//分类信息
			categories: [{ cateid: 0, name: '文章' }, { cateid: 1, name: '关注' }, { cateid: 2, name: '喜欢' }],
			// 当前选择的分类
			cateCurrentIndex: 0,
			articles: [],
			follows: [],
			likes:[]
		};
	},
	onLoad: function() {},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');
		if (loginKey) {
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				userId: loginKey.userId,
				title:loginKey.title
			};
			uni.request({
				url: this.apiServer + '/article/user_count',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articleCount = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articles = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
			uni.request({
					url: this.apiServer + '/like/list',
					method: 'GET',
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						fromId: this.storageData.userId
					},
					success: res => {
						_this.follows = res.data.data;
					}
				});
			} 
	},
	methods: {
		tabChange: function(e) {
			// 选中的索引
			var index = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId + '&userId=' + this.storageData.userId
			});
		}
	}
};
</script>

<style scoped>
.top {
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 100px;
	margin-top: 5px;
}
.avatar-box {
	flex: 1 1 30%;
}
.info-box {
	flex: 1 1 70%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.setting-txt {
	color: #00b26a;
	margin-left: 15px;
}
.center {
	display: flex;
	justify-content: center;
}
.info {
	flex: 1 1 25%;
	display: flex;
	flex-direction: column;
	text-align: center;
	border-right: 1px solid #eee;
}
.title {
	font-size: 14pt;
}
.content {
	margin-top: 20px;
	display: flex;
}
.list-item image{
	width: 80upx;
	height: 80upx;
	margin-top: -20upx;
}
</style>
