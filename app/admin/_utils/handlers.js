// _utils/handlers.js

export function handleOpenForm(setFormState, config) {
  setFormState((prev) => ({
    ...prev,
    isOpen: true,
    currentFormConfig: config,
  }));
}

export function handleCloseForm(setFormState) {
  setFormState((prev) => ({
    ...prev,
    isOpen: false,
    currentFormConfig: null,
  }));
}

export function handleEdit(setCurrentItem) {
  return (item) => setCurrentItem(item);
}

export async function handleDelete({ id, type, urlMap, setData }) {
  try {
    const res = await fetch(urlMap[type], {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error("Delete failed");

    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
  }
}
