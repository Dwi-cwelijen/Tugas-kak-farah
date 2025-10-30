import { useGlobal } from "../../Global/useGlobal";
import Form from "../molecules/Form";
import Table from "../molecules/Tabel";
import Button from "../atoms/Button";
import Main from "../templates/MainLayout";
import Fungsi from "../molecules/Fungsi"; 
import Heading from "../atoms/Headling";

export default function User() {
  const {
    isOpen,
    setIsOpen,
    tableData,
    formData,
    handleChange,
    handleSubmit,
    editId,
  } = useGlobal();

  const type = "user";

  const fields = [
    { id: "name", label: "Nama", type: "text", placeholder: "Masukkan nama" },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Masukkan password",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan email",
    },
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

  const kolom = [
    { key: "name", label: "Nama" },
    { key: "password", label: "Password" },
    { key: "email", label: "Email" },
    { key: "jenisKelamin", label: "Jenis Kelamin" },
    { key: "aksi", label: "Aksi" },
  ];

  const dataWithAction = (tableData[type] || []).map((row) => ({
    ...row,
    aksi: <Fungsi row={row} type={type} fields={fields} />, 
  }));

  return (
    <Main>
      <div className="p-5">

        <div className="flex justify-between">
          <Heading level={1} variant={"gray"}>
             DATA PENGGUNA
          </Heading>
          <Button onClick={() => setIsOpen(true)} text="Tambah" variant="tambah" />
          
        </div>


       {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="bg-white border p-6 rounded mx-4 border-white shadow-lg w-full max-w-lg relative">
            <Form
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={(e) =>
              handleSubmit(e, fields, type, editId ? "update" : "create")
              }
              action={editId ? "update" : "create"}
            />
            <div className="mt-4 flex justify-end">
              <Button
              type="button"
              text="Batal"
              variant="hapus"
              onClick={() => setIsOpen(false)}
              />

            </div>
          </div>
        </div>
        )}

        <Table
          table={kolom}
          data={dataWithAction}
          
        />
      </div>
    </Main>
  );
}
