import { Router } from "express";
import { createTask, getTasks, getTaskById, updateTask } from "../controller/task.controller";

const router = Router();
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);

export const taskRouter = router;