import superagent from 'superagent';

export const API_ROOT = process.env.REACT_APP_SERVER_API;

const responseBody = (res) => (res.body ? res.body : res.text);

export const catchError = (e) => {
	let error = e.response?.body?.error;
	throw error;
};


const requests = {
	get: (url, query) =>
		superagent.get(url, query).then(responseBody).catch(catchError),
	post: (url, body) =>
		superagent.post(url, body).then(responseBody).catch(catchError),
};

class Base {

	normalizeQuery = (query) => {
		const formatQuery = {};
		Object.keys(query).forEach((key) => {
			if (query[key] !== null && typeof query[key] === 'string') {
				formatQuery[key] = query[key].trim();
			} else if (query[key] !== null && !Number.isNaN(query[key])) {
				formatQuery[key] = query[key];
			}
		});
		return formatQuery;
	};

    apiGet = (url, query = {}) => requests.get(`${API_ROOT}/api${url}`, this.normalizeQuery(query));

    apiPost = (url, body) => requests.post(`${API_ROOT}/api${url}`, body);
}

export default Base;

