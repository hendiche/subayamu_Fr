<template>
	<v-dialog
		v-model='dialog'
		width='600'
	>
		<v-card>
			<v-card-title>Add Document</v-card-title>
			<v-card-text>
				<v-form ref='form' lazy-validation class='text-center' :key='counting'>
					<v-text-field
						v-model='name'
						label='Name'
						required
						:rules='nameRules'
					/>
					<div>
						<v-btn color='success' @click='addDocs'>Add New Doc</v-btn>
					</div>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import RULES from '@/helpers/RuleHelpers';
import { ADD_DOCS } from '@/stores/actionTypes';


export default {
	name: 'AddDocumentModal',
	props: {
		modal: Boolean,
		data: Object,
	},
	data: function() {
		const { nameRules } = RULES.addDocument;
		return {
			name: '',
			nameRules,
			counting: 0, // for reset the component
		};
	},
	computed: {
		dialog: {
			get() {
				if (this.modal) this.counting += 1;
				return this.modal;
			},
			set(val) {
				if (!val) this.close();
			}
		},	
	},
	methods: {
		addDocs() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					name: this.name,
					body: '',
					project_id: this.data._id, // this used for body when req API POST add
				},
				params: {
					project_id: this.data._id, // this used for params when req api GET list
				},
			};

			this.$store.dispatch(ADD_DOCS, payload);
			this.close();
		},
		close() {
			this.$emit('close');
			this.name = '';
		},
	},
};
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>