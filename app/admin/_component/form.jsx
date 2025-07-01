"use client";
import { useState } from "react";

export default function ModalForm({ title, fields, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const body = new FormData();
      body.append("file", file);
      Object.entries(formData).forEach(([key, val]) => body.append(key, val));
      onSubmit(body);
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-semibold">{field.label}</label>
              {field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                  accept="image/*"
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                  className="border p-2 rounded"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


