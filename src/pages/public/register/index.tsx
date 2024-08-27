import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, styled, TextField} from "@mui/material";
import PageContainer from "../../../components/pageContainer";
import {Link} from "react-router-dom";

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
    const {register, handleSubmit} = useForm<TRegister>()

    const onSubmit: SubmitHandler<TRegister> = (data) => {
        console.log(data);
    }

    return(
        <PageContainer>
            <StyledContainer
                as="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    {...register(("name"))}
                    required
                    label="Nome"
                    name="name"
                    fullWidth
                />
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
                <Button variant="contained" type={"submit"} >Cadastrar</Button>
                <Link to="/">Já tem uma conta?</Link>
            </StyledContainer>
        </PageContainer>

    )
}

export default Register;