import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import type { Task } from "../../types/task"
import { useState } from "react"

type Props = {
    open: boolean
    task?: Task | null
    onClose: () => void
    onConfirm: (id: number) => Promise<void>
}

export const ConfirmDialog = ({ open, onClose, task, onConfirm }: Props) => {
    const [submitting, setSubmitting] = useState(false)

    const handleConfirm = async () => {
        if (!task) return
        setSubmitting(true)
        try {
            await onConfirm(task.id)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
        >
            <DialogTitle>タスクの削除</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    本当に「{task?.title}」を削除してもよろしいですか？この操作は取り消せません。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>キャンセル</Button>
                <Button
                    onClick={handleConfirm}
                    color="error"
                    variant="contained"
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}