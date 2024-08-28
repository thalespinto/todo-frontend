import {useMutation} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {TTodo} from "../types/todo.types.ts";

const todoApi = new TodoApi()

export const useUpdateTodo = () => useMutation({
    mutationFn: (todo: Partial<TTodo>) => todoApi.update(todo)
})