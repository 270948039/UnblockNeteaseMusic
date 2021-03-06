const request = require('../request')

let extraHeaders = {
	'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
	'host': 'music.163.com',
	'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
}

const find = id => {
	let url =
		'https://music.163.com/m/song?id=' + id

	return request('GET', url, extraHeaders)
	.then(response => {
		let part = response.body.match(/window\.REDUX_STATE = ([^;]+);/)[1]
		let jsonBody = JSON.parse(part)
		let info = jsonBody['Song']['info']['song']
		info.keyword = info.name + ' - ' + info.artists[0].name
		return info
	})
}

module.exports = find