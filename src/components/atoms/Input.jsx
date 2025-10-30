export default function Input({ type = "text", value, onChange, placeholder,id,min, className = "" }) {
  return (
    <input
      id={id} 
      type={type}
      min={min}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${className}`}
    />
  );
}
