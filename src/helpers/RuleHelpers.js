const validateSpaceBar = v => (v && v.trim() == '' ? false : true) || 'Please input a correct data';
const emailFormat = v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || 'Email must in valid format';

const requiredEmail = v => !!v || 'Email is required';
const requiredPassword = v => !!v || 'Password is required';
const R = {}; // R === Rules

R.login = {
	emailRules: [
		requiredEmail,
		emailFormat,
	],
	passwordRules: [
		v => !!v || 'Password is required',
		validateSpaceBar,
	],
};

R.register = {
	nameRules: [
		v => !!v || 'Name is required',
		validateSpaceBar,
	],
	emailRules: [
		requiredEmail,
		emailFormat,
	],
	passwordRules: [
		requiredPassword,
		validateSpaceBar,
	]
};

R.createProject = {
	nameRules: [
		v => !!v || 'Name is required',
		validateSpaceBar,
	],
	startDateRules: [
		v => !!v || 'Start date is required',
	],
	endDateRules: [
		v => !!v || 'End date is required',
	],
};

R.joinProject = {
	projectCodeRules: [
		v => !!v || 'Project code is required',
	],
};

R.AddYoutubeLink = {
	nameRules: [
		v => !!v || 'Name is required',
	],
	linkRules: [
		v => !!v || 'Youtube link is required',
	],
};

R.addDocument = {
	nameRules: [
		v => !!v || 'Name is required',
	],
};

export default R;