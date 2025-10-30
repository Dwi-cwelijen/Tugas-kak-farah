import Text from "../atoms/Text";
import { Link } from "react-router-dom";
import { useGlobal } from "../../Global/useGlobal";

export default function NavItem({data}) {

  const { location } = useGlobal();

  return (
    <nav>
      <ul className="flex flex-wrap gap-1 md:gap-3 list-none">
        {data.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.key}
              className={`rounded-md px-2 py-1 transition-all duration-200 ${
                isActive
                  ? "bg-blue-950 text-white"
                  : "bg-white hover:bg-blue-950 hover:text-white"
              }`}
            >
              <Link to={item.path} aria-current={isActive ? "page" : undefined}>
                <Text text={item.label}  />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
