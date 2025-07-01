// _component/gtable.jsx
"use client";
import React from "react";

export default function GenericTable({ title, columns, data, onEdit, onDelete, showActions = true }) {
  return (
    <div className="bg-slate-700 p-4 rounded-md mb-6">
      <h2 className="text-xl text-white mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-600 text-white rounded-md">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-2 border-b">
                  {col.header}
                </th>
              ))}
              {showActions && <th className="p-2 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="p-2 border-b">
                      {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="p-2 border-b flex gap-2">
                      <button
                        onClick={() => onEdit?.(item)}
                        className="bg-cyan-500 text-white px-2 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete?.(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center p-4">
                  No {title.toLowerCase()} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
