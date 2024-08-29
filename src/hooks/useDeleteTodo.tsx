import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../services/todo/todoApi.ts";
import {ToastType, useToast} from "./useToast.tsx";

const todoApi = new TodoApi()

export const useDeleteTodo = () => {
    const { showToast } = useToast()
    const queryClient = useQueryClient();

    return useMutation(({
        mutationFn: (id: number) => todoApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]}).then(() => console.log("queries invaldiades"))
            showToast({
                title: "Todo deletado!",
                type: ToastType.SUCCESS
            })
        },
        onError: () => {
            showToast({
                title: "Erro ao deletar todo.",
                type: ToastType.ERROR
            })
        }
    }))
}
