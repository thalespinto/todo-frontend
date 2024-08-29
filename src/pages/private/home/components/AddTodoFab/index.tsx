import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddTodoDialog from "../../../../../components/AddTodoDialog";

const AddTodoFab = () => {
    const [openAddTodoDialog, setOpenAddTodoDialog] = useState(false);
    return (
        <>
            <div style={{ position: "fixed", bottom: 16, right: 16 }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setOpenAddTodoDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </div>
            {openAddTodoDialog && (
                <AddTodoDialog
                    open={openAddTodoDialog}
                    setOpen={setOpenAddTodoDialog}
                />
            )}
        </>
    );
};

export default AddTodoFab;