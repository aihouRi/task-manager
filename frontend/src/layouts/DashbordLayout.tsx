import { Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const DashbordLayout = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 240,
                    borderRight: "1px solid #ddd",
                    p: 2,
                }}
            >
                <Button
                    fullWidth
                    variant="text"
                    onClick={() => navigate("/tasks")}
                >
                    Tasks
                </Button>
            </Box>

            {/* Main content */}
            <Box sx={{ flex: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default DashbordLayout