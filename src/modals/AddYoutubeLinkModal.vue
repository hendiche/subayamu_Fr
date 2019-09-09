<template>
	<v-dialog
		v-model='dialog'
		width='600'
	>
		<v-card id='che-add-youtube-link-dialog'>
			<v-card-title>Add Youtube Link</v-card-title>
			<v-card-text>
				<v-form ref='form' lazy-validation class='text-center' :key='counting'>
					<v-text-field
						v-model='name'
						label='Name'
						required
						:rules='nameRules'
					/>
					<v-text-field
						v-model='link'
						label='Link'
						required
						:rules='linkRules'
					/>
					<div>
						<v-btn color='success' @click='addLink'>Add Link</v-btn>
					</div>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import RULES from '@/helpers/RuleHelpers';
import { ADD_YOUTUBE_LINK } from '@/stores/actionTypes';

export default {
	name: 'AddYoutubeLinkModal',
	props: {
		modal: Boolean,
		data: Object,
	},
	data: function() {
		const { nameRules, linkRules } = RULES.AddYoutubeLink;
		return {
			name: '',
			link: '',
			nameRules,
			linkRules,
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
		addLink() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					name: this.name,
					embeded_url: this.link,
					project_id: this.data._id, // this used for body when req API POST add
				},
				params: {
					project_id: this.data._id, // this used for params when req api GET list
				},
			};

			this.$store.dispatch(ADD_YOUTUBE_LINK, payload);
			this.close();
		},
		close() {
			this.$emit('close');
			this.name = '';
			this.link = '';
		}
	},
}
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>