<template>
	<v-dialog v-model='dialog' max-width='700px'>
		<v-card>
			<v-card-title>{{ dialogTitle }}</v-card-title>
			<v-card-text>
				<div style='white-space: pre-line'>{{ dialogBody }}</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					:color='dialogPosColor' 
					@click='$emit("positifConfirm")'
				>
					{{ dialogPosBtn }}
				</v-btn>

				<v-btn v-if='!hideNegatifBtn' @click='$emit("close")'>{{ dialogNegBtn }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'confirmationModal',
	props: {
		modal: Boolean,
		title: String,
		body: String,
		positifBtn: String,
		positifBtnColor: String,
		negatifBtn: String,
		hideNegatifBtn: {
			type: Boolean,
			default: false,
		},
	},
	data: function() {
		return {};
	},
	computed: {
		dialog: {
			get() {
				return this.modal;
			},
			set(val) {
				if (!val) this.$emit('close');
			}
		},
		dialogTitle() {
			return this.title || '';
		},
		dialogBody() {
			return this.body || '';
		},
		dialogPosBtn() {
			return this.positifBtn || '';
		},
		dialogPosColor() {
			return this.positifBtnColor || '';
		},
		dialogNegBtn() {
			return this.negatifBtn || '';
		},
	},
	methods: {},
}
</script>