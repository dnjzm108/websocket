const WebSocket = require('ws');

const clients = [];

module.exports = (server) => {
    const websocket = new WebSocket.Server({
        server,
        // port: 3333
    })

    websocket.on('connection', (ws, req) => {

        clients.push(ws)

        ws.on("message", (message) => {
            console.log(message.toString());

            clients.forEach(client => {
                client.send('문자 받음')
            })
        })

        ws.on('error', (error) => {
            console.error(error);
        });

        ws.on('close', () => {
            clients.splice(clients.indexOf(ws), 1)
            clearInterval(ws.interval);
        });

    });

}

