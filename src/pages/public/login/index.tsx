import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, styled, TextField} from "@mui/material";
import PageContainer from "../../../components/pageContainer";

const StyledContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.grey["50"],
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:"1em",
    margin:"auto",
    padding:"2em",
    maxWidth:"400px",
    border:"1px solid black",
    borderRadius:"4px",
}));


type TLogin = {
    email: string;
    password: string;
}

const Login = () => {
    const {register, handleSubmit} = useForm<TLogin>()

        const onSubmit: SubmitHandler<TLogin> = (data) => {
            console.log(data);
        }

    return(
        <PageContainer>
            <StyledContainer
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...register(("email"))}
                    required
                    label="Email"
                    name="email"
                    fullWidth
                />
                <TextField
                    {...register(("password"))}
                    type={"password"}
                    required
                    label="Senha"
                    name="password"
                    fullWidth
                />
                <Button variant="contained" type={"submit"} >Entrar</Button>
            </StyledContainer>
        </PageContainer>

    )
}

export default Login;