import { Request, ResponseToolkit } from "@hapi/hapi"

import { UserModel} from '../models/User'

export const addUser = async (req: Request, res: ResponseToolkit) => {
    try {
        const user = await new UserModel(req.payload).save()
        return res.response(user)
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req: Request, res: ResponseToolkit) => {
    try {
        const users = await UserModel.find()
        return res.response(users)
    } catch (error) {
        console.log(error)
    }
}
export const getOneUser = async (req: Request, res: ResponseToolkit) => {
    try {
        const user = await UserModel.findById(req.params.id)
        return user
    } catch (error) {
        console.log(error)
    }
}
export const updateUser = async (req: Request, res: ResponseToolkit) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.payload)
        return user
    } catch (error) {
        console.log(error)
    }
}
export const deleteUser = async (req: Request, res: ResponseToolkit) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        return user
    } catch (error) {
        console.log(error)
    }
}