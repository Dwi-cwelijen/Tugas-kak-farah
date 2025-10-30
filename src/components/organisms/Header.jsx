import Logo from "../molecules/Logo";
import NavItem from "../molecules/NavItem";

export default function Header() {
  return (
    <header className="w-full px-4 py-3 bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}


  function Nav () {
    const nav = [
      { key: 1, label: "Barang", path: "/barang" },
      { key: 2, label: "User", path: "/user" },
    ];

    return (
      <NavItem data={nav} />
    );
  }
