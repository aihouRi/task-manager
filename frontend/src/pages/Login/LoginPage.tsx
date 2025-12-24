import { useNavigate } from "react-router-dom"
import { tokenStorge } from "../../services/token"
import { Box, Button, Typography } from "@mui/material"

const LoginPage = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        tokenStorge.set("dummy-token")
        navigate("/tasks", { replace: true })
    }


    return (
        <Box sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Login
            </Typography>
            <Button variant="contained" onClick={handleLogin}>
                Sign in
            </Button>
        </Box>
    )
}

export default LoginPage