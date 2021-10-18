import { Schema, model } from 'mongoose'
const mongoose = require('mongoose')

const UserSchema = new Schema({ username: String, password: String })



export const UserModel =  mongoose.model("userdbs", UserSchema)