<template>
	<view class="container">
		<!-- 文章标题输入框，和title变量绑定 -->
		<view class="head">
			<input type="text" class="text" v-model="title" placeholder="请输入标题" />
			<p class="green-btn" @tap="postArticle">发布</p>
		</view>
		<!-- 选择图片的按钮，点击触发chooseImg方法 -->
		<!--  -->

		<!-- 文章内容输入的多行文本域，绑定content变量 -->
		<textarea placeholder="请输入正文" v-model="content" class="content" />
		<text class="look">预览</text>
		<!-- 使用graceUI的富文本解析功能，来预览文章内容 -->
		<view class="grace-text"><rich-text :nodes="content" bindtap="tap"></rich-text></view>
		<view class="footer">
			<p class="add-btn" @tap="chooseImg"><image src="../../static/xiangce%20(1).png" ></image></p>
			<image src="../../static/A.png"></image>
			<image src="../../static/xiaoxi.png"></image>
			<image src="../../static/diaotou.png"></image>
			<image src="../../static/asmkticon0226.png"></image>
			<image src="../../static/setting.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			imgs: []
		};
	},
	methods: {
		chooseImg: function() {
			var _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					uni.uploadFile({
						url: _this.apiServer + '/upload',
						filePath: res.tempFilePaths[0],
						name: 'file',
						success: uploadFileRes => {
							//图片上传成功，回显图片地址
							console.log(uploadFileRes.data);
							//将图片地址加入imgs数组
							_this.imgs.push(uploadFileRes.data);
							//将图片地址拼接HTML标签，加入文章内容
							_this.content +=
								'< img src="' + uploadFileRes.data + '" width = "100%"/>';
						}
					});
				}
			});
		},
		postArticle: function() {
			var _this = this;
			uni.request({
				/* url: this.apiServer + '/article/add', */
				url: 'http://192.168.43.83:8080/api/article/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					uId: this.userId,
					title: this.title,
					content: '<div>' + this.content + '</div>'
				},
				success: res => {
					if (res.data.code === 0) {
						//获得发布文章成功返回的文章id
						var aId = res.data.data;
						console.log(aId);
						uni.showToast({
							title: '发布成功'
						});
						//将文章id和文章对应的图片地址数组传到后台，存入数据库
						uni.request({
							/* url: this.apiServer + '/img/add', 文章不能显示图片*/
							url: 'http://192.168.43.83:8080/api/article/write/add',
							method: 'POST',
							header: { 'content-type': 'application/x-www-form-urlencoded' },
							data: {
								aId: aId,
								imgs: JSON.stringify(_this.imgs) //序列化imgs数组
							},
							success: res => {
								if (res.data.code === 0) {
									console.log('文章图片地址已写入数据库');
								}
							}
						});
						uni.switchTab({
							url: '../index/index'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.text {
	border-bottom: 1upx solid #e6e6e6;
	border-bottom-style: dashed;
	/* margin-top: 60upx; */
	padding-bottom: 30upx;
	padding-top: 30upx;
	font-size: 50upx;
}
.content {
	padding-top: 20upx;
}
.green-btn {
	color: rgb(229, 120, 124);
	margin-top: 20upx;
}
.head {
	display: flex;
	justify-content: space-between;
}
.footer {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-between;
	background-color: #ededed;
	color: #444;
	margin-top: 1100upx;
	padding-left: 20upx;
	left: 20upx;
	border: 1upx solid #aaa;
	padding-right: 10upx;
}
.footer image {
	width: 60upx;
	height: 60upx;
}
</style>
