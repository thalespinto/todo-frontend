import {api} from "../api.ts";
import {User} from "../../types/user.types.ts";
import {TSignIn, TSignInSuccessResponse} from "./authApi.types.ts";

export class AuthApi {
    private baseUrl = "/auth";

    public register = async (user: User) => await api.post(`${this.baseUrl}/register`, user);

    public signIn = async (data: TSignIn) => await api.post<TSignInSuccessResponse>(`${this.baseUrl}/login`, data)
        .then((resp) => resp.data);
}