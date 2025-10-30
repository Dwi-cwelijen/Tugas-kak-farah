import { useGlobal } from "../../Global/useGlobal";
import Form from "../molecules/Form";
import Table from "../molecules/Tabel";
import Button from "../atoms/Button";
import Main from "../templates/MainLayout";
import Fungsi from "../molecules/Fungsi";
import Heading from "../atoms/Headling";

export default function Barang() {
  // Ambil data dan fungsi global dari context
  const {
    isOpen,       // status buka/tutup form modal
    setIsOpen,    // ubah status form (true/false)
    tableData,    // semua data tabel (user & barang)
    formData,     // data input dari form
    handleChange, // fungsi untuk ubah isi form
    handleSubmit, // fungsi untuk tambah/edit data
    editId,       // id data yang sedang diedit
    resetForm     // reset isi form setelah tambah/edit
  } = useGlobal();

  // tipe data untuk halaman ini (berdasarkan key di tableData global)
  const type = "barang";

  // === FIELD INPUT FORM ===
  // digunakan oleh komponen Form untuk membentuk input secara dinamis
  const fields = [
    { id: "title", label: "Nama Barang", type: "text", placeholder: "Masukkan nama barang" },
    { id: "price", label: "Harga", type: "number", placeholder: "Masukkan harga" },
    { id: "brand", label: "Brand", type: "text", placeholder: "Masukkan Brand" },
    { id: "stock", label: "Stok", type: "number", placeholder: "Masukkan jumlah stok" },
  ];

  // === STRUKTUR KOLOM UNTUK TABEL ===
  const kolom = [
    { key: "title", label: "Nama Barang" },
    { key: "price", label: "Harga" },
    { key: "brand", label: "Brand" },
    { key: "stock", label: "Stok" },
    { key: "aksi", label: "Aksi" },
  ];

  // === AMBIL DATA BARANG DARI GLOBAL ===
  const rawData = tableData?.[type];

  // Karena data dari API bisa dalam berbagai bentuk (array, object, atau ada properti data),
  // kita pastikan dulu bentuknya aman buat di-mapping.
  const rows = Array.isArray(rawData)
    ? rawData // kalau langsung array (normal)
    : rawData?.data && Array.isArray(rawData.data)
    ? rawData.data // kalau di dalam properti data
    : rawData && typeof rawData === "object"
    ? Object.values(rawData) // kalau object (ubah ke array)
    : [];

  // === TAMBAHKAN KOLOM AKSI KE SETIAP DATA BARANG ===
  const dataWithAction = rows.map((row) => ({
    ...row, // salin semua data asli (title, price, dsb)
    aksi: <Fungsi row={row} type={type} fields={fields} />, // tambahkan kolom aksi (edit/hapus)
  }));

  return (
    <Main>
      <div className="p-5 md:p-8 relative">
        {/* BAGIAN HEADER ATAS */}
        <div className="flex justify-between mb-4">
          <Heading level={2} className={"md:text-3xl md:font-bold"} variant={"gray"}>
            DATA PRODUK
          </Heading>
          {/* Tombol untuk buka form tambah */}
          <Button onClick={() => setIsOpen(true)} text="Tambah" variant="tambah" />
        </div>

        {/* === MODAL FORM TAMBAH / EDIT === */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white border border-white p-6 rounded-xl mx-4 shadow-2xl w-full md:max-w-lg max-w-sm relative">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Barang" : "Tambah Barang"}
              </h2>

              {/* Komponen Form dinamis */}
              <Form
                fields={fields}          // daftar input form
                formData={formData}      // nilai input
                handleChange={handleChange} // ubah isi form
                handleSubmit={(e) =>
                  handleSubmit(e, fields, type, editId ? "update" : "create")
                }
                action={editId ? "update" : "create"} // menentukan mode form
              />

              {/* Tombol batal */}
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  text="Batal"
                  variant="hapus"
                  onClick={() => {
                    resetForm(fields); // kosongkan input
                    setIsOpen(false);  // tutup form modal
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* === TABEL DATA PRODUK === */}
        <Table
          table={kolom}               // struktur kolom
          data={dataWithAction}       // data produk + kolom aksi
          className="border-collapse border border-gray-300 w-full"
        />
      </div>
    </Main>
  );
}
