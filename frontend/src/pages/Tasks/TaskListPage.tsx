import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { createTask, deleteTask, fetchTasks, updateTask } from "../../services/tasks";
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TaskDialog } from "./TaskDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskListPage = () => {
    type TaskDialogMode = 'create' | 'edit' | null

    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogMode, setDialogMode] = useState<TaskDialogMode>(null)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const load = async () => {
        try {
            const data = await fetchTasks()
            setTasks(data)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id)
            load()
        } catch (e) {
            console.error(e)
        }
    }

    const handleCreate = async (input: { title: string; description: string }) => {
        await createTask(input.title, input.description)
        setDialogOpen(false)
        load()
    }

    const handleUpdate = async (input: { title: string; description: string }) => {
        if (!editingTask) return
        await updateTask(editingTask.id, input)
        setDialogOpen(false)
        load()
    }

    const openCreateDialog = () => {
        setDialogMode('create')
        setEditingTask(null)
        setDialogOpen(true)
    }

    const openEditDialog = (task: Task) => {
        setDialogMode('edit')
        setEditingTask(task)
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
        setDialogMode(null)
        setEditingTask(null)
    }

    const handleToggleStatus = async (task: Task, checked: boolean) => {
        const previousTasks = [...tasks]
        setTasks(prev => prev.map(t =>
            t.id === task.id ? { ...t, status: checked } : t
        ))

        try {
            await updateTask(task.id, { status: checked })
        } catch (err) {
            console.error("Failed to update status:", err)
            setTasks(previousTasks)
        }
    }

    useEffect(() => {
        load()
    }, [])

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Tasks
                </Typography>

                <Button variant="contained" onClick={openCreateDialog}>
                    New Task
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell width="10%">Status</TableCell>
                            <TableCell width="25%">Title</TableCell>
                            <TableCell width="40%">Description</TableCell>
                            <TableCell width="25%" align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id} hover>
                                <TableCell>
                                    <Checkbox checked={task.status}
                                        size="small"
                                        onChange={(e) => handleToggleStatus(task, e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>
                                    {task.title}
                                </TableCell>
                                <TableCell sx={{
                                    maxWidth: 400,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {task.description}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => openEditDialog(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TaskDialog
                open={dialogOpen}
                mode={dialogMode}
                task={editingTask}
                onClose={closeDialog}
                onSubmit={dialogMode === 'create' ? handleCreate : handleUpdate}
            />
        </>
    )

}

export default TaskListPage