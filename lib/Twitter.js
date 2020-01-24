import axios from 'axios';
import qs from 'query-string';

class TwitterService {
	static obtainAccessToken() {
		const options = {
			url: 'https://api.twitter.com/oauth2/token',
			method: 'POST',
			headers: {
				Authorization: `Basic Q1dVeGFwb1FnT2U4WlAzMXpkeXZ1NUdQeTpHZm53dlZPajdhc1BRWFBDekw0ZHNPQmE3Qk1LRHNoOHhCa25MYjE5RWtyTmlaWXlQYg==`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: qs.stringify({
				grant_type: 'client_credentials'
			})
		};

		return axios(options).then(res => res.data.access_token);
	}

	static searchTweets(params) {
		const options = {
			url: `/tweets?${qs.stringify(params)}`,
			method: 'GET'
		};

		const urls = [
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			},
			{
				url: `/tweets?${qs.stringify(params)}`,
				method: 'GET'
			}
		];

		async function getAllUrls(urls) {
			try {
				let allTweets = [];
				var data = await Promise.all(
					urls.map(option =>
						axios(option).then(response =>
							response.data.items.map(item => allTweets.push(item))
						)
					)
				);
				console.log(allTweets);
				return allTweets;
			} catch (error) {
				console.log(error);

				throw error;
			}
		}

		return getAllUrls(urls);
	}

	static;
}

export default TwitterService;
