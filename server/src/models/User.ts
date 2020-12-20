import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import jwt from 'jsonwebtoken'

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    passwordResetToken: string;

    @Column()
    passwordResetTokenExpires: Date;

    generateToken() {
        return jwt.sign({ id: this.id}, 'secret', {
            expiresIn: 86400
        })
    }
}

