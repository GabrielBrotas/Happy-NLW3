import './styles.css'

interface ButtonProps {
    children: any
}

function Button({children}: ButtonProps) {
    return (
        <button type="button" className="button">
            {children}
        </button>
    )
}

export default Button