import { useNavigate } from "react-router-dom"
import { tokenStorge } from "../../services/token"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { login } from "../../services/auth"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const { token } = await login(email, password)
            tokenStorge.set(token)
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
        </Box>
    )
}

export default LoginPage