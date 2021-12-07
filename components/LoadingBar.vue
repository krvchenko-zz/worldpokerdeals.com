<template>
<div v-if="loading" id="preloader">
	<div class="inner">
		<div class="spike">
			<div class="flip">
				<div class="front">
					<img src="~/assets/preloader/spike.png">
				</div>
				<div class="back">
					<img src="~/assets/preloader/spike_crown.png">
				</div>
			</div>
		</div>
		<div class="text">
			<img src="~/assets/preloader/empty.png">
		</div>
		<div class="full">
			<img src="~/assets/preloader/full.png">
		</div>
	</div>
</div>
</template>

<script>
	export default {
		data: () => ({
			loading: true
		}),
		methods: {
			start() {
				// this.loading = true
			},
			finish() {
				this.loading = false
				// setTimeout(() => this.loading = false, 500)
			},
		}
	}
</script>

<style scoped>
#preloader{
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 999;
}
#preloader .inner{
		width: 837px;
		height: 209px;
		position: relative;
}
#preloader .text{
		position: absolute;
		right: 0;
		top: 58px;
		overflow: hidden;
}
#preloader .text img{
		position: relative;
		right: 100%;
		animation: b_frame 2s linear infinite;
}
#preloader .full{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 0;
		overflow: hidden;
		width: 837px;
		animation: c_frame 2s linear infinite;
}
#preloader .full img{
		position: absolute;
		left: 0;
		bottom: 0;
}
#preloader .spike{
		perspective: 1000px;
		position: absolute;
		left: 0px;
		bottom: 0;
}
#preloader .flip{
		transition: transform 0.8s;
		transform-style: preserve-3d;
		width:200px;
		height: 210px;
		bottom: 0;
		left: 300px;
		transform: scale(.7);
		position: absolute;
		animation: a_frame 2s linear infinite;
}
#preloader .front,
#preloader .back{
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		position: absolute;
}
#preloader .back{
		transform: rotateY(180deg);
}
@keyframes a_frame {
		0%{
				left: 300px;
				transform: scale(.7);
		}
		5%{
				left: 150px;
				transform: scale(1.3);
		}
		10%{
				left: 0;
				transform: scale(1);
		}
		35%{
				left: 0;
				transform: scale(1) rotateY(180deg);
		}
		100%{
				left: 0;
				transform: scale(1) rotateY(180deg);
		}
}
@keyframes b_frame {
		0%{
				right: 100%;
		}
		25%{
				right: 100%;
		}
		40%{
				right: 0;
		}
		100%{
				right: 0;
		}
}
@keyframes c_frame{
		0%{
				height: 0px;
				width: 837px;
		}
		40%{
				height: 0px;
				width: 837px;
		}
		65%{
				height: 209px;
				width: 837px;
		}
		90%{
				width: 0;
				height: 209px;
		}
		100%{
				width: 0;
				height: 209px;
		}
}
</style>