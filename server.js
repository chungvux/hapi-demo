const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// let init = async function () {
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

// await server.register({
//     plugin: require('hapi-mongodb'),
//     options: {
//         url: 'mongodb+srv://chung:1234@cluster0.plitd.mongodb.net/demo-hapi?retryWrites=true&w=majority',
//         settings: {
//             useUnifiedTopology: true
//         },
//         decorate: true
//     }
// });

mongoose.connect("mongodb+srv://chung:1234@cluster0.plitd.mongodb.net/demo-hapi?retryWrites=true&w=majority")

const UserSchema = new mongoose.Schema({ username: String, password: String })

const UserModel = mongoose.model("userdbs", UserSchema)

server.route({
    method: 'GET',
    path: '/',
    handler: async (req, res) => {
        const users = await UserModel.find({})        
        return users;
    }
});

server.route({
    method: 'POST',
    path: '/user',
    handler: async (req, res) => {
        const User = new UserModel(req.payload)
        
        const status = await User.save()
        return status;
    }
});


// Add JOI require statêmnt
// Update the details of a movie
server.route({
    method: 'PUT',
    path: '/user/{id}',
    options: {
        validate: {
            params: Joi.object({
                id: Joi.objectId()
            })
        }
    },
    handler: async (req, res) => {
        const id = req.params.id
        const schema = Joi.object().keys({
            username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(6).max(10).required() //
        });

        let valid = schema.validate({ username: req.payload.username })

        if (!valid.error) {
            const newUser = await UserModel.findByIdAndUpdate(id, req.payload)
            return newUser
        } else {
            return valid.error.details
        }

    }
});

// Update the details of a movie
server.route({
    method: 'DELETE',
    path: '/user/{id}',
    handler: async (req, res) => {
        const id = req.params.id
        const user = await UserModel.findByIdAndDelete(id) 

        return user;

    }
});


server.start();
console.log('Server running on %s', server.info.uri);

// }

// init()