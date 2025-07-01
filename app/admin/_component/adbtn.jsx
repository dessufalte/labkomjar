export default function AddButton({ onClick }) {
  return (
    <div className="flex justify-end my-4">
      <button
        onClick={onClick}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        + Add
      </button>
    </div>
  );
}