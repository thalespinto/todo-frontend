import TodoList from "./components/TodoList";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <Box maxWidth={"600px"} margin={"auto"}>
            <TodoList />
        </Box>
    );
};

export default Home;