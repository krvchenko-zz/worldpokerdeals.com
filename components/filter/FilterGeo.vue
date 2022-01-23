<template>
	<div class="filters-geo">
		<div class="filters-geo__text">
			{{ $t('offers_for') }}
		</div>

		<el-select
			class="el-select-geo"
			:value="geo"
			:loading="loading"
			filterable
			clearable
			reserve-keyword
			popper-class="el-poper-geo"
			@focus="fetchCountries"
			@change="handleGeoChange"
			@clear="handleGeoClear"
		>
			<template slot="prefix">
				<svg-icon
					prefix="flags/"
					:width="24"
					:height="24"
					:icon="geo"
					:image="true"
				/>
			</template>
			<el-option
				v-for="item in countries"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			>
				<span style="float: left; margin-right: 12px;">
					<svg-icon
						prefix="flags/"
						:width="24"
						:height="24"
						:icon="item.value"
						:image="true"
					/>
				</span>
				<span>{{ item.label }}</span>
			</el-option>
		</el-select>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'FilterGeo',

		data: () => ({
			loading: false,
			countries: [],
		}),

		props: {
			geo: {
				type: [String, Boolean, Number],
			},
		},

		mounted() {
			this.countries.push({
				label: this.country.from,
				value: this.country.code,
			})
		},

		computed: {
			...mapGetters({
				locale: 'lang/locale',
				country: 'location/country',
			}),
		},

		methods: {
			handleGeoChange($event) {
				this.$emit('update:geo', $event)
			},

			handleGeoClear() {
				this.$emit('update:geo', null)
			},

			async fetchCountries() {
				if (this.countries.length > 1) {
					return false
				}
				this.loading = true
				await this.$axios.get('countries', {
					params: {
						locale: this.locale,
					}
				}).then(response => {
					this.countries = response.data.map(item => {
						return {
							value: item.code,
							label: item.from,
						}
					})
					this.loading = false
				})
			},
		},
	}
</script>

<style lang="scss">
	.filters-geo {
		margin-left: auto;
		margin-right: 24px;
		&__text {
			margin-right: 16px;
			display: inline-flex;
			font-family: 'Proxima Nova';
			font-size: 14px;
			line-height: 16px;
			color: #333333;
		}
	}

	.el-select-geo {
		max-width: 164px;
		.el-input__prefix {
			left: 16px;
			align-items: center;
			display: flex;
		}

		.el-input__inner {
			padding-left: 52px;
		}
	}

	.el-poper-geo {
		.el-select-dropdown__item {
			font-family: 'Proxima Nova Sb';
			font-size: 14px;
			line-height: 40px;
			height: 40px;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #333333;
		}
	}
</style>
