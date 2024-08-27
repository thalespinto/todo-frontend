import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, styled, TextField} from "@mui/material";
import PageContainer from "../../../components/pageContainer";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../services/auth/AuthProvider.tsx";
import {useContext} from "react";

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


type TRegister = {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate()

    const { register: registerInput, handleSubmit } = useForm<TRegister>()
    const { register } = useContext(AuthContext);

    const onSubmit: SubmitHandler<TRegister> = async (data) => {
        await register(data)
        navigate("/");
    }

    return(
        <PageContainer>
            <StyledContainer
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...registerInput(("name"))}
                    required
                    label="Nome"
                    name="name"
                    fullWidth
                />
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
                <Button variant="contained" type={"submit"} >Cadastrar</Button>
                <Link to="/">Já tem uma conta?</Link>
            </StyledContainer>
        </PageContainer>

    )
}

export default Register;