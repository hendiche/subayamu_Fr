import moment from "moment";
import store from "@/store/store.js";

/**
 * Array of the rows-per-page dropdown for data tables
 * @return {array} of rows-per-page
 */
export const rowsPerPageItems = [5];

/**
 * Convert or formating date using moment.js
 * @param {string} date -> string of date from database that get from backend return API
 * @return {string} of formated date
 */
export function momentDate(date) {
	if (!date) return "-";
	
	return moment(date).format("YYYY/MM/DD");
}

/**
 * Convert or formating date using moment.js (japanese character)
 * @param {string} date -> string of date from database that get from backend return API
 * @return {string} of formated date (contain japanese character)
 */
export function momentDateJP(date) {
	if (!date) return "-";
	
	return moment(date).format("YYYY年MM月DD日");
}

/**
 * Substring the text (limit) by passed maxlength and append '...' to the last of sentence
 * @param {string} text -> string of sentence that get from backend return API
 * @param {number} maxLength -> number of max length that we want to limit
 * @return {string} of limited text by passed maxLength 
 */
export function showLimitText(text, maxLength) {
	if (!text) return "";

	if (text.length > maxLength) {
		return text.substring(0, maxLength) + " ...";
	}

	return text;
}