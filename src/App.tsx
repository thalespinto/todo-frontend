import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./services/auth/AuthProvider.tsx";

const theme = createTheme();

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>

    </>
  )
}

export default App
