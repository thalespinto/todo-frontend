import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {TCreateTodo} from "../types/todo.types.ts";
import {ToastType, useToast} from "./useToast.tsx";

const todoApi = new TodoApi()

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast()

    return useMutation(({
        mutationFn: (todo: TCreateTodo) => todoApi.create(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]}).then()
            showToast({
                title: "Todo criado!",
                type: ToastType.SUCCESS
            })
        },
        onError: () => {
            showToast({
                title: "Erro ao criar Todo!",
                type: ToastType.ERROR
            })
        }
    }))
}
