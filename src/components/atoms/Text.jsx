export default function Text({ text, variant = "", className = "" }) {
  const colors = {
    default: "text-white",
    black: "text-black",
    gray: "text-gray-500",
    logo: "bg-linear-to-bl from-sky-900 via-sky-200 to-sky-950 bg-clip-text text-transparent",
  };

  return <p className={`${colors[variant]} ${className}`}>{text}</p>;
}
