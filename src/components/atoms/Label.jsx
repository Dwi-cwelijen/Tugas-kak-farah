export default function Label ({htmlFor,text,className}) {

    return (
        <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
        >
            {text}
        </label>
    );
}