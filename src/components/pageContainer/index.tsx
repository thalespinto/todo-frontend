import {Box as MUIBox, styled} from "@mui/material";
import {ReactNode} from "react";

const Box = styled(MUIBox)(({ theme }) => ({
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
}));

const PageContainer = ({ children }:{ children:ReactNode }) => {
    return(
        <Box>
            { children }
        </Box>
    )
}

export default PageContainer