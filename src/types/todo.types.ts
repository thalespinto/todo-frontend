export type TTodo = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    deadline: Date;
    user: number;
}

export type TCreateTodo = {
    title: string;
    description: string;
    done?: boolean;
    deadline: string;
}