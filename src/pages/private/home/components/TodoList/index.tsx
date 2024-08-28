import {useEffect, useState} from "react";
import {Box, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TodoCard from "../../../../../components/TodoCard";
import {useTodos} from "../../../../../hooks/useTodos.tsx";
import {TGetQueryOptions} from "../../../../../services/todo/todoApi.types.ts";

const TodoList = () => {
    const [todosQuery, setTodosQuery] = useState<TGetQueryOptions>({})

    const [filter, setFilter] = useState("Todos");
    const filters = ["Todos", "Concluídas", "A fazer"];

    const { data: getTodosResp } = useTodos(todosQuery);

    const handleChangeFilter = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        if(filter !== "Todos") {
            setTodosQuery((prevState) => ({...prevState, done: filter === "Concluídas"}))
        } else {
            const query = { ...todosQuery };
            delete query.done;
            setTodosQuery(query);
        }
    }, [filter]);

    return (
        <Box
            width={"100%"}
            margin={"auto"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"10px"}
        >
            <Box alignSelf={"flex-end"} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="filter">Filtrar</InputLabel>
                    <Select
                        variant={"outlined"}
                        labelId="filter"
                        id="filter-select"
                        value={filter}
                        label="Filter"
                        onChange={handleChangeFilter}
                        size="small"
                    >
                        {filters.map((filter) => (
                            <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {!!getTodosResp?.data &&
                getTodosResp.data.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
        </Box>
    );
};

export default TodoList;