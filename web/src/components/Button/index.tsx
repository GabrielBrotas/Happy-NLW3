import { ButtonHTMLAttributes } from 'react'
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: any
}

function Button({children}: ButtonProps) {
    return (
        <button className="button">
            {children}
        </button>
    )
}

export default Button