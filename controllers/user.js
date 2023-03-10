import User from "../models/User.js";


export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}



export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been delected.")
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById({_id:req.body.userId})
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const getrivewUser = async (req, res, next) => {
    console.log(9999999999999999999999)
    try {
        const user = await User.findById({_id:req.params.userId})
        console.log(user,"HHHHHHHHHHHHHHHHHHHHHHHHHHH")
        res.status(200).json(user.username)
    } catch (err) {
        next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}