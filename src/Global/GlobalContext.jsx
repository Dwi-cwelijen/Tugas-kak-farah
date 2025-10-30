import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "./useGlobal.js";
import axios from "axios";

export default function GlobalProvider({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const [tableData, setTableData] = useState({
    user: [
      { id: 1, name: "Alice", password: "1234", email: "alice@mail.com", jenisKelamin: "Perempuan" },
      { id: 2, name: "Bob", password: "5678", email: "bob@mail.com", jenisKelamin: "Laki-laki" },
      { id: 3, name: "Charlie", password: "abcd", email: "charlie@mail.com", jenisKelamin: "Laki-laki" },
      { id: 4, name: "Diana", password: "efgh", email: "diana@mail.com", jenisKelamin: "Perempuan" }
    ],
    barang: [] 
  });

  useEffect(() => {
  const fetchBarang = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      const subset = res.data.products.slice(0, 8);
      setTableData((prev) => ({ ...prev, barang: subset }));
    } catch (err) {
      console.error("Error fetching barang:", err);
    }
  };
  fetchBarang();
}, []);



  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const resetForm = (itemFields = []) => {
    const empty = itemFields.reduce((acc, curr) => ({ ...acc, [curr.id]: "" }), {});
    setFormData(empty);
    setEditId(null);
  };

  const fillForm = (itemFields, oldData) => {
    const filled = itemFields.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: oldData[curr.id] || oldData[curr.id.toLowerCase()] || "" }),
      {}
    );
    setFormData(filled);
    setEditId(oldData.id);
    setIsOpen(true);
  };

  const handleSubmit = (e, itemFields, type, action = "create") => {
    e.preventDefault();
    if (!type) return;


    if (type === "user") {
      if (action === "create") {
        const newData = { ...formData, id: Date.now() };
        setTableData(prev => ({ ...prev, user: [...prev.user, newData] }));
      } else if (action === "update") {
        setTableData(prev => ({
          ...prev,
          user: prev.user.map(row => (row.id === editId ? { ...formData, id: editId } : row))
        }));
      }
    }


    if (type === "barang") {
      if (action === "create") {
        const newData = { ...formData, id: Date.now() };
        setTableData(prev => ({ ...prev, barang: [...prev.barang, newData] }));
      } else if (action === "update") {
        setTableData(prev => ({
          ...prev,
          barang: prev.barang.map(row => (row.id === editId ? { ...formData, id: editId } : row))
        }));
      }
    }
    resetForm(itemFields);
    setIsOpen(false);
  };

  const handleDelete = (type, id) => {
    if (type === "user") {
      setTableData(prev => ({ ...prev, user: prev.user.filter(row => row.id !== id) }));
    }
    if (type === "barang") {
      setTableData(prev => ({ ...prev, barang: prev.barang.filter(row => row.id !== id) }));
    }
  };

  const initTableData = (type, dataAwal = []) => {
    setTableData(prev => ({ ...prev, [type]: dataAwal }));
  };

  return (
    <GlobalContext.Provider
      value={{
        location,
        isOpen,
        setIsOpen,
        formData,
        handleChange,
        resetForm,
        fillForm,
        tableData,
        handleSubmit,
        handleDelete,
        initTableData,
        editId,
        setEditId,
        menu,
        setMenu
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
