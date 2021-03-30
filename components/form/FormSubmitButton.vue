<template>
	<button type="submit" :disabled="disabled" :class="[
		'btn',
		'form-submit',
		loading && 'form-submit_loading',
		disabled && 'form-submit_disabled',
		icon && 'form-submit_icon'
	]">
		{{ label }}
	</button>
</template>

<script>

export default {

	name: 'FormSubmitButtom',

	components: {

	},

	props: {
		loading: {
			type: Boolean,
			default: false
		},

		label: {
			type: String,
			default: ''
		},

		disabled: {
			type: Boolean,
			default: false
		},

		icon: {
			type: Boolean,
			default: false
		}
	},

	created() {

	},

	data: () => ({

	}),

	computed: {

	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss">
$ico-btn-loading: url('~assets/i/ico-btn-loading.svg?data');
.form-submit {
	padding: 15px;
	font-family: 'Proxima Nova';
	font-weight: bold;
	font-size: 16px;
	line-height: 20px;
	color: #FFFFFF;
	background: #2E87C8;
	border-radius: 4px;

	&_loading {
		transition: none;
		color: transparent;
		background: #2E87C8 $ico-btn-loading no-repeat center;
	}

	&_disabled {
		cursor: not-allowed;
		background: #C9C9C9;
	}

	&_icon {
		position: relative;
		width: 42px;
    height: 40px;
    padding: 0;
    &:before {
			content: '';
    	top: 50%;
    	left: 50%;
    	position: absolute;
	    width: 14px;
	    height: 2px;
	    display: block;
	    background: #FFFFFF;
	    transform: rotate(45deg) translate3d(-8px, 0px, 0);
    }
    &:after {
			content: '';
    	bottom: 50%;
    	left: 50%;
    	position: absolute;
	    width: 14px;
	    height: 2px;
	    display: block;
	    background: #FFFFFF;
	    transform: rotate(-45deg) translate3d(-8px, 0px, 0);
    }
	}
}
</style>