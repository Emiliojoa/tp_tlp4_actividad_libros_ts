import { Router } from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controller/task.controller";

const router = Router();
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export const taskRouter = router;