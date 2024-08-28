import {createContext, useState, ReactNode, useMemo} from 'react';
import {User} from "../../types/user.types.ts";
import {AuthApi} from "./authApi.ts";
import {TSignIn} from "./authApi.types.ts";
import {api} from "../api.ts";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    register: (userData: User) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authApi = useMemo(() => new AuthApi(), [])

    const register = async (userData: User) => {
        await authApi.register(userData);
    }

    const login = async (data: TSignIn) => {
        try{
            const { access_token } =  await authApi.signIn(data);
            localStorage.setItem('token', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setIsAuthenticated(true);
        } catch {
            alert("Erro ao fazer login")
        }

    };
    if(localStorage.getItem('token'))
        api.defaults.headers.common['Authorization'] = `Bearer ${(localStorage.getItem('token'))}`;

    const logout = () => {
        // Função para fazer logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
