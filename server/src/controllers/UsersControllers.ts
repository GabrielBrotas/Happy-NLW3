import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'
import bcrypt from 'bcrypt';
import crypto from 'crypto'
import mailer from '../config/nodemailer'

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
                    return res.status(400).send("invalid password")
                }
            })
        } else {
            return res.status(400).send("User not found")
        }
    },

    async create(req: Request, res: Response) {
        const {name, email, password} = req.body
        let newUserData = {
            name,
            email,
            password,
            passwordResetToken: "",
            passwordResetTokenExpires: "",
        }
        
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
        
    },

    async getUserData(req: Request, res: Response) {
        const {id} = req.params

        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({id: parseInt(id)})

        if(!user) {
            return res.status(404).send({error: 'user not found'})
        } else {
            return res.status(200).send({
                name: user.name,
                email: user.email,
                id: user.id,
            })
        }
    },

    async forgetPassword(req: Request, res: Response) {
        const {email} = req.body

        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({email})

        if(!user) {
            return res.status(404).send("user not found")
        }

        const token = crypto.randomBytes(10).toString('hex')
        const now = new Date();
        now.setHours(now.getHours() + 1)

        user.passwordResetToken = token
        user.passwordResetTokenExpires = now

        await usersRepository.save(user)
        
        mailer.sendMail({
            to: user.email,
            from: "gbrotas22@gmail.com",
            subject: 'reset password',
            html: `
            <h2>Esqueceu sua senha?</h2>
            <p>Não tem problema, <a href="http://localhost:3000/reset-password/${token}">clique aqui para alterar sua senha</a></p>
            `
        }, (err) => {
            if(err) {
                return res.status(400).send({error: "cannot send this email"})
            }

            return res.send()
        })
    },

    async resetPassword(req: Request, res: Response) {
        const {email, password, confirmPassword, token} = req.body

        const data = {email, password, confirmPassword, token}

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
            confirmPassword: Yup.string().required(),
            token: Yup.string().required()
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({email})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        
        if(!user) { return res.status(400).send("user not found")}
        
        const now = new Date();

        if(user.passwordResetToken === token && user.passwordResetTokenExpires >= now ) {
            user.password = hash
            user.passwordResetToken = ""
            user.passwordResetTokenExpires = new Date()
            await usersRepository.save(user)             
            return res.status(200).send("password changed")
        } else {
            return res.status(400).send("something went wrong")
        }

    }
}