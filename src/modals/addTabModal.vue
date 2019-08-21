<template>
	<v-dialog
		v-model='dialog'
		width='600'
	>
		<v-card id='che-add-tab-dialog'>
			<v-card-text>
				<v-tabs
					v-model='tab'
					grow
				>
					<v-tab>Join Project</v-tab>
					<v-tab>Create Project</v-tab>
				</v-tabs>
				<v-tabs-items v-model='tab'>
					<v-tab-item>
						<v-row align='center' justify='center' class='che-join-row'>
							<v-col>
								<v-form>
									<v-text-field label='Project Code' solo />
								</v-form>
							</v-col>
							<v-col>
								<v-btn color='success'>Join</v-btn>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-form ref='form' lazy-validation class='text-center'>
							<v-text-field 
								v-model='name'
								label='Project Name'
								required
							/>
							<v-menu
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								:return-value.sync="start_date"
								transition="scale-transition"
								offset-y
								full-width
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="start_date"
										label="Start Date"
										readonly
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="start_date" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
									<v-btn text color="primary" @click="$refs.menu.save(start_date)">OK</v-btn>
								</v-date-picker>
							</v-menu>
							<v-menu
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								:return-value.sync="end_date"
								transition="scale-transition"
								offset-y
								full-width
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										v-model="end_date"
										label="End Date"
										readonly
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="end_date" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
									<v-btn text color="primary" @click="$refs.menu.save(end_date)">OK</v-btn>
								</v-date-picker>
							</v-menu>
							<div>
								<v-btn color='success'>Create</v-btn>
							</div>
						</v-form>
					</v-tab-item>
				</v-tabs-items>
			</v-card-text>
		</v-card>
		
	</v-dialog>
</template>

<script>
export default {
	name: 'addTabModal',
	props: {
		modal: Boolean,
	},
	data: function() {
		return {
			tab: null,
			name: '',
			menu: false,
			start_date: new Date().toISOString().substr(0, 10),
			end_date: new Date().toISOString().substr(0, 10),
		};
	},
	computed: {
		dialog: {
			get() {
				return this.modal;
			},
			set(val) {
				if (!val) this.close();
			}
		}
	},
	methods: {
		close() {
			this.$emit('close');
		}
	},
}
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>