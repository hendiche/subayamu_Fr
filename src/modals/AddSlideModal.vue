<template>
	<v-dialog
		v-model='dialog'
		width='600'
	>
		<v-card>
			<v-card-title>Add Slide</v-card-title>
			<v-card-text>
				<v-form ref='form' lazy-validation class='text-center' :key='counting'>
					<v-text-field
						v-model='name'
						label='Name'
						required
					/>
					<v-text-field 
						v-model='slideUrl'
						label='Slide Url'
						required
					/>
					<div>
						<v-btn color='success' @click='addSlide'>Add New Slide</v-btn>
					</div>
				</v-form>
			</v-card-text>
		</v-card>	
	</v-dialog>
</template>

<script>
import { ADD_SLIDE } from '@/stores/actionTypes';

export default {
	name: 'AddSlideLinkModal',
	props: {
		modal: Boolean,
		data: Object,
	},
	data: function() {
		return {
			name: '',
			slideUrl: '',
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
		addSlide() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					name: this.name,
					slide_url: this.slideUrl,
					project_id: this.data._id, // this used for body when req API POST add
				},
				params: {
					project_id: this.data._id, // this used for params when req api GET list
				},
			};

			this.$store.dispatch(ADD_SLIDE, payload);
			this.close();
		},
		close() {
			this.$emit('close');
			this.name = '';
			this.slideUrl = '';
		},
	}
}
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>