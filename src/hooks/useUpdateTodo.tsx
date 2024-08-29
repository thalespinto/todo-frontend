import {useMutation} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {TTodo} from "../types/todo.types.ts";
import {ToastType, useToast} from "./useToast.tsx";

const todoApi = new TodoApi()

export const useUpdateTodo = () => {
    const { showToast } = useToast()

    return useMutation({
        mutationFn: (todo: Partial<TTodo>) => todoApi.update(todo),
        onSuccess: () => {
            showToast({
                title: "Edição efetuada.",
                type: ToastType.SUCCESS
            })
        },
        onError: () => {
            showToast({
                title: "Erro ao editar",
                type: ToastType.ERROR
            })
        }
    })
}