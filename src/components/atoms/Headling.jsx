export default function Heading({level = 1,children,variant = "black",className = "", }) {
  const Tag = `h${level}`;

  const sizes = {
    1: "text-3xl font-bold",
    2: "text-2xl font-semibold",
    3: "text-xl font-medium",
    4: "text-lg font-medium",
    5: "text-base font-medium",
    6: "text-sm font-medium"
  };

  const colors = {
    default: "text-white",
    black: "text-black",
    gray: "text-gray-500",
    blue: "text-blue-500",
  };

  return (
    <Tag className={`${sizes[level]} ${colors[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
