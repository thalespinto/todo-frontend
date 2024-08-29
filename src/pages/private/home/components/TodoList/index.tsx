import {useEffect, useState, useTransition} from "react";
import {Box, Button, InputAdornment, SelectChangeEvent, TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TodoCard from "../../../../../components/TodoCard";
import {useTodos} from "../../../../../hooks/useTodos.tsx";
import {TGetQueryOptions} from "../../../../../services/todo/todoApi.types.ts";
import {OrderBy} from "../../../../../constants/order-by.ts";
import SearchIcon from '@mui/icons-material/Search';
import LoadingOverlay from "../../../../../components/LoadingOverlay";

const TodoList = () => {
    const [isPending, startTransition] = useTransition();

    const [searchInput, setSearchInput] = useState("");
    const handleChangeSearchInput = (e) => {
        startTransition(() => {
            const value = e.target.value;
            setTodosQuery((prevState) => ({...prevState, title: value}))
            setSearchInput(value);
        })
    }

    const [todosQuery, setTodosQuery] = useState<TGetQueryOptions>({
        take: 5
    })

    const [filter, setFilter] = useState("Todos");
    const filters = ["Todos", "Concluídas", "A fazer"];
    const handleChangeFilter = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if(value !== "Todos") {
            setTodosQuery((prevState) => ({...prevState, done: value === "Concluídas"}))
        } else {
            const query = { ...todosQuery };
            delete query.done;
            setTodosQuery(query);
        }
        setFilter(value);
    };

    const [orderBy, setOrderBy] = useState(("Novos"));
    const orderByOptions = ["Novos", "Prazo"];
    const handleChangeOrderBy = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if(value === "Novos") {
            setTodosQuery((prevState) => ({...prevState, orderBy: OrderBy.CREATED}))
        } else {
            setTodosQuery((prevState) => ({...prevState, orderBy: OrderBy.DEADLINE}))
        }
        setOrderBy(value);
    };

    const { data: getTodosResp, isLoading: gettingTodos } = useTodos(todosQuery);

    const handleLoadMore = () => {
        setTodosQuery((prevState) => ({...prevState, ...{ take: todosQuery.take! + 5 }}))
    }

    return (
        <Box
            width={"100%"}
            margin={"auto"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"10px"}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                alignSelf={"flex-end"}
                width={"100%"}
            >
                <TextField
                    label="Pesquisar por nome"
                    id="search"
                    value={searchInput}
                    onChange={handleChangeSearchInput}
                    slotProps={{
                        input: {
                            endAdornment:
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>,
                        },
                    }}
                    fullWidth
                />
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
            {gettingTodos || isPending ? (
                <LoadingOverlay/>
            ) : (
                getTodosResp?.data.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))
            )}
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