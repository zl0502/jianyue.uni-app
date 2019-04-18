<template>
	<view class="container">
		<view>
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
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
			<view class="demo-content">
				<!-- 文章部分 -->
				<view class="content" v-if="cateCurrentIndex === 0">
					<view class="list">
						<view class="article-box">
							<view class="article" v-for="(article, index) in articles" :key="index">
								<!-- 标题 -->
								<text class="article-title" @tap="gotoDetail(article.id)">
									{{ article.title }}
								</text>
								<!-- 大于等于三张图片的显示方式 -->
								<view class="contentes" v-if="article.imgs.length >= 3">
									<view class="thumbnail-box">
										<view
											class="thumbnail-item"
											v-for="(item, index1) in article.imgs"
											:key="index1"
											v-if="index1 < 3"
										>
											<image :src="item.imgUrl"></image>
										</view>
									</view>
								</view>
								<!-- 小于三张图片的显示方式 -->
								<view class="" v-else-if="article.imgs.length >= 1">
									<view class="text-img-box">
										<view class="left">
											<!-- <text>{{handleContent(article.content)}}...</text> -->
											<text>{{ article.title }}</text>
										</view>
										<view class="right">
											<image
												:src="article.imgs[article.imgs.length - 1].imgUrl"
											></image>
										</view>
									</view>
								</view>
								<!-- 没有图片的显示方式 -->
								<view class="text-box" v-else>
									<!-- <text>{{handleContent(article.content)}}...</text> -->
									<text>{{ article.title }}</text>
								</view>
								<!-- 文章作者等信息 -->
								<view class="article-info">
									<image :src="article.avatar" class="avatar small"></image>
									<text class="info-text">{{ article.nickname }}</text>
									<!-- <text class="info-text">{{handleTime(article.createTime)}}</text> -->
									<!-- <text>{{ article.createTime }}</text> -->
								</view>
							</view>
						</view>
						<view class="green-btn">
							<navigator url="../write/write" hover-class="navigator-hover" @tap="islogin()" v-if="login">
				<button class="btn"><text class="icon-text">+</text></button>
			</navigator>
			<navigator url="../signin/signin" hover-class="navigator-hover" @tap="islogin()" v-else>
				<button class="btn"><text class="icon-text">+</text></button>
			</navigator>
						</view>
					</view>
				</view>
				<!-- 专题部分 -->
				<view class="content" v-if="cateCurrentIndex === 1">
					<view class="pic"><image src="../../static/pic.png"></image></view>
					<view class="list1">
						<view class="list1-item">
							<image src="../../static/beishichang.png"></image>
							贝市场
						</view>
						<view class="list1-item">
							<image src="../../static/jianyou.png"></image>
							简友广场
						</view>
						<view class="list1-item">
							<image src="../../static/remen.png"></image>
							热门专题
						</view>
						<view class="list1-item">
							<image src="../../static/tousu.png"></image>
							投诉建议
						</view>
						<view class="list1-item">
							<image src="../../static/hudong.png"></image>
							添加公益
						</view>
					</view>
					<view class="next">
						<view class="next-img"><image src="../../static/all.png"></image></view>
						<view class="next-text"><text>我关注的专题</text></view>
					</view>
					<view class="next1">
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/draw.png"></image>
								漫画
							</view>
							<view class="next1-item">
								<image src="../../static/draw7.png"></image>
								短篇小说
							</view>
							<view class="next1-item">
								<image src="../../static/draw6.png"></image>
								读书
							</view>
						</view>
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/draw1.png"></image>
								生活家
							</view>
							<view class="next1-item">
								<image src="../../static/draw2.png"></image>
								娱乐圈
							</view>
							<view class="next1-item">
								<image src="../../static/draw3.png"></image>
								美食
							</view>
						</view>
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/draw4.png"></image>
								连载小说
							</view>
							<view class="next1-item">
								<image src="../../static/draw5.png"></image>
								摄影
							</view>
						</view>
					</view>
					<view class="finally"><text class="final">--end--</text></view>
				</view>
				<!-- 连载部分 -->
				<view class="content" v-if="cateCurrentIndex === 2">
					<view class="pic"><image src="../../static/pic2.png"></image></view>
					<view class="list1">
						<view class="list1-item">
							<image src="../../static/picture1.png"></image>
							全部分类
						</view>
						<view class="list1-item">
							<image src="../../static/picture2.png"></image>
							签约作品
						</view>
						<view class="list1-item">
							<image src="../../static/picture3.png"></image>
							对话小说
						</view>
						<view class="list1-item">
							<image src="../../static/picture4.png"></image>
							简书FM
						</view>
						<view class="list1-item">
							<image src="../../static/picture5.png"></image>
							开通连载
						</view>
					</view>
					<view class="next">
						<view class="next-img"><image src="../../static/picture16.png"></image></view>
						<view class="next-text"><text>我关注的连载</text></view>
					</view>
					<view class="next1">
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/picture6.png"></image>
								种下几棵树
							</view>
							<view class="next1-item">
								<image src="../../static/picture7.png"></image>
								翊雪佐寒
							</view>
							<view class="next1-item">
								<image src="../../static/picture8.png"></image>
								却上心头
							</view>
						</view>
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/picture9.png"></image>
								含英咀华谈写作
							</view>
							<view class="next1-item">
								<image src="../../static/picture10.png"></image>
								当年明月
							</view>
							<view class="next1-item">
								<image src="../../static/picture11.png"></image>
								爱在太平洋两岸
							</view>
						</view>
						<view class="next1-img">
							<view class="next1-item">
								<image src="../../static/picture12.png"></image>
								往事如烟诗文集
							</view>
							<view class="next1-item">
								<image src="../../static/picture13.png"></image>
								北方在南
							</view>
							<view class="next1-item">
								<image src="../../static/picture14.png"></image>
								简
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			login: false,
			articles: [],
			//分类信息
			categories: [
				{ cateid: 0, name: '推荐' },
				{ cateid: 1, name: '专题' },
				{ cateid: 2, name: '连载' }
			],
			// 当前选择的分类
			cateCurrentIndex:0
			// 内容实例，内容区域您根据项目情况设计即可，覆盖模式
			// content : "全部"
		};
	},
	onLoad: function() {
		this.getArticles();
	},
	onShow: function() {
		const loginKey = uni.getStorageSync('login_key');
		console.log(loginKey);
		if (loginKey) {
			this.login = true;
		} else {
			this.login = false;
		}
	},
	onPullDownRefresh: function() {
		this.getArticles();
	},
	methods: {
		gotoLogin: function(){
			uni.navigateTo({
				url:'../signin/signin'
			})
		},
		islogin: function() {
			if (this.login) {
				console.log('已登录');
			} else {
				console.log('未登录');
			}
		},
		tabChange: function(e) {
			// 选中的索引
			var index = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
		},
		getArticles: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/list',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					_this.articles = res.data.data;
				},
				complete: function() {
					uni.stopPullDownRefresh();
				}
			});
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../article_detail/article_detail?aId=' + aId
			});
		},
		handleContent: function(msg) {
			let description = msg;
			description = description.replace(/(\n)/g, '');
			description = description.replace(/(\t)/g, '');
			description = description.replace(/(\r)/g, '');
			description = description.replace(/<\/?[^>]*>/g, '');
			description = description.replace(/\s*/g, '');
			return description;
		}
	}
};
</script>

<style scoped>
.btn {
	/* 阴影效果，四个参数分别是：水平阴影位置、垂直阴影位置、阴影尺寸位置大小、阴影颜色 */
	box-shadow: 2px 5px 10px #aaa;
	width: 60px;
	height: 60px;
	/* margin: 10px; */
	border-radius: 50%;
	cursor: pointer;
	/* border: none; */
	position: fixed;
	bottom: 35px;
	right: 20px;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	color: #fff;
}
.article {
	width: 100%;
	height: 300upx;
	border: 5upx solid #ededed;
	border-radius: 10upx;
}
.article-info{
	display: flex;
}
.info-text{
	padding: 20upx;
}
/* 改变头像的大小 */
.avatar {
	width: 75upx;
	height: 75upx;
	border-radius: 50%;
}
.thumbnail-box {
	margin-top: 10px;
	display: flex;
	height: 170upx;
	width: 100%;
	border-bottom: 1px solid #e6e7e9;
}
.thumbnail-item {
	flex: 1 1 33%;
	height: 170upx;
	margin-right: 5px;
	margin-left: 5px;
}
.thumbnail-item image {
	width: 100%;
	height: 100%;
}
.text-img-box {
	display: flex;
	flex-direction: row;
}
.right {
	width: 50%;
}
.left {
	flex: 1 1 60%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
	overflow: hidden;
}
.right image {
	width: 90%;
	height: 180upx;
}
.text-box {
	width: 100%;
	height: 180upx;
}
.list1 {
	display: flex;
	border-bottom: 30upx solid #f5f5f5;
}
.list1 image {
	width: 70upx;
	height: 70upx;
	/* margin-left: 100upx; */
}
.list1-item {
	display: flex;
	/* 纵向排列 */
	flex-direction: column;
	flex: 1 1 22%;
	padding: 20upx;
}
.pic image {
	width: 100%;
	height: 300upx;
}
.next {
	display: flex;
	border-bottom: 30upx solid #f5f5f5;
}
.next-img image {
	width: 60upx;
	height: 60upx;
	margin: 20upx;
}
.next-text {
	margin-left: 30upx;
	text-align: center;
	margin-top: 10upx;
	margin: 20upx;
}
.next1 {
	display: flex;
}
.next1-img image {
	width: 200upx;
	height: 200upx;
	margin: 20upx;
}
.next1-text {
	margin-left: 30upx;
	text-align: center;
	margin-top: 10upx;
	margin: 40upx;
}
.finally {
	text-align: center;
}
</style>
