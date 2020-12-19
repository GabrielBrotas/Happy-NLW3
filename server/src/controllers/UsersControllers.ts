import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'
import bcrypt from 'bcrypt';

import User from '../models/User'

export default {
    
    async login(req: Request, res: Response) {
        const {email, password} = req.body
        const userData = {email, password}

        const usersRepository = getRepository(User)

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        })
        await schema.validate(userData, {
            abortEarly: false
        })

        const user = await usersRepository.findOne({email})

        if(user) {  
            bcrypt.compare(password, user.password, (err, match) => {
                if(match) {
                    return res.status(200).json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        },
                        token: user.generateToken()
                    })
                } else {
                    return res.status(400).send({error: "invalid password"})
                }
            })
        } else {
            return res.status(400).send({error: "User not found"})
        }
    },

    async create(req: Request, res: Response) {
        const {name, email, password} = req.body
        let newUserData = {name, email, password}
        
        const usersRepository = getRepository(User)

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        })

        await schema.validate(newUserData, {
            abortEarly: false
        })

        const users = await usersRepository.find()
        let emailAlreadyExists = false

        users.forEach( user => {
            if (user.email === newUserData.email) {
                emailAlreadyExists = true     
            }
        })

        if(!emailAlreadyExists) {
           
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            
            newUserData.password = hash

            const user = usersRepository.create(newUserData)
            await usersRepository.save(user)             
            return res.status(200).send("user created successfully")
        } else {
            return res.status(400).send({error: "email already exists"})
        }
        
    }
}