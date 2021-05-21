// Node.js WebSocket server script
import http from 'http';
import { server as WebSocketServer } from 'websocket';
import axios from 'axios';

const server = http.createServer();
const foaasUrl = 'https://foaas.herokuapp.com';
const namesAAS = 'https://namey.muffinlabs.com/name.json'; //?count=1&with_surname=true&frequency=all'

server.listen(9898, () => {
	console.log('opened server on', server.address().port);
});
const wsServer = new WebSocketServer({
	httpServer: server
});

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min,
	connections = [];

let allOperations = [];

async function sendRandomMessage() {
	for (const connection of connections) {
		if (!connection.connected) continue;

		const timeout = 1000 * Math.random();
		const operation = allOperations[random(0, allOperations.length - 1)];

		if (!operation) break;

		const names = await axios
			.get(namesAAS, {
				params: {
					count: operation.fields.length,
					with_surname: 'true',
					frequency: 'all'
				}
			})
			.then((res) => res.data);
		// console.log(operation, names);
		let url = foaasUrl + operation.url;
		for (let i = 0; i < operation.fields.length; i++) {
			url = url.replace(':' + operation.fields[i].field, names[i]);
		}
		const message = await axios
			.get(url)
			.then((res) => res.data)
			.then((msg) => JSON.stringify(msg));

		console.log(message);

		setTimeout(async () => {
			connection.sendUTF(message);
			await sendRandomMessage();
		}, timeout);
	}
}

void (async function () {
	allOperations = await axios.get(foaasUrl + '/operations').then((res) => res.data);

	wsServer.on('request', async function (request) {
		const connection = request.accept(null, request.origin);
		connections.push(connection);
		connection.on('message', async function (message) {
			console.log('Received Message:', message.utf8Data);
			// connection.sendUTF('Hi this is WebSocket server!');
			await sendRandomMessage();
		});
		connection.on('close', function (reasonCode, description) {
			console.log('Client has disconnected.', reasonCode, description);
		});
	});
})();
