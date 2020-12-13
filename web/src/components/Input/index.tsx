import './styles.css'

interface InputProps {
    label: string;
    name: string;
}

function Input({label, name}: InputProps) {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} />
        </div>
    )
}

export default Input