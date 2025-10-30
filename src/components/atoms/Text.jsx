export default function Text({ text, variant = "", className = "" }) {
  const colors = {
    default: "text-white",
    black: "text-black",
    gray: "text-gray-500",
    blue: "text-blue-500",
  };

  return <p className={`${colors[variant]} ${className}`}>{text}</p>;
}
