import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "./useGlobal.js";
import axios from "axios";

export default function GlobalProvider({ children }) {
  const location = useLocation();

  // STATE GLOBAL
  const [isOpen, setIsOpen] = useState(false); // buka/tutup form input
  const [menu, setMenu] = useState(false); // buka/tutup menu edit & hapus
  const [formData, setFormData] = useState({}); // menampung data dari form input (create/update)
  const [editId, setEditId] = useState(null); // menyimpan id data yang sedang diedit (null kalau tidak sedang edit)

  // Data utama untuk tabel (disimpan dalam satu object agar mudah diatur)
  const [tableData, setTableData] = useState({
    user: [ // data user lokal (dummy data)
      { id: 1, name: "Alice", password: "1234", email: "alice@mail.com", jenisKelamin: "Perempuan" },
      { id: 2, name: "Bob", password: "5678", email: "bob@mail.com", jenisKelamin: "Laki-laki" },
      { id: 3, name: "Charlie", password: "abcd", email: "charlie@mail.com", jenisKelamin: "Laki-laki" },
      { id: 4, name: "Diana", password: "efgh", email: "diana@mail.com", jenisKelamin: "Perempuan" }
    ],
    barang: [] // data barang akan diambil dari API
  });

  // FETCH DATA DARI API (hanya dijalankan sekali saat komponen pertama kali dimuat)
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products"); // ambil data produk dari API dummyjson
        const subset = res.data.products.slice(0, 8); // ambil 8 data pertama saja
        setTableData(prev => ({ ...prev, barang: subset })); // simpan hasilnya ke state tableData.barang
      } catch (err) {
        console.error("Error fetching barang:", err.message);
        alert("Gagal mengambil data barang!");
      }
    };
    fetchBarang();
  }, []); // [] berarti efek ini hanya jalan sekali (saat pertama kali render)

  // FUNGSI: handle input form
  const handleChange = (e) => {
    const { id, value } = e.target;
    // ubah nilai state formData berdasarkan id dari input
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // FUNGSI: reset form setelah tambah/edit
  const resetForm = (itemFields = []) => {
    // buat objek kosong berdasarkan daftar field input
    const empty = itemFields.reduce((acc, curr) => ({ ...acc, [curr.id]: "" }), {});
    setFormData(empty); // kosongkan semua input form
    setEditId(null); // hilangkan id edit agar form kembali ke mode "tambah"
  };

  // FUNGSI: isi form dengan data lama saat tombol edit ditekan
  const fillForm = (itemFields, oldData) => {
    // isi form sesuai id field dan data lama (case insensitive)
    const filled = itemFields.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: oldData[curr.id] || oldData[curr.id.toLowerCase()] || ""
      }),
      {}
    );
    setFormData(filled); // tampilkan data lama di form
    setEditId(oldData.id); // simpan id data yang sedang diedit
    setIsOpen(true); // buka form
  };

  // FUNGSI: tambah atau update data (create/update)
  const handleSubmit = (e, itemFields, type, action = "create") => {
    e.preventDefault(); // cegah reload halaman
    if (!type) return; // kalau belum ada tipe, hentikan

    // === CRUD untuk USER ===
    if (type === "user") {
      if (action === "create") { // TAMBAH DATA
        const newData = { ...formData, id: Date.now() }; // buat id unik
        setTableData(prev => ({ ...prev, user: [...prev.user, newData] }));
      } else if (action === "update") { // UPDATE DATA
        setTableData(prev => ({
          ...prev,
          user: prev.user.map(row =>
            row.id === editId ? { ...formData, id: editId } : row
          )
        }));
      }
    }

    // === CRUD untuk BARANG ===
    if (type === "barang") {
      if (action === "create") { // TAMBAH DATA BARU
        const newData = { ...formData, id: Date.now() };
        setTableData(prev => ({ ...prev, barang: [...prev.barang, newData] }));
      } else if (action === "update") { // EDIT DATA BARANG
        setTableData(prev => ({
          ...prev,
          barang: prev.barang.map(row =>
            row.id === editId ? { ...formData, id: editId } : row
          )
        }));
      }
    }

    // setelah submit, form direset dan ditutup
    resetForm(itemFields);
    setIsOpen(false);
  };

  // FUNGSI: hapus data berdasarkan tipe (user/barang)
  const handleDelete = (type, id) => {
    if (type === "user") {
      setTableData(prev => ({
        ...prev,
        user: prev.user.filter(row => row.id !== id)
      }));
    }
    if (type === "barang") {
      setTableData(prev => ({
        ...prev,
        barang: prev.barang.filter(row => row.id !== id)
      }));
    }
  };

  // FUNGSI: inisialisasi ulang data tabel (misal untuk reset ke data default)
  const initTableData = (type, dataAwal = []) => {
    setTableData(prev => ({ ...prev, [type]: dataAwal }));
  };

  // PROVIDE semua data & fungsi agar bisa dipakai komponen lain lewat useGlobal()
  return (
    <GlobalContext.Provider
      value={{
        location,
        isOpen, setIsOpen,
        formData, handleChange,
        resetForm, fillForm,
        tableData, handleSubmit,
        handleDelete, initTableData,
        editId, setEditId,
        menu, setMenu
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
