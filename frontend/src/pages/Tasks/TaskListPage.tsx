import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { deleteTask, fetchTasks } from "../../services/tasks";
import { Box, Button, Checkbox, List, ListItem, Typography } from "@mui/material";
import { CreateTaskDialog } from "./CreateTaskDialog";

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
            <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Task
                </Typography>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.id} secondaryAction={
                            <Button
                                color="error"
                                onClick={() => handleDelete(task.id)}>
                                Delete
                            </Button>
                        }>
                            <Checkbox checked={task.status} disabled />
                            {task.title}
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Button variant="contained" onClick={() => { setCreateOpen(true) }}>
                New Task
            </Button>

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