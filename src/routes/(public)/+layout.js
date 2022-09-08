import { redirect } from '@sveltejs/kit';
import { privateApi } from '$lib/api/privateApi';
import { browser } from '$app/environment';
import { locale } from "$lib/translations/i18n.js";
export async function load({ data }) {
	if (browser) {
		let lang = localStorage.getItem('lang');
		locale.set(lang || 'en');
	// 	if (sessionStorage.getItem('generalData')) {
	// 		console.info('General data exist')
	// 	} else {
	// 		window.sessionStorage.setItem('generalData', JSON.stringify(data));
	// 	}
	}
}