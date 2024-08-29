import {router} from "./routes";
import {RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./services/auth/AuthProvider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();
const queryClient = new QueryClient({
    defaultOptions: {
        queries:{
            staleTime: 60 * 60 * 24,
            retry: false
        }
    }
});

function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </AuthProvider>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>

    </>
  )
}

export default App
