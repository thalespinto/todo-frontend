
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";

export default function LoadingOverlay() {
    return (
        <Box display={"flex"} alignItems={"center"} gap={"20px"}>
            <CircularProgress />
            <Typography variant="body2" color="textSecondary">Carregando...</Typography>
        </Box>
    );
}
