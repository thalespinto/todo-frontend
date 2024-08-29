import { useRef, useState } from "react";
import { Theme } from "@mui/material/styles";
import {CardProps, styled, useTheme} from "@mui/material";
import {
    Card as Muicard,
    Typography,
    Box,
    IconButton,
    Tooltip,
    TextField,
} from "@mui/material";
import ActionsMenu from "./components/ActionsMenu";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {TTodo} from "../../types/todo.types.ts";
import {useUpdateTodo} from "../../hooks/useUpdateTodo.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {useDeleteTodo} from "../../hooks/useDeleteTodo.tsx";
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';

interface IStyledCard {
    theme: Theme;
    editing: boolean;
    done: boolean;
}

interface CustomCardProps extends CardProps {
    editing: boolean;
    done: boolean;
}

const Card = styled(Muicard)<CustomCardProps>(({theme, editing, done}: IStyledCard) => ({
    height: "fit-content",
    minHeight: "120px",
    backgroundColor: done
        ? theme.palette.success.light
        : theme.palette.grey[100],
    width: "90%",
    maxWidth: "600px",
    "&:hover": {
        backgroundColor: done
            ? editing
                ? theme.palette.success.light
                : theme.palette.success.main
            : editing
                ? theme.palette.grey[100]
                : theme.palette.grey[300],
    },
    color: done
        ? theme.palette.success.contrastText
        : theme.palette.text.primary,
    padding: "10px 20px",
    display: "flex",
    alignItems: "flex-start",
}));

type TFormSchema = {
    title: string;
    description: string;
}

export default function TodoCard({ todo }: { todo: TTodo }) {
    const theme = useTheme();

    const [localTodo, setLocalTodo] = useState(todo)

    const {register: registerInput, handleSubmit} = useForm<TFormSchema>({
        defaultValues:{
            title: todo.title,
            description: todo.description
        }
    })

    const { mutateAsync: updateTodo } = useUpdateTodo();
    const { mutateAsync: deleteTodo } = useDeleteTodo()


    const formRef = useRef<HTMLFormElement>(null);

    const [editing, setEditing] = useState(false);

    const handleSend = () => {
        formRef.current?.requestSubmit();
    };

    const onSubmit: SubmitHandler<TFormSchema> = async (data) => {
        const updatedTodo = {
            id: localTodo.id,
            ...data
        }
        updateTodo(updatedTodo).then(() => setLocalTodo((prevState) => ({ ...prevState, ...data })));
        setEditing(false);
    };

    const handleChangeDoneValue = async () => {
        const updatedTodo = {
            ...localTodo,
            done: !localTodo.done
        }

        updateTodo(updatedTodo)
            .then(() => setLocalTodo(updatedTodo))
    };

    const handleDeleteTodo = async () => {
        await deleteTodo(localTodo.id);
    }

    const DEADLINE_STATUS = {
        0: "Atrasado",
        1: "Mais de 2 dias para o prazo final",
        2:  "Menos de 2 dias para o prazo final"
    }

    const DEADLINE_COLORS = {
        0: "error",
        1: "success",
        2: "warning",
    }

    const checkDeadline = () => {
        const deadlineDate = new Date(todo.deadline);
        const now = new Date();

        const differenceInTime = deadlineDate.getTime() - now.getTime();

        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays < 0) {
            return 0;
        } else if (differenceInDays > 2) {
            return 1;
        } else {
            return 2;
        }
    }

    return (
        <Card editing={editing} done={localTodo.done}>
            <Box width="100%" height={"100%"}>
                {editing ? (
                    <>
                        <Box
                            ref={formRef}
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                gap={"10px"}
                            >
                                <TextField
                                    { ...registerInput(("title")) }
                                    required
                                    id="outlined-basic"
                                    name="title"
                                    label="Título"
                                    variant="outlined"
                                    size="small"
                                />
                                <TextField
                                    { ...registerInput(("description")) }
                                    id="outlined-basic"
                                    name="description"
                                    label="Descrição"
                                    variant="outlined"
                                    size="small"
                                    rows={3}

                                />
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box
                            height={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"start"}
                            justifyContent={"space-between"}
                        >
                            <Box>
                                <Typography variant="h5">{localTodo.title}</Typography>
                                <Typography
                                    component={"p"}
                                    variant="subtitle1"
                                    sx={{
                                        maxWidth: "490px",
                                        maxHeight: "200px",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden"
                                    }}
                                >
                                    {localTodo.description}
                                </Typography>
                            </Box>
                            {!todo.done && (
                                <Box
                                    display={"flex"}
                                    gap={".5em"}
                                    alignItems={"center"}
                                >
                                    <WarningOutlinedIcon
                                        fontSize={"small"}
                                        color={DEADLINE_COLORS[checkDeadline()]}
                                    />
                                    <Typography>{DEADLINE_STATUS[checkDeadline()]}</Typography>
                                </Box>
                            )}
                        </Box>
                    </>
                )}
            </Box>
            {editing ? (
                <>
                    <Tooltip title="Cancelar">
                        <IconButton
                            aria-label="cancel"
                            onClick={() => setEditing(false)}
                        >
                            <CancelOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Enviar">
                        <IconButton onClick={handleSend} aria-label="enviar">
                            <SendOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <ActionsMenu
                    deleteCallback={handleDeleteTodo}
                    editCallback={() => setEditing(true)}
                    changeDoneCallback={handleChangeDoneValue}
                    isDone={localTodo.done}
                />
            )}
        </Card>
    );
}