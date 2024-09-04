import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../../../services/auth/AuthProvider.tsx";
import {IconButton, Tooltip} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { logout } = authContext;

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