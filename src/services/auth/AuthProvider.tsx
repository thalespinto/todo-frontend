import {createContext, ReactNode, useMemo, useState} from 'react';
import {User} from "../../types/user.types.ts";
import {AuthApi} from "./authApi.ts";
import {TSignIn} from "./authApi.types.ts";
import {api} from "../api.ts";
import {ToastType, useToast} from "../../hooks/useToast.tsx";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    register: (userData: User) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { showToast } = useToast()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authApi = useMemo(() => new AuthApi(), [])

    const register = async (userData: User) => {
        await authApi.register(userData)
    }

    const login = async (data: TSignIn) => {
        try{
            const { access_token } =  await authApi.signIn(data);
            localStorage.setItem('token', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setIsAuthenticated(true);
        } catch (e) {
            showToast(
                {
                    title: "Erro ao fazer login",
                    type: ToastType.ERROR
                }
            );
        }

    };
    if(localStorage.getItem('token'))
        api.defaults.headers.common['Authorization'] = `Bearer ${(localStorage.getItem('token'))}`;

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
