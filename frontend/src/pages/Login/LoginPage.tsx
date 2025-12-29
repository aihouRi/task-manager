import { useNavigate } from "react-router-dom"
import { tokenStorge } from "../../services/token"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { login } from "../../services/auth"
import { userStorage } from "../../services/user"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const { token, user } = await login(email, password)
            tokenStorge.set(token)
            userStorage.set(user)
            navigate("/tasks", { replace: true })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Login
            </Typography>

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button fullWidth variant="contained" onClick={handleLogin}>
                Login
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Don't have an account?{" "}
                <Button variant="text"
                    sx={{ textTransform: 'none' }}
                    onClick={() => navigate("/register")}>
                    Register
                </Button>
            </Typography>
        </Box>
    )
}

export default LoginPage