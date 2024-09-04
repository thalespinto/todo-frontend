import {SubmitHandler, useForm} from "react-hook-form";
import {Box, styled, TextField} from "@mui/material";
import PageContainer from "../../../components/pageContainer";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../services/auth/AuthProvider.tsx";
import {useContext, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {ToastType, useToast} from "../../../hooks/useToast.tsx";

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


type TRegister = {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const { showToast } = useToast()
    const navigate = useNavigate()

    const [registering, setRegistering] = useState(false);

    const { register: registerInput, handleSubmit } = useForm<TRegister>()
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { register } = authContext;

    const onSubmit: SubmitHandler<TRegister> = async (data) => {
        setRegistering(true)
        register(data).then(() => {
            showToast({
                title: "Registro efetuado!",
                type: ToastType.SUCCESS
            })
            navigate("/");
        }).catch(() => {
            showToast({
                title: "Erro ao fazer registro",
                type: ToastType.ERROR
            })
        }).finally(()=> setRegistering(false))


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
                <LoadingButton
                    loading={registering}
                    variant="contained"
                    type={"submit"}
                >
                    Cadastrar
                </LoadingButton>
                <Link to="/">Já tem uma conta?</Link>
            </StyledContainer>
        </PageContainer>

    )
}

export default Register;