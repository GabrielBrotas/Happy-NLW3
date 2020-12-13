import './styles.css'

interface TextareaProps {
    label: string;
    name: string;
    sublabel?: string;
    value: string;
    setValue: Function;
}

function Textarea({label, name, sublabel, value, setValue}: TextareaProps) {

    return (
        <div className="textarea">
            <label htmlFor={name}>{label} <span>{sublabel}</span></label>
            <textarea rows={5} name={name} value={value} onChange={ e => setValue(e.target.value)}/>
        </div>
    )
}

export default Textarea