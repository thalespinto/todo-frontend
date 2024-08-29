import {SubmitHandler, useForm} from "react-hook-form";
import {Box, styled, TextField} from "@mui/material";
import PageContainer from "../../../components/pageContainer";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../../services/auth/AuthProvider.tsx";
import {LoadingButton} from "@mui/lab";

const StyledContainer = styled(Box)(({ theme }) => ({
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
    const navigate = useNavigate()

    const [logingIn, setLogingIn] = useState(false);

    const {register: registerInput, handleSubmit} = useForm<TLogin>()
    const { login } = useContext(AuthContext);
    const onSubmit: SubmitHandler<TLogin> = async (data) => {
        setLogingIn(true);
        await login(data);
        setLogingIn(false);
        navigate("/home");
    }

    return(
        <PageContainer>
            <StyledContainer
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...registerInput(("email"))}
                    required
                    label="Email"
                    name="email"
                    fullWidth
                />
                <TextField
                    {...registerInput(("password"))}
                    type={"password"}
                    required
                    label="Senha"
                    name="password"
                    fullWidth
                />
                <LoadingButton
                    loading={logingIn}
                    variant="contained"
                    type={"submit"}
                >
                    Entrar
                </LoadingButton>
                <Link to="/register" >Criar uma conta</Link>
            </StyledContainer>
        </PageContainer>

    )
}

export default Login;