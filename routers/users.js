

import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router =express.Router()


// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user,you are logged")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all account")
// })

//UPDATE 

router.put('/:id',verifyUser , updateUser)

//DELETE
router.delete('/:id' ,verifyUser , deleteUser)
//GET

router.put('/:id',verifyUser , getUser)

//GET ALL 
router.put('/',verifyAdmin,getUsers)












export default router



