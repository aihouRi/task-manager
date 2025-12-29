import { Navigate } from "react-router-dom";
import { tokenStorge } from "../services/token";

type Props = {
    children: React.ReactNode
}

const PublicRoute = ({ children }: Props) => {
    const token = tokenStorge.get();

    if (token) {
        return <Navigate to="/tasks" replace />;
    }

    return <>{children}</>
};

export default PublicRoute;