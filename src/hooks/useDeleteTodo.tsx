import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";

const todoApi = new TodoApi()

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(({
        mutationFn: (id: number) => todoApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]}).then(() => console.log("queries invaldiades"))
        }
    }))
}
