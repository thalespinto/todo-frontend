import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./services/auth/AuthProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const theme = createTheme();
const queryClient = new QueryClient();

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>

    </>
  )
}

export default App
