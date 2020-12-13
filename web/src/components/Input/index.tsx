import './styles.css'

interface InputProps {
    label: string;
    name: string;
    value: string;
    setValue: Function;
}

function Input({label, name, value, setValue}: InputProps) {
    return (
        <div className="input">
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={ e => setValue(e.target.value)} />
        </div>
    )
}

export default Input