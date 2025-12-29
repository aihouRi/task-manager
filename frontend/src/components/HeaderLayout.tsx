import { useState } from "react";
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, ListItemIcon, Divider, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userStorage } from "../services/user";
import { tokenStorge } from "../services/token";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const HeaderLayout = () => {
    const navigate = useNavigate()
    const user = userStorage.get()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        handleClose();
        tokenStorge.clear();
        userStorage.clear();
        navigate("/login", { replace: true });
    }

    return (
        <Box sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 3,
            borderBottom: '1px solid #eee',
            bgcolor: 'background.paper'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 'medium' }}>
                    {user?.name}
                </Typography>

                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small">
                        <Avatar sx={{ width: 35, height: 35, bgcolor: 'primary.main', fontSize: '1rem' }}>
                            {user?.name?.[0].toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default HeaderLayout