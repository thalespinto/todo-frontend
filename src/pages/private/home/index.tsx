import TodoList from "./components/TodoList";
import {Box} from "@mui/material";
import AddTodoFab from "./components/AddTodoFab";
import LogoutButton from "./components/LogoutButton";

const Home = () => {

    return (
        <>
            <Box
                maxWidth={"600px"}
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"end"}
                gap={"40px"}
            >
                <LogoutButton />
                <TodoList />
                <AddTodoFab />
            </Box>
        </>

    );
};

export default Home;