import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { fetchTasks } from "../../services/tasks";
import { Box, Checkbox, List, ListItem, Typography } from "@mui/material";

const TaskListPage = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await fetchTasks()
            setTasks(data)
            setLoading(false)
        }

        load()
    }, [])

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Task
            </Typography>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <Checkbox checked={task.status} disabled />
                        {task.title}
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default TaskListPage