<template>
<div v-if="loading" class="loadercontainer">
	<div id="preloader"></div>
<!-- 	<div class="inner">
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
	</div> -->
</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data: () => ({
			// loading: true
		}),
		computed: {
			...mapGetters({
				loading: 'pages/loading',
			}),
		},
		methods: {
			start() {
				// this.loading = true
			},
			finish() {
				// this.loading = false
				// setTimeout(() => this.loading = false, 500)
			},
		}
	}
</script>

<style scoped>

	.loadercontainer {
		position: fixed;
		top: 0;
		z-index: 99999;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #2b2e3b 47.41%, #20222c 100%);
	}


/*#preloader{
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
}*/

	@-webkit-keyframes animation{from{-webkit-transform:scale(1);-webkit-animation-timing-function:ease-in-out}30%{-webkit-transform:rotateY(0) translateZ(100px) scale(1.2)}50%{-webkit-transform:rotateY(0) translateZ(100px) scale(.8)}70%{-webkit-transform:rotateY(0) translateZ(100px) scale(1.2)}to{-webkit-transform:scale(1);-webkit-animation-timing-function:ease-in-out}}@keyframes animation{from{transform:scale(1);animation-timing-function:ease-in-out}30%{transform:rotateY(0) translateZ(100px) scale(1.2)}50%{transform:rotateY(0) translateZ(100px) scale(.8)}70%{transform:rotateY(0) translateZ(100px) scale(1.2)}to{transform:scale(1);animation-timing-function:ease-in-out}}.loadercontainer{perspective:600px;-webkit-perspective:600px;text-align:center;position:fixed;padding-top:200px;height:100%;width:100%;z-index:999999;top:0;left:0;background-color:#243238}#preloader{margin:0 auto;width:220px;height:56px;-webkit-animation-name:animation;-webkit-animation-duration:3s;-webkit-animation-iteration-count:infinite;animation-name:animation;animation-duration:3s;animation-iteration-count:infinite;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 56'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%232988c9;%7D.cls-2%7Bfill:%23fff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3Ewpd-crown%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M2.18,12.44a2.1,2.1,0,0,0,.94-.22A50.75,50.75,0,0,1,6.59,23.33l.54,3A50.71,50.71,0,0,1,24,23.58a50.61,50.61,0,0,1,17,2.79l.31-2A52.21,52.21,0,0,1,45,12.22a2.18,2.18,0,1,0-.61-.44,24.41,24.41,0,0,1-12.52,6.55,28.93,28.93,0,0,1-7.43-14,2.18,2.18,0,1,0-.72,0,29,29,0,0,1-7.42,14A24.44,24.44,0,0,1,3.73,11.78a2.15,2.15,0,0,0,.63-1.53,2.18,2.18,0,1,0-2.18,2.19Z'/%3E%3Cpath class='cls-1' d='M112.46,46.13V23.61h5.21a10.18,10.18,0,0,1,2.15.22,4.89,4.89,0,0,1,1.88.85A4.38,4.38,0,0,1,123,26.41a7.05,7.05,0,0,1,.5,2.86V33a7.05,7.05,0,0,1-.5,2.86,4.44,4.44,0,0,1-3.21,2.61,10.19,10.19,0,0,1-2.15.23h-1.49v7.44Zm3.72-10.73h1.33a2.48,2.48,0,0,0,1.76-.52,2.39,2.39,0,0,0,.54-1.76V29.18a2.45,2.45,0,0,0-.54-1.8,2.48,2.48,0,0,0-1.76-.52h-1.33Z'/%3E%3Cpath class='cls-1' d='M133.17,44.83a5.06,5.06,0,0,1-3.74,1.3,5.12,5.12,0,0,1-3.77-1.3,5.56,5.56,0,0,1-1.31-4.07V34.64a5.53,5.53,0,0,1,1.31-4.07,5.13,5.13,0,0,1,3.77-1.31,5.07,5.07,0,0,1,3.74,1.31,5.53,5.53,0,0,1,1.31,4.07v6.12A5.56,5.56,0,0,1,133.17,44.83ZM129.43,32.1a1.67,1.67,0,0,0-1.39.52,2.44,2.44,0,0,0-.42,1.56v7a2.47,2.47,0,0,0,.42,1.57,1.67,1.67,0,0,0,1.39.52c1.19,0,1.78-.7,1.78-2.09v-7C131.21,32.79,130.62,32.1,129.43,32.1Z'/%3E%3Cpath class='cls-1' d='M139.85,35.4c.29-.62.67-1.34,1.15-2.16l2.23-4h3.14l-3.79,7,4.11,9.83h-3.43l-2.82-6.93-1.39,2.41v4.52h-3.3V23.59h3.3V37.11C139.29,36.59,139.55,36,139.85,35.4Z'/%3E%3Cpath class='cls-1' d='M150,41.21a2.47,2.47,0,0,0,.42,1.57,1.67,1.67,0,0,0,1.39.52c1.19,0,1.78-.7,1.78-2.09V41h3v-.22a5.6,5.6,0,0,1-1.28,4.07,5.86,5.86,0,0,1-7.36,0,5.69,5.69,0,0,1-1.26-4.07V34.64A5.65,5.65,0,0,1,148,30.57a5.82,5.82,0,0,1,7.36,0,5.57,5.57,0,0,1,1.28,4.07v4H150ZM153.6,36V34.18c0-1.39-.59-2.08-1.78-2.08a1.67,1.67,0,0,0-1.39.52,2.44,2.44,0,0,0-.42,1.56V36Z'/%3E%3Cpath class='cls-1' d='M157.85,29.26h3.07v2.61a1.45,1.45,0,0,1,.16-.42,4.44,4.44,0,0,1,.75-1.13,3.08,3.08,0,0,1,3.5-.84,2.2,2.2,0,0,1,1,.75,3.82,3.82,0,0,1,.65,1.42,9.08,9.08,0,0,1,.22,2.21v.92h-3v-.59a2.55,2.55,0,0,0-.39-1.65,1.36,1.36,0,0,0-1.44-.37,2,2,0,0,0-1,1.23,2.9,2.9,0,0,0-.17,1V46.13h-3.3Z'/%3E%3Cpath class='cls-2' d='M61.46,36.92c-.13-1-.25-2-.37-3.05s-.21-2.12-.28-3.21c-.11,1.09-.21,2.16-.31,3.21s-.21,2.07-.34,3.05L58.9,46.13H54.53L51.2,23.58H55l1.29,8.87c.17,1.31.33,2.54.47,3.7s.26,2.39.37,3.7c.09-1.31.2-2.54.33-3.7s.29-2.4.48-3.73l1.3-8.84h3.69l1.26,8.87c.17,1.31.32,2.54.45,3.7s.25,2.39.36,3.7c.11-1.31.22-2.54.34-3.7s.27-2.4.47-3.73l1.29-8.84h3.43L67.19,46.13H62.75Z'/%3E%3Cpath class='cls-2' d='M79.32,44.83a6.07,6.07,0,0,1-7.51,0,5.52,5.52,0,0,1-1.31-4.07V34.64a5.49,5.49,0,0,1,1.31-4.07,6,6,0,0,1,7.51,0,5.53,5.53,0,0,1,1.31,4.07v6.12A5.56,5.56,0,0,1,79.32,44.83ZM75.58,32.1a1.67,1.67,0,0,0-1.39.52,2.44,2.44,0,0,0-.42,1.56v7a2.47,2.47,0,0,0,.42,1.57,1.67,1.67,0,0,0,1.39.52c1.19,0,1.78-.7,1.78-2.09v-7C77.36,32.79,76.77,32.1,75.58,32.1Z'/%3E%3Cpath class='cls-2' d='M81.89,29.26H85v2.61a1.45,1.45,0,0,1,.16-.42l.2-.4a4.36,4.36,0,0,1,.55-.73,3.24,3.24,0,0,1,1.48-.95,3.29,3.29,0,0,1,2,.11,2.2,2.2,0,0,1,1,.75A3.82,3.82,0,0,1,91,31.65a9,9,0,0,1,.23,2.21v.92h-3v-.59a2.55,2.55,0,0,0-.39-1.65,1.38,1.38,0,0,0-1.45-.37,2,2,0,0,0-1,1.23,2.9,2.9,0,0,0-.17,1V46.13h-3.3Z'/%3E%3Cpath class='cls-2' d='M92.64,23.58h3.3V46.13h-3.3Z'/%3E%3Cpath class='cls-2' d='M186.66,41.21a2.47,2.47,0,0,0,.42,1.57,1.67,1.67,0,0,0,1.39.52c1.19,0,1.78-.7,1.78-2.09V41h3.05v-.22A5.64,5.64,0,0,1,192,44.83a5.87,5.87,0,0,1-7.37,0,5.69,5.69,0,0,1-1.26-4.07V34.64a5.65,5.65,0,0,1,1.26-4.07,5.84,5.84,0,0,1,7.37,0,5.61,5.61,0,0,1,1.28,4.07v4h-6.64ZM190.25,36V34.18c0-1.39-.59-2.08-1.78-2.08a1.67,1.67,0,0,0-1.39.52,2.44,2.44,0,0,0-.42,1.56V36Z'/%3E%3Cpath class='cls-2' d='M176.4,23.58a10.26,10.26,0,0,1,2.15.23,4.81,4.81,0,0,1,1.88.85,4.41,4.41,0,0,1,1.33,1.72,7.1,7.1,0,0,1,.5,2.87V40.47a7.05,7.05,0,0,1-.5,2.86,4.38,4.38,0,0,1-1.33,1.73,4.79,4.79,0,0,1-1.88.84,9.63,9.63,0,0,1-2.15.23h-5.28V23.58Zm-1.55,19.3h1.39a2.44,2.44,0,0,0,1.76-.53,2.41,2.41,0,0,0,.54-1.79V29.15a2.44,2.44,0,0,0-.54-1.79,2.44,2.44,0,0,0-1.76-.52h-1.39Z'/%3E%3Cpath class='cls-2' d='M205.8,23.58h3.3V46.13h-3.3Z'/%3E%3Cpath class='cls-2' d='M216.22,39.94a5.12,5.12,0,0,0-1.77-1.19,10.32,10.32,0,0,1-3.19-1.86,4.59,4.59,0,0,1-.79-4.83,4,4,0,0,1,2.47-2.45c2.47-.86,6.05-.23,6.84,2.67A6.73,6.73,0,0,1,220,34v.57h-3v-.54a2.23,2.23,0,0,0-.74-1.88,1.86,1.86,0,0,0-2.2.13,2.2,2.2,0,0,0-.47,2.15,3.06,3.06,0,0,0,1.63,1.37,11.1,11.1,0,0,1,3.31,1.93A5.13,5.13,0,0,1,220,41.58a4.84,4.84,0,0,1-1.3,3.36,5.06,5.06,0,0,1-3.61,1.19,4.94,4.94,0,0,1-3.62-1.24A5.21,5.21,0,0,1,210.2,41v-.41h3v.73c0,1.08.46,2.1,1.65,2.18C216.69,43.63,217.21,41.11,216.22,39.94Z'/%3E%3Cpath class='cls-2' d='M104.25,23.58h-.12v7.77a3.84,3.84,0,0,0-1.3-1.5,3.42,3.42,0,0,0-2-.59,4.44,4.44,0,0,0-1.44.23,2.6,2.6,0,0,0-1.14.77,3.8,3.8,0,0,0-.74,1.45A7.9,7.9,0,0,0,97.23,34v7.49a7.67,7.67,0,0,0,.28,2.25,3.87,3.87,0,0,0,.74,1.45,2.55,2.55,0,0,0,1.13.76,4.26,4.26,0,0,0,1.44.23,3.53,3.53,0,0,0,2.16-.66,3.8,3.8,0,0,0,1.28-1.71v2.37h3.15V23.58ZM104.12,41a2.43,2.43,0,0,1-.57,1.64,1.77,1.77,0,0,1-1.41.67,1.57,1.57,0,0,1-1.21-.44,2.47,2.47,0,0,1-.41-1.65l0-7a2.47,2.47,0,0,1,.4-1.64,1.55,1.55,0,0,1,1.21-.44,1.76,1.76,0,0,1,1.41.66,2.47,2.47,0,0,1,.57,1.65Z'/%3E%3Cpath class='cls-2' d='M204.36,42.47V34.6a5.75,5.75,0,0,0-1.22-4.05,4.76,4.76,0,0,0-3.64-1.29,4.87,4.87,0,0,0-3.67,1.29,5.66,5.66,0,0,0-1.25,4.05V35h3.08v-.8A2.77,2.77,0,0,1,198,32.6a1.54,1.54,0,0,1,1.33-.54,1.49,1.49,0,0,1,1.3.54,2,2,0,0,1-.45,2.82,13.12,13.12,0,0,1-2,1,15.12,15.12,0,0,0-1.72,1,5.53,5.53,0,0,0-2.22,3.1c-.4,1.68-.11,4.05,1.47,5a3.9,3.9,0,0,0,4.17-.19,3.55,3.55,0,0,0,1.23-1.73v2.43h3.18V43.87C204.36,43.44,204.37,43,204.36,42.47ZM201.05,41a2.51,2.51,0,0,1-.55,1.65,1.75,1.75,0,0,1-1.42.66,1.6,1.6,0,0,1-1.67-1.71,3.31,3.31,0,0,1,1.81-2.87c.6-.33,1.24-.56,1.84-.9C201.05,38.89,201.05,39.94,201.05,41Z'/%3E%3Cpath class='cls-1' d='M41.07,29.16l0-.07h0c-.64-.81-2.29-1.5-4.95-2.05a62.67,62.67,0,0,0-12-1,62.67,62.67,0,0,0-12,1,11.22,11.22,0,0,0-4.61,1.71A14,14,0,0,0,4,37.94a10.06,10.06,0,0,0,20.11.55A20.23,20.23,0,0,1,12,56H36.14a20.19,20.19,0,0,1-12-17.51,10,10,0,0,0,16,7.61,10.15,10.15,0,0,1,1-16.94Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
</style>