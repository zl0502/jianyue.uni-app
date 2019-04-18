<template>
	<view>
		<button @click="isShow = true">签到</button>
		<view v-if="isShow" class="overlayer" @touchmove.prevent @click.self="isShow = false">
									<button @tab="back" class="fanhui">签到成功</button>
			<view style="height: 00px;background-color: #fff">
				<button @click="isShow = false" class="wrong">×</button>
			</view>
		</view>
		<view class="container">
		<view class="head">
			<view class="text"><text>消息</text></view>
			<view class="text">
				<image src="../../static/settings.png"></image>
				<image src="../../static/searcher.png"></image>
			</view>
		</view>
		<view class="content">
			<view class="img-text">
				<image src="../../static/message-active.png"></image>
				<text>互动消息</text>
			</view>
			<view class="img-text">
				<image src="../../static/logo1-active.png"></image>
				<text>简书钻</text>
			</view>
			<view class="img-text">
				<image src="../../static/other.png"></image>
				<text>其他提醒</text>
			</view>
		</view>
		<view class="card">
			<view class="look">
				<image src="../../static/question.png"></image>
				<h2>如何免费获取简书钻</h2>
			</view>
			<view class="look"><h2 class="text-5">查看详情</h2></view>
		</view>
		<view class="card1">
			<h2>#1 每天写文章，给文章点喜欢;</h2>
			<h2>#2 找到优质好文章，给文章点喜欢;</h2>
			<h2>#3 分享自己的文章,让其他人点喜欢;</h2>
		</view>
		<view class="next">
			<view class="next2">
				<text>简信</text>
				<text class="next1">新简信</text>
			</view>
		</view>
		<view class="final">
			<view class="left"><image src="../../static/ablum.png"></image></view>
			<view class="right">
				<view class="top">
					<view><text>七夏港_f3ef</text></view>
					<view>
						<text>03-31</text>
						<text>16:53</text>
					</view>
				</view>
				<view class="bottom">
					<text>《其实我很好追的》</text>
					<text>https://www.jianshu...</text>
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
			isShow: false
		};
	}
};
</script>
<style lang="stylus" scoped>
	.wrong{
		height:10upx;
		weight:10upx;
	}
	.fanhui{
		margin-top:200upx
		background:green
	}
// 遮罩层
.overlayer{
	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
}
.container{
	margin-top:-180upx
}
.head {
	display: flex;
	justify-content: space-between;
	border-bottom: 1upx solid #f5f5f5;
	padding: 30upx;
}
.head image {
	width: 40upx;
	height: 40upx;
}
.img-text image {
	width: 100upx;
	height: 100upx;
}
.img-text {
	display: flex;
	flex-direction: column;
	padding: 55upx;
}
.content {
	display: flex;
	border-bottom: 1upx solid #f5f5f5;
}
.card {
	display: flex;
	font-size: 35upx;
	margin-top: 50upx;
	font-weight: 200;
	justify-content: space-between;
}
.card1 {
	font-size: 25upx;
	margin-top: 40upx;
	border-bottom: 15upx solid #f5f5f5;
	padding: 20upx;
}
.card image {
	width: 35upx;
	height: 35upx;
}
.next2 {
	display: flex;
	justify-content: space-between;
	padding: 10upx;
}
.text-5,
.next1 {
	color: #f76260;
}
.look {
	display: flex;
}
.final{
	display: flex;
}
.left image{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
.right{
	display: flex;
	flex-direction: column;
}
.top{
	display: flex;
	justify-content: space-between;
	padding: 10upx;
}
.bottom{
	display: flex;
}
 /* position fixed
  left 0
  top 0
  background-color rgba(0, 0, 0, .5)
  width 100%
  height 100%
  z-index $overlayerZindex
  &.light
    background-color rgba(255, 255, 255,0.7) */
	
</style>
