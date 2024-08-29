import {useEffect, useState} from "react";
import {Box, Button, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TodoCard from "../../../../../components/TodoCard";
import {useTodos} from "../../../../../hooks/useTodos.tsx";
import {TGetQueryOptions} from "../../../../../services/todo/todoApi.types.ts";
import {OrderBy} from "../../../../../constants/order-by.ts";

const TodoList = () => {
    const [todosQuery, setTodosQuery] = useState<TGetQueryOptions>({
        take: 5
    })

    const [filter, setFilter] = useState("Todos");
    const filters = ["Todos", "Concluídas", "A fazer"];
    const handleChangeFilter = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const [orderBy, setOrderBy] = useState(("Novos"));
    const orderByOptions = ["Novos", "Prazo"];
    const handleChangeOrderBy = (event: SelectChangeEvent) => {
        setOrderBy(event.target.value);
    };

    const { data: getTodosResp, isLoading: gettingTodos } = useTodos(todosQuery);

    const handleLoadMore = () => {
        setTodosQuery((prevState) => ({...prevState, ...{ take: todosQuery.take! + 5 }}))
    }

    useEffect(() => {
        if(filter !== "Todos") {
            setTodosQuery((prevState) => ({...prevState, done: filter === "Concluídas"}))
        } else {
            const query = { ...todosQuery };
            delete query.done;
            setTodosQuery(query);
        }

        if(orderBy === "Novos") {
            setTodosQuery((prevState) => ({...prevState, orderBy: OrderBy.CREATED}))
        } else {
            setTodosQuery((prevState) => ({...prevState, orderBy: OrderBy.DEADLINE}))
        }

    }, [filter, orderBy]);

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
                <FormControl fullWidth>
                    <InputLabel id="filter">Ordenar</InputLabel>
                    <Select
                        variant={"outlined"}
                        labelId="order"
                        id="order-by-select"
                        value={orderBy}
                        label="Order"
                        onChange={handleChangeOrderBy}
                        size="small"
                    >
                        {orderByOptions.map((orderByOption) => (
                            <MenuItem key={orderByOption} value={orderByOption}>{orderByOption}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {!!getTodosResp?.data &&
                getTodosResp.data.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            <Button
                variant={"text"}
                onClick={handleLoadMore}
                disabled={!getTodosResp?.meta.hasNextPage}
            >
                Carregar mais...
            </Button>
        </Box>
    );
};

export default TodoList;