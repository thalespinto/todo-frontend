import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import Delete from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

interface IActionsMenu {
    deleteCallback: () => void;
    editCallback: () => void;
    changeDoneCallback: () => void;
    isDone: boolean;
}


export default function ActionsMenu({deleteCallback, editCallback, changeDoneCallback, isDone}: IActionsMenu) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = !!anchorEl;
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Opções">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "opções" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <KeyboardArrowDownIcon
                            fontSize="medium"
                            sx={{ color: isDone ? "white" : "" }}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="options-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={changeDoneCallback}>
                    {isDone ? (
                        <>
                            <ListItemIcon>
                                <RemoveDoneIcon fontSize="small" />
                            </ListItemIcon>
                            Desfazer
                        </>
                    ) : (
                        <>
                            <ListItemIcon>
                                <DoneIcon fontSize="small" />
                            </ListItemIcon>
                            Concluir
                        </>
                    )}
                </MenuItem>
                <MenuItem onClick={editCallback}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Editar
                </MenuItem>
                <MenuItem onClick={deleteCallback}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    Deletar
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}