import { useGlobal } from "../../Global/useGlobal";
import Form from "../molecules/Form";
import Table from "../molecules/Tabel";
import Button from "../atoms/Button";
import Main from "../templates/MainLayout";
import Fungsi from "../molecules/Fungsi";
import Heading from "../atoms/Headling";

export default function User() {
  // Ambil data & fungsi global dari GlobalContext (useGlobal)
  const {
    isOpen,       // status buka/tutup form
    setIsOpen,    // ubah status buka/tutup form
    tableData,    // semua data tabel (user & barang)
    formData,     // data input dari form
    handleChange, // fungsi untuk ubah nilai form input
    handleSubmit, // fungsi simpan data (tambah/edit)
    editId,       // id data yang sedang diedit
    resetForm     // fungsi untuk reset isi form
  } = useGlobal();

  const type = "user"; // tipe data yang sedang ditampilkan (user)

  // === FIELD INPUT FORM ===
  const fields = [
    { id: "name", label: "Nama", type: "text", placeholder: "Masukkan nama" },
    { id: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
    { id: "email", label: "Email", type: "email", placeholder: "Masukkan email" },
    {
      id: "jenisKelamin",
      label: "Jenis Kelamin",
      type: "select",
      options: [
        { value: "Laki-laki", label: "Laki-laki" },
        { value: "Perempuan", label: "Perempuan" },
      ],
    },
  ];

  // === KOLOM UNTUK TABEL ===
  const kolom = [
    { key: "name", label: "Nama" },
    { key: "password", label: "Password" },
    { key: "email", label: "Email" },
    { key: "jenisKelamin", label: "Jenis Kelamin" },
    { key: "aksi", label: "Aksi" },
  ];

  // Tambahkan tombol edit/hapus (komponen Fungsi) ke setiap baris tabel
  const dataWithAction = (tableData[type] || []).map((row) => ({
    ...row,
    aksi: <Fungsi row={row} type={type} fields={fields} />,
  }));

  return (
    <Main>
      <div className="p-5 relative">

        {/* BAGIAN ATAS: JUDUL + TOMBOL TAMBAH */}
        <div className="flex justify-between">
          <Heading
            level={3}
            className={"md:text-3xl font-serif md:font-bold"}
            variant={"gray"}
          >
            DATA PENGGUNA
          </Heading>
          <Button
            onClick={() => setIsOpen(true)}
            text="Tambah"
            variant="tambah"
          />
        </div>

        {/* MODAL FORM TAMBAH / EDIT */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-white border p-6 rounded-xl mx-4 border-white shadow-lg w-full max-w-lg relative">
              {/* Ganti tulisan di modal biar sesuai tipe data */}
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit User" : "Tambah User"}
              </h2>

              {/* FORM INPUT */}
              <Form
                fields={fields}          // daftar field input
                formData={formData}      // data yang ditampilkan di input
                handleChange={handleChange} // ubah value form
                handleSubmit={(e) =>
                  handleSubmit(e, fields, type, editId ? "update" : "create")
                }
                action={editId ? "update" : "create"}
              />

              {/* TOMBOL BATAL */}
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  text="Batal"
                  variant="hapus"
                  onClick={() => {
                    resetForm(fields);
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TABEL DATA */}
        <Table
          table={kolom}               // struktur kolom tabel
          data={dataWithAction}       // data user yang sudah ditambah kolom aksi
          className="border-collapse border border-gray-300 w-full"
        />
      </div>
    </Main>
  );
}
