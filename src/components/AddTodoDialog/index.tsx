import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {useState} from "react";
import {useCreateTodo} from "../../hooks/useCreateTodo.tsx";

type TFormSchema = {
    title: string;
    description: string;
    deadline: string;
}

interface IAddTodoDialog {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodoDialog({ open, setOpen }: IAddTodoDialog) {
    const { mutateAsync: createTodo } = useCreateTodo()

    const [deadline, setDeadline] = useState<Dayjs | null>(dayjs(new Date()));

    const { register: registerInput, handleSubmit, reset: resetForm } = useForm<TFormSchema>();

    const onSubmit: SubmitHandler<TFormSchema> = async (data) => {
        const date = deadline?.toDate() || new Date();
        date.setHours(date.getHours() - 3)
        data.deadline = date.toISOString()
        await createTodo(data);
        resetForm();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit),
            }}
            fullWidth
        >
            <DialogTitle>Insira os dados da tarefa</DialogTitle>
            <DialogContent>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"10px"}
                    marginTop={"5px"}
                >
                    <TextField
                        { ...registerInput("title") }
                        autoFocus
                        required
                        id="title"
                        name="title"
                        label="Título"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        { ...registerInput("description") }
                        id="description"
                        name="description"
                        label="Descrição"
                        fullWidth
                        variant="outlined"
                        multiline
                    />
                    <MobileDateTimePicker
                        label={"Prazo"}
                        name={"deadline"}
                        value={deadline}
                        onChange={(newValue) => setDeadline(newValue)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" variant={"contained"}>Criar</Button>
            </DialogActions>
        </Dialog>
    );
}