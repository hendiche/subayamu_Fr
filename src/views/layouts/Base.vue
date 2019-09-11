<template>
	<v-layout id='app-base'>
		<v-flex xs12>
			<v-speed-dial
				v-model="fab"
				:bottom='true'
				:right='true'
				direction='top'
				:open-on-hover='true'
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
					@click='logout'
				>
					<i class="fas fa-sign-out-alt"></i>
				</v-btn>
			</v-speed-dial>

			<router-view />
		</v-flex>
	</v-layout>
</template>

<script>
import { LOGOUT } from '@/stores/actionTypes';

export default {
	name: 'AppBase',
	props: {},
	data: function() {
		return {
			fab: false,
			transition: 'slide-y-reverse-transition'
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
	components: {}
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