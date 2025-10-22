import { Response, Request } from "express";
import { tasksModel } from "../model/taskModel";
import { ITasks } from "../model/taskModel";

export const createTask = async (req: Request, res: Response): Promise<ITasks | void> => {
  try {
    const { titulo, descripcion, estado } = req.body;

    if (!titulo || !descripcion || !estado) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    const nuevaTarea = new tasksModel({ titulo, descripcion, estado });
    await nuevaTarea.save();

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<ITasks[] | void> => {
  try {
    const tareas = await tasksModel.find();
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<ITasks | void> => {
  try {
    const { id } = req.params;
    const tarea = await tasksModel.findById(id);

    if (!tarea) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<ITasks | void> => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado } = req.body;

    const tareaActualizada = await tasksModel.findByIdAndUpdate(
      id,
      { titulo, descripcion, estado },
      { new: true }
    );

    if (!tareaActualizada) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const tareaEliminada = await tasksModel.findByIdAndDelete(id);

    if (!tareaEliminada) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }

    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};