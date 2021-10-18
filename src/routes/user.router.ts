import { Server } from '@hapi/hapi'
import {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller"

export const users = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/user',
        handler: getAllUsers
    })
    server.route({
        method: 'GET',
        path: '/user/{id}',
        handler: getOneUser
    })
    server.route({
        method: 'POST',
        path: '/user',
        handler: addUser
    })
    server.route({
        method: 'PUT',
        path: '/user/{id}',
        handler: updateUser
    })
    server.route({
        method: 'DELETE',
        path: '/user/{id}',
        handler: deleteUser
    })
}