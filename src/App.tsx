import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme();

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>

    </>
  )
}

export default App
