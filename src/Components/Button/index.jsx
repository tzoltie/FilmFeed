export default function Button({text, type = "button", onClick, className, disabled = false}) {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}