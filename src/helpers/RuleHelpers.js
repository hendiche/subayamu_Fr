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
}

export default R;