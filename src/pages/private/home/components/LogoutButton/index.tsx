import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../../../services/auth/AuthProvider.tsx";
import {IconButton, Tooltip} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        navigate("/");
    }

    return(
        <Tooltip title="Sair">
            <IconButton
                aria-label="logout"
                onClick={handleLogout}
                size={"large"}
            >
                <LogoutIcon />
            </IconButton>
        </Tooltip>
    )
}

export default LogoutButton;