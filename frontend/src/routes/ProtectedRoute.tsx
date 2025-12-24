import type React from "react"
import { tokenStorge } from "../services/token"
import { Navigate } from "react-router-dom"

type Props = {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
    const token = tokenStorge.get()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute