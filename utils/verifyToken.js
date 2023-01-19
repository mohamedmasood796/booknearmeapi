import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are not authenticated !"))
    }
     
    //if there is err that means verification not complited
    jwt.verify(token,`${process.env.JWT}`,(err,user)=>{
        
        if(err) return next(createError(403,"Token is not valied"))

        //no err
        req.user=user;
        next()

    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
             return next (createError(403,"you are not authorized"))
        }
    })
}


//admin
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
             return next (createError(403,"you are not authorized"))
        }
    })
}