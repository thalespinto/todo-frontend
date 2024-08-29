import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {TCreateTodo} from "../types/todo.types.ts";

const todoApi = new TodoApi()

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(({
        mutationFn: (todo: TCreateTodo) => todoApi.create(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]}).then()
        }
    }))
}
