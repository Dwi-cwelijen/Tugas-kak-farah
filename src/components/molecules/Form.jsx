import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Button from "../atoms/Button";

export default function Form({ fields = [], formData, handleChange, handleSubmit, action }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {fields.map((field) => (
        <div key={field.id}>
          <Label htmlFor={field.id} text={field.label} />
          {field.type === "select" ? 
          (
            <select
              id={field.id}
              value={formData?.[field.id] ?? ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih {field.label}</option>
              {field.options?.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) 
          
          :

          (
            <Input
              id={field.id}
              min={0}
              type={field.type}
              placeholder={field.placeholder}
              value={formData?.[field.id] ?? ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <Button type="submit"  variant={action === "update" ? "edit" : "simpan"} text={action === "update" ? "Update" : "Simpan"} />
    </form>
  );
}
