<template>
	<div>
		<room-action-button
			:slug="room.slug"
			:icon="true"
			type="download"
			label="Перейти"
		/>
		<room-action-button
			:slug="room.slug"
			:icon="true"
			type="connection"
			label="Привязать счет"
		/>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		name: 'RoomActions',

		components: {},

		props: {
			contenteditable: {
				type: [Boolean, String],
			},
		},

		data: () => ({}),

		created() {},

		computed: {
			...mapGetters({
				room: 'rooms/room',
			}),
		},

		watch: {},

		methods: {},
	}
</script>

<style scoped lang="scss">
	.room-actions {
		display: flex;
		margin: 32px 0 40px 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-room-action {
		&_download {
			margin-right: 14px;
			padding: 13px 70px 15px 70px;
			&:after {
				right: 6px;
			}
		}
		&_connection {
			margin-left: 14px;
			padding: 12px 40px 14px 40px;
			border: 2px solid rgba(85, 85, 85, 0.4);
			color: #555555;
			background: transparent;
			&:hover {
				border-color: #dddddd;
				background: #dddddd;
			}
		}
	}
</style>
