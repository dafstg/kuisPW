import { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Nyapu Rumah",
    description: "",
    priority: "Low",
    deadline: "2026-11-19",
    status: "Pending",
  },
  {
    id: 2,
    title: "Ngerjain Kuis PW",
    description: "",
    priority: "High",
    deadline: "2026-11-20",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Belajar UTS Strukdat",
    description: "",
    priority: "Medium",
    deadline: "2026-11-24",
    status: "Pending",
  },
];

const formatDeadline = (deadline) => {
  if (!deadline) return "-";

  const [year, month, day] = deadline.split("-");
  return year && month && day ? `${day}-${month}-${year}` : deadline;
};

const emptyForm = {
  title: "",
  description: "",
  priority: "Low",
  deadline: "",
  status: "Pending",
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Membuka form tambah tugas
  const handleAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  // Membuka form edit tugas
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
      status: task.status,
    });

    setEditingId(task.id);
    setSelectedTask(null);
    setShowForm(true);
  };

  // Menyimpan tugas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId
            ? { ...task, ...form }
            : task
        )
      );

      alert("Tugas berhasil diperbarui!");
    } else {
      const newTask = {
        id: Date.now(),
        ...form,
      };

      setTasks((prev) => [...prev, newTask]);

      alert("Tugas berhasil ditambahkan!");
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Menghapus tugas
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus tugas ini?"
    );

    if (confirmDelete) {
      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

      alert("Tugas berhasil dihapus!");
    }
  };

  // Mengubah status tugas
  const handleStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );

    setSelectedTask((prev) =>
      prev && prev.id === id
        ? { ...prev, status }
        : prev
    );
  };

  return (
    <div className="todo-container">

      {/* HEADER */}
      <header className="todo-header">
        <h1>Todo List</h1>

        <button
          className="add-button"
          onClick={handleAdd}
          title="Tambah Todo"
          aria-label="Tambah Todo"
        >
          +
        </button>
      </header>

      {/* TABEL DAFTAR TUGAS */}
      <div className="table-container">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-data">
                  Belum ada tugas. Silakan tambahkan tugas baru.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td className="task-title">
                    {task.title}
                  </td>

                  <td>
                    {task.status}
                  </td>

                  <td>
                    {task.priority}
                  </td>

                  <td>{formatDeadline(task.deadline)}</td>

                  <td>
                    <div className="action-buttons">

                      {/* DETAIL */}
                      <button
                        className="view-button"
                        title="Lihat Detail"
                        onClick={() => setSelectedTask(task)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>

                      {/* EDIT */}
                      <button
                        className="edit-button"
                        title="Edit Tugas"
                        onClick={() => handleEdit(task)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </svg>
                      </button>

                      {/* DELETE */}
                      <button
                        className="delete-button"
                        title="Hapus Tugas"
                        onClick={() => handleDelete(task.id)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="m19 6-1 14H6L5 6" />
                          <path d="M10 11v5M14 11v5" />
                        </svg>
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FORM TAMBAH DAN EDIT */}
      {showForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>
                {editingId !== null
                  ? "Edit Todo"
                  : "Tambah Todo"}
              </h2>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Judul Tugas</label>
              <input
                type="text"
                placeholder="Masukkan judul tugas"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                required
              />

              <label>Deskripsi</label>
              <textarea
                placeholder="Masukkan deskripsi tugas"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

              <label>Prioritas</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label>Deadline</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deadline: e.target.value,
                  })
                }
                required
              />

              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                type="submit"
                className="submit-button"
              >
                {editingId !== null
                  ? "Simpan Perubahan"
                  : "Tambah Tugas"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL TUGAS */}
      {selectedTask && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="modal detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Detail Todo</h2>

              <button
                className="close-button"
                onClick={() => setSelectedTask(null)}
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-item">
                <label>Judul</label>
                <p>{selectedTask.title}</p>
              </div>

              <div className="detail-item">
                <label>Deskripsi</label>
                <p>
                  {selectedTask.description || "Tidak ada deskripsi"}
                </p>
              </div>

              <div className="detail-item">
                <label>Prioritas</label>
                <p>{selectedTask.priority}</p>
              </div>

              <div className="detail-item">
                <label>Deadline</label>
                <p>{formatDeadline(selectedTask.deadline)}</p>
              </div>

              <div className="detail-item">
                <label>Status</label>

                <select
                  value={selectedTask.status}
                  onChange={(e) =>
                    handleStatus(
                      selectedTask.id,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                className="submit-button"
                onClick={() => handleEdit(selectedTask)}
              >
                Edit Todo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;