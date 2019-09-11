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
								<v-form
									ref='joinForm' 
									lazy-validation
									class='text-center'
									:key='counting'
								>
									<v-text-field
										v-model='project_code'
										label='Project Code'
										solo
										required
										:rules='projectCodeRules'
									/>
								</v-form>
							</v-col>
							<v-col>
								<v-btn color='success' @click='join'>Join</v-btn>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item>
						<v-form ref='form' lazy-validation class='text-center' :key='counting'>
							<v-text-field 
								v-model='name'
								label='Project Name'
								required
								:rules='nameRules'
							/>
							<DatePicker
								label='Start Date'
								:value='start_period'
								:rules='startDateRules'
								@save='(val) => {start_period = val}'
							/>
							<DatePicker
								label='End Date'
								:value='end_period'
								:rules='endDateRules'
								@save='(val) => {end_period = val}'
							/>
							<div>
								<v-btn
									color='success'
									@click='create'
								>
									Create
								</v-btn>
							</div>
						</v-form>
					</v-tab-item>
				</v-tabs-items>
			</v-card-text>
		</v-card>
		
	</v-dialog>
</template>

<script>
import DatePicker from '@/components/DatePicker';
import RULES from '@/helpers/RuleHelpers';
import {
	CREATE_PROJECT,
	JOIN_PROJECT,
} from '@/stores/actionTypes';

export default {
	name: 'addTabModal',
	props: {
		modal: Boolean,
	},
	data: function() {
		const { nameRules, startDateRules, endDateRules } = RULES.createProject;
		const { projectCodeRules } = RULES.joinProject;
		
		return {
			tab: null,
			name: '',
			start_period: new Date().toISOString().substr(0, 10),
			end_period: new Date().toISOString().substr(0, 10),
			nameRules,
			startDateRules,
			endDateRules,
			project_code: '',
			projectCodeRules,
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
		create() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					name: this.name,
					start_period: this.start_period,
					end_period: this.end_period,
				}
			};

			this.$store.dispatch(CREATE_PROJECT, payload);
			this.close();
		},
		join() {
			if (!this.$refs.joinForm.validate()) return;

			const payload = {
				body: {
					project_code: this.project_code,
				}
			};

			this.$store.dispatch(JOIN_PROJECT, payload);
			this.close();
		},
		close() {
			this.$emit('close');
			this.name = '';
			this.start_period = new Date().toISOString().substr(0, 10);
			this.end_period = new Date().toISOString().substr(0, 10);
			this.project_code = '';
		}
	},
	components: {
		DatePicker,
	}
}
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>