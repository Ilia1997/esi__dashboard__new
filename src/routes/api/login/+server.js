import * as cookie from 'cookie';
import { publicApi } from '$lib/api/publicApi.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, setHeaders }) {
	const body = await request.json();
	const rawResponse = await publicApi('POST', '/login', {
		login: body.login,
		password: body.password
	});
	const response = await rawResponse.json();
	if (!response.status) {
		return {
			status: 403,
			errors: {
			  message: response.errorMessage
			}
		  };
	}
	setHeaders({
		'set-cookie': cookie.serialize('esiToken', response.data.token, {
			secure: true,
			path: '/',
			'max-age': 86400,
			httpOnly : true
		})
	});
	return new Response(JSON.stringify({ status: response.status}), { status: 200 }) 
}