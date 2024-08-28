import {TCreateTodo, TTodo} from "../../types/todo.types.ts";
import {api} from "../api.ts";
import {TPaginatedResponse} from "../../types/paginated-response.types.ts";
import {TGetQueryOptions} from "./todoApi.types.ts";

export class TodoApi {
    private baseUrl = "/todos";

    public create = async (todo: TCreateTodo) =>
        await api.post<TTodo>(`${this.baseUrl}`, todo)
            .then((resp) => resp.data);

    public get = async (query?: TGetQueryOptions): Promise<TPaginatedResponse<TTodo>> =>
        await api.get<TPaginatedResponse<TTodo>>(`${this.baseUrl}`, { params: query })
            .then((resp) => resp.data);


    public update = async (todo: Partial<TTodo>) =>
        await api.patch(`${this.baseUrl}/${todo.id}`, todo);

    public delete = async (id: number) =>
        await api.delete(`${this.baseUrl}/${id}`);
}