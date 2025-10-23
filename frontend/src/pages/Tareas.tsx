import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Task {
  _id?: string;
  titulo: string;
  descripcion: string;
  estado: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { register, handleSubmit, reset } = useForm<Task>();

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:4000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data: Task) => {
    const url = editingTask
      ? `http://localhost:4000/api/tasks/${editingTask._id}`
      : "http://localhost:4000/api/tasks";
    const method = editingTask ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset();
    setEditingTask(null);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    reset(task);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`http://localhost:4000/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 bg-red-">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          📝 Gestor de Tareas
        </h1>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg flex flex-col rounded-2xl p-6 mb-8 border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingTask ? "Editar Tarea" : "Agregar Nueva Tarea"}
          </h2>

          <div className="space-y-3">
            <input
              {...register("titulo", { required: true })}
              placeholder="Título"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
              {...register("descripcion", { required: true })}
              placeholder="Descripción"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <select
              {...register("estado", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Seleccionar estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            {editingTask ? "Actualizar Tarea" : "Agregar Tarea"}
          </button>
        </form>

        {/* Lista de tareas */}
        <ul className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task._id}
                className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex justify-between items-start hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{task.titulo}</h2>
                  <p className="text-gray-600 mt-1">{task.descripcion}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${task.estado === "completada"
                        ? "bg-green-100 text-green-700"
                        : task.estado === "en progreso"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {task.estado}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-3 py-1 rounded-md bg-yellow-400 text-white font-medium hover:bg-yellow-500 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay tareas disponibles 😴
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}