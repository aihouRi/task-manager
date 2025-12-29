import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../../services/auth"

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            await register(name, email, password)
            navigate("/login")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Create Account
            </Typography>

            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <Button
                fullWidth
                variant="contained"
                onClick={handleRegister}
                disabled={!name || !email || !password}
                sx={{ mt: 3, mb: 2, textTransform: 'none' }}
            >
                Register
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Already have an account?{" "}
                <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate("/login")}
                    sx={{ textTransform: 'none' }}
                >
                    Sign In
                </Button>
            </Typography>

        </Box>
    );
};

export default RegisterPage;
