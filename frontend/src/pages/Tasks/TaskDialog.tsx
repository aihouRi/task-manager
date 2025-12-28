import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import type { Task } from "../../types/task"

type Props = {
    open: boolean
    mode: 'create' | 'edit' | 'delete' | null
    task?: Task | null
    onClose: () => void
    onSubmit: (input: { title: string; description: string }) => Promise<void>
}

export const TaskDialog = ({ open, onClose, onSubmit, mode, task }: Props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await onSubmit({ title, description })
            setTitle('')
            setDescription('')
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (mode == 'edit' && task) {
            setTitle(task.title)
            setDescription(task.description)
        } else if (mode == 'create') {
            setTitle('')
            setDescription('')
        }
    }, [mode, task])

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{mode === 'create' ? 'Create Task' : 'Edit Task'}</DialogTitle>

            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={loading || !title || !description}>
                    {mode === 'create' ? 'Create' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}