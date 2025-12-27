import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { deleteTask, fetchTasks } from "../../services/tasks";
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CreateTaskDialog } from "./CreateTaskDialog";
import DeleteIcon from '@mui/icons-material/Delete';

const TaskListPage = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)

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

                <Button variant="contained" onClick={() => { setCreateOpen(true) }}>
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
                                    <Checkbox checked={task.status} disabled size="small" />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>
                                    {task.title}
                                </TableCell>
                                <TableCell>
                                    {task.description}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleDelete(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CreateTaskDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onCreated={() => {
                    setCreateOpen(false)
                    load()
                }}
            />
        </>
    )

}

export default TaskListPage