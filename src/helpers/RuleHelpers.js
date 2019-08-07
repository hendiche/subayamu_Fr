const validateSpaceBar = v => (v && v.trim() == '' ? false : true) || 'Please input a correct data';
const emailFormat = v => /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || 'Email must in valid format';

const R = {}; // R === Rules

R.login = {
	emailRules: [
		v => !!v || 'Email is required',
		emailFormat,
	],
	passwordRules: [
		v => !!v || 'Password is required',
		validateSpaceBar,
	],
};

export default R;