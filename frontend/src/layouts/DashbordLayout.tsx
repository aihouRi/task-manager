import { Box, Button, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const DashbordLayout = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 150,
                    borderRight: "1px solid #eee",
                    p: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                    Task Manager
                </Typography>

                <Button
                    fullWidth
                    variant="text"
                    onClick={() => navigate("/tasks")}
                    sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontSize: '1rem'
                    }}
                >
                    tasks
                </Button>
            </Box>

            {/* Main content */}
            <Box sx={{ flex: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box >
    )
}

export default DashbordLayout