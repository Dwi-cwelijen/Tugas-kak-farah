import { useEffect, useRef, useState } from "react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icons";
import { useGlobal } from "../../Global/useGlobal";

export default function Fungsi({ row, type, fields }) {
  const { handleDelete, fillForm } = useGlobal();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  const pilih = [
    {
      key: "edit",
      text: "Edit",
      style: "edit",
      onClick: () => {
        fillForm(fields, row);
        setMenu(false);
      },
    },
    {
      key: "hapus",
      text: "Hapus",
      style: "hapus",
      onClick: () => {
        handleDelete(type, row.id);
        setMenu(false);
      },
    },
  ];


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block " ref={menuRef}>
      <Button
        onClick={() => setMenu(!menu)}
        text={menu ? <Icon name="batal" /> : <Icon name="menu" />}
        className="p-2 "
      />

      {menu && (
        <div
          className="absolute md:w-30 shadow-xl/20 right-0 mt-2 w-20 flex flex-col border-gray-200 
          rounded-lg shadow-lg overflow-hidden z-20 animate-fadeIn"
        >
          {pilih.map((tombol) => (
            <Button
              key={tombol.key}
              onClick={tombol.onClick}
              variant={tombol.style}
              text={tombol.text}
              className={"text-center mb-0 m-1 "}
            />
          ))}
        </div>
      )}
    </div>
  );
}
