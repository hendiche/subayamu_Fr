<template>
	<v-menu
		ref='menu'
		v-model='menu'
		:close-on-content-click='false'
		:return-value.sync='date'
		transition='scale-transition'
		offset-y
		full-width
		min-width='290px'
	>
		<template v-slot:activator='{ on }'>
			<v-text-field
				v-model='date'
				:label='label'
				:rules='rules'
				readonly
				clearable
				v-on='on'
			></v-text-field>
		</template>
		<v-date-picker v-model='date' no-title scrollable locale='ja'>
			<v-spacer></v-spacer>
			<v-btn text color='primary' @click='menu = false'>Cancel</v-btn>
			<v-btn text color='primary' @click='$refs.menu.save(date)'>OK</v-btn>
		</v-date-picker>
	</v-menu>
</template>

<script>
export default {
	name: 'menuDatePicker',
	props: {
		label: String,
		value: String,
		rules: Array,
	},
	data: function() {
		return {
			menu: false,
		}
	},
	computed: {
		date: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('save', val);
			}
		}
	},
	methods: {},
}
</script>