import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import DashbordLayout from "../layouts/DashbordLayout";
import TaskListPage from "../pages/Tasks/TaskListPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/Register/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />,
    },
    { path: "/login", element: <LoginPage /> },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DashbordLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="/tasks" replace /> },
            { path: "tasks", element: <TaskListPage /> }
        ],
    },
])