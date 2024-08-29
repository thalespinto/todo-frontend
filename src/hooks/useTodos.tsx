import {useQuery} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {TGetQueryOptions} from "../services/todo/todoApi.types.ts";

const todoApi = new TodoApi();

export const useTodos = (query?: TGetQueryOptions) => useQuery({
    queryKey: ["todos", query],
    queryFn: () => todoApi.get(query)
})
