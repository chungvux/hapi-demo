const Hapi = require('@hapi/hapi');
const {users} = require('./routes/user.router')

export const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    users(server)

    await server.start()
    console.log('server started on port: ' + server.info.uri)
}