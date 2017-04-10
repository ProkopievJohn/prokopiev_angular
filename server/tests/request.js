import http from 'http'
import config from '../src/configs/server-config'

export default async (url, method) => {
	await http.get({
		host: config.getHost(),
		port: config.getPort(),
		method: method,
		path: url
	});
}