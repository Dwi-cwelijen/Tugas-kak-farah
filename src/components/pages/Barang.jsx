import { useGlobal } from "../../Global/useGlobal";
import Form from "../molecules/Form";
import Table from "../molecules/Tabel";
import Button from "../atoms/Button";
import Main from "../templates/MainLayout";
import Fungsi from "../molecules/Fungsi";
import Heading from "../atoms/Headling";

export default function Barang() {
  const {
    isOpen,
    setIsOpen,
    tableData,
    formData,
    handleChange,
    handleSubmit,
    editId,
    resetForm
  } = useGlobal();

  const type = "barang";

  const fields = [
    { id: "title", label: "Nama Barang", type: "text", placeholder: "Masukkan nama barang" },
    { id: "price", label: "Harga", type: "number", placeholder: "Masukkan harga" },
    { id: "brand", label: "Brand", type: "text", placeholder: "Masukkan Brand" },
    { id: "stock", label: "Stok", type: "number", placeholder: "Masukkan jumlah stok" },
  ];


  const kolom = [
    { key: "title", label: "Nama Barang" },
    { key: "price", label: "Harga" },
    { key: "brand", label: "Brand" },
    { key: "stock", label: "Stok" },
    { key: "aksi", label: "Aksi" },
  ];


  const rawData = tableData?.[type];
  const rows = Array.isArray(rawData)
    ? rawData
    : rawData?.data && Array.isArray(rawData.data)
    ? rawData.data
    : rawData && typeof rawData === "object"
    ? Object.values(rawData)
    : [];


  const dataWithAction = rows.map((row) => ({
    ...row,
    aksi: <Fungsi row={row} type={type} fields={fields} />,
  }));

  return (
    <Main>
      <div className="p-5 md:p-8 relative">

        <div className="flex justify-between mb-4">
          <Heading level={2} className={"md:text-3xl md:font-bold"} variant={"gray"}>
              DATA PRODUK
          </Heading>
          <Button onClick={() => setIsOpen(true)} text="Tambah" variant="tambah" />
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-white border  border-white p-6 rounded-xl mx-4 shadow-2xl w-full md:max-w-lg max-w-sm relative">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Barang" : "Tambah Barang"}
              </h2>

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
                  onClick={() => {resetForm(fields); setIsOpen(false);}}
                />
              </div>
            </div>
          </div>
        )}
        <Table
          table={kolom}
          data={dataWithAction}
          className="border-collapse border border-gray-300 w-full"
        />
      </div>
    </Main>
  );
}
