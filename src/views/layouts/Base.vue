<template>
	<v-layout id='app-base'>
		<v-flex xs12>
			<v-speed-dial
				v-model="fab"
				:bottom='true'
				:right='true'
				direction='top'
				:transition="transition"
				fixed
			>
				<template v-slot:activator>
					<v-btn
						v-model="fab"
						color="blue darken-2"
						dark
						fab
					>
						<i v-if='fab' class="fas fa-times"></i>
						<i v-else class="fas fa-ellipsis-v"></i>
					</v-btn>
				</template>
				<v-btn
					fab
					dark
					small
					color="green"
				>
					<i class="fas fa-home"></i>
				</v-btn>
				<v-btn
					fab
					dark
					small
					color="indigo"
				>
					<i class="fas fa-calendar-alt"></i>
				</v-btn>
				<v-btn
					fab
					dark
					small
					color="red"
					@click='isShowConfModal = true'
				>
					<i class="fas fa-sign-out-alt"></i>
				</v-btn>
			</v-speed-dial>

			<ConfirmationModal
				:modal='isShowConfModal'
				v-bind='propsForConfModal'
				@close='isShowConfModal = false'
				@positifConfirm='logout'
			/>

			<router-view />
		</v-flex>
	</v-layout>
</template>

<script>
import { LOGOUT } from '@/stores/actionTypes';
import ConfirmationModal from '@/modals/ConfirmationModal.vue';


export default {
	name: 'AppBase',
	props: {},
	data: function() {
		return {
			fab: false,
			transition: 'slide-y-reverse-transition',

			// confirmation modal component
			isShowConfModal: false,
			propsForConfModal: {
				title: 'Confirmation',
				body: 'Are you sure to logout?',
				positifBtn: 'Logout',
				positifBtnColor: 'error',
				negatifBtn: 'Cancel',
			},
		};
	},
	computed: {},
	methods: {
		logout() {
			this.$store.dispatch(LOGOUT)
			.then(() => {
				this.$router.push('login');
			});
		},
	},
	components: {
		ConfirmationModal,
	}
}
</script>

<style lang='scss' scoped>
	#app-base {
	.v-speed-dial {
		z-index: 1;
	}

	.v-btn--floating {
		position: relative;
	}
}
</style>