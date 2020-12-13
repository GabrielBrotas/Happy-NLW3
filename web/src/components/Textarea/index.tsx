import { TextareaHTMLAttributes } from 'react'
import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    sublabel?: string;
}

function Textarea({label, name, sublabel}: TextareaProps) {

    return (
        <div className="textarea">
            <label htmlFor={name}>{label} <span>{sublabel}</span></label>
            <textarea rows={5} name={name}/>
        </div>
    )
}

export default Textarea