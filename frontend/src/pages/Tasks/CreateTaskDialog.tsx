import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import { createTask } from "../../services/tasks"

type Props = {
    open: boolean
    onClose: () => void
    onCreated: () => void
}

export const CreateTaskDialog = ({ open, onClose, onCreated }: Props) => {
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCreate = async () => {
        setLoading(true)
        try {
            await createTask(title)
            onCreated()
            setTitle("")
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Create Task</DialogTitle>

            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate} disabled={loading || !title}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}