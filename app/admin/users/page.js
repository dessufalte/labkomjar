"use client";
import { useState, useEffect } from "react";
import GenericTable from "../_component/gtable";
import AddButton from "../_component/adbtn";
import ModalForm from "../_component/form";
import { handleDelete } from "../_utils/handlers";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [praktikums, setPraktikums] = useState([]);
  const [modul, setModul] = useState([]);
  const [images, setImages] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formConfig, setFormConfig] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const urlMap = {
    user: "/api/users",
    article: "/api/articles",
    praktikum: "/api/praktikum",
    modul: "/api/modul",
    image: "/api/images",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/users");
        const articleRes = await fetch("/api/articles");
        const praktikumRes = await fetch("/api/praktikum");
        const modulRes = await fetch("/api/modul");
        const imageRes = await fetch("/api/images");

        setUsers(await userRes.json());
        setArticles(await articleRes.json());
        setPraktikums(await praktikumRes.json());
        setModul(await modulRes.json());
        setImages(await imageRes.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openForm = (type) => {
    const formConfigs = {
      user: {
        title: "Add User",
        endpoint: "/api/users",
        fields: [
          { name: "name", label: "Username", required: true },
          { name: "password", label: "Password", required: true },
        ],
        onSuccess: (newItem) => setUsers((prev) => [...prev, newItem]),
      },
      article: {
        title: "Add Article",
        endpoint: "/api/articles",
        fields: [
          { name: "title", label: "Title", required: true },
          { name: "content", label: "Content", required: true },
          { name: "authorId", label: "Author ID", required: true },
        ],
        onSuccess: (newItem) => setArticles((prev) => [...prev, newItem]),
      },
      praktikum: {
        title: "Add Praktikum",
        endpoint: "/api/praktikum",
        fields: [{ name: "title", label: "Title", required: true }],
        onSuccess: (newItem) => setPraktikums((prev) => [...prev, newItem]),
      },
      modul: {
        title: "Add Modul",
        endpoint: "/api/modul",
        fields: [
          { name: "judul_modul", label: "Title", required: true },
          { name: "prakid", label: "Praktikum ID", required: true },
        ],
        onSuccess: (newItem) => setModul((prev) => [...prev, newItem]),
      },
      image: {
        title: "Add Image",
        endpoint: "/api/images",
        fields: [
          { name: "title", label: "Title", required: true },
          { name: "file", label: "Upload Image", type: "file", required: true },
        ],
        onSuccess: (newItem) => setImages((prev) => [...prev, newItem]),
      },
    };
    setFormConfig(formConfigs[type]);
    setIsFormOpen(true);
  };
  const openEditForm = (type, item) => {
    const formConfigs = {
      user: {
        title: "Edit User",
        endpoint: `/api/users?id=${item.id}`,
        method: "PUT",
        fields: [
          {
            name: "name",
            label: "Name",
            required: true,
            defaultValue: item.name,
          },
          {
            name: "password",
            label: "Password",
            required: true,
            defaultValue: item.password,
          },
        ],
        onSuccess: (updatedUser) =>
          setUsers((prev) =>
            prev.map((u) => (u.id === item.id ? updatedUser : u))
          ),
      },
      article: {
        title: "Edit Article",
        endpoint: `/api/articles?id=${item.id}`,
        method: "PUT",
        fields: [
          {
            name: "title",
            label: "Title",
            required: true,
            defaultValue: item.title,
          },
          {
            name: "content",
            label: "Content",
            required: true,
            defaultValue: item.content,
          },
          {
            name: "authorId",
            label: "Author ID",
            required: true,
            defaultValue: item.authorId || item.author?.id,
          },
        ],
        onSuccess: (updated) =>
          setArticles((prev) =>
            prev.map((a) => (a.id === item.id ? updated : a))
          ),
      },
      praktikum: {
        title: "Edit Praktikum",
        endpoint: `/api/praktikum?id=${item.id}`,
        method: "PUT",
        fields: [
          {
            name: "title",
            label: "Title",
            required: true,
            defaultValue: item.title,
          },
        ],
        onSuccess: (updated) =>
          setPraktikums((prev) =>
            prev.map((p) => (p.id === item.id ? updated : p))
          ),
      },
      modul: {
        title: "Edit Modul",
        endpoint: `/api/modul?id=${item.id}`,
        method: "PUT",
        fields: [
          {
            name: "judul_modul",
            label: "Judul Modul",
            required: true,
            defaultValue: item.judul_modul,
          },
          {
            name: "prakid",
            label: "Praktikum ID",
            required: true,
            defaultValue: item.prakid,
          },
        ],
        onSuccess: (updated) =>
          setModul((prev) => prev.map((m) => (m.id === item.id ? updated : m))),
      },
      image: {
        title: "Edit Image",
        endpoint: `/api/images?id=${item.id}`,
        method: "PUT",
        fields: [
          {
            name: "title",
            label: "Title",
            required: true,
            defaultValue: item.title,
          },
          {
            name: "file",
            label: "Upload New Image (optional)",
            type: "file",
            required: false,
          },
        ],
        onSuccess: (updated) =>
          setImages((prev) =>
            prev.map((img) => (img.id === item.id ? updated : img))
          ),
      },
    };

    setFormConfig(formConfigs[type]);
    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsFormOpen(true);
  };

  return (
    <div className="bg-slate-800 min-h-screen p-6 space-y-8">
      <GenericTable
        title="Users"
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Name", accessor: "name" },
          { header: "Password", accessor: "password" },
          { header: "Created At", accessor: "createdAt" },
        ]}
        data={users}
        onDelete={(id) =>
          handleDelete({ id, type: "user", urlMap, setData: setUsers })
        }
        onEdit={(item) => openEditForm("user", item)}
      />
      <AddButton label="+ Add User" onClick={() => openForm("user")} />

      <GenericTable
        title="Articles"
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Title", accessor: "title" },
          { header: "Content", accessor: "content" },
          {
            header: "Author",
            accessor: "author",
            render: (_, item) => item.author?.name,
          },
        ]}
        data={articles}
        onDelete={(id) =>
          handleDelete({ id, type: "article", urlMap, setData: setArticles })
        }
        onEdit={(item) => openEditForm("article", item)}
      />
      <AddButton label="+ Add Article" onClick={() => openForm("article")} />

      <GenericTable
        title="Praktikum"
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Title", accessor: "title" },
        ]}
        data={praktikums}
        onDelete={(id) =>
          handleDelete({
            id,
            type: "praktikum",
            urlMap,
            setData: setPraktikums,
          })
        }
        onEdit={(item) => openEditForm("praktikum", item)}
      />
      <AddButton
        label="+ Add Praktikum"
        onClick={() => openForm("praktikum")}
      />

      <GenericTable
        title="Modul"
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Title", accessor: "judul_modul" },
          { header: "Praktikum ID", accessor: "prakid" },
        ]}
        data={modul}
        onDelete={(id) =>
          handleDelete({ id, type: "modul", urlMap, setData: setModul })
        }
        onEdit={(item) => openEditForm("modul", item)}
      />
      <AddButton label="+ Add Modul" onClick={() => openForm("modul")} />

      <GenericTable
        title="Images"
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Title", accessor: "title" },
          {
            header: "Image",
            accessor: "url",
            render: (value) => (
              <img
                src={`/galery/${value}`}
                className="h-16 w-auto object-cover"
                alt={value}
              />
            ),
          },
        ]}
        data={images}
        onDelete={(id) =>
          handleDelete({ id, type: "image", urlMap, setData: setImages })
        }
        onEdit={(item) => openEditForm("image", item)}
      />
      <AddButton label="+ Add Image" onClick={() => openForm("image")} />

      {isFormOpen && formConfig && (
        <ModalForm
          title={formConfig.title}
          fields={formConfig.fields}
          onClose={() => {
            setIsFormOpen(false);
            setIsEditMode(false);
            setEditingItemId(null);
          }}
          onSubmit={async (formData) => {
            const res = await fetch(formConfig.endpoint, {
              method: formConfig.method || "POST",
              body: formData,
            });
            const result = await res.json();
            formConfig.onSuccess(result);
            setIsFormOpen(false);
            setIsEditMode(false);
            setEditingItemId(null);
          }}
        />
      )}
    </div>
  );
}
