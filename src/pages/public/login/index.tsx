import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";

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
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}

                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="1em"
                margin="auto"
                padding="2em"
                maxWidth="400px"
                border="1px solid black"
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
                <Button variant="contained" type={"submit"} >Entra</Button>
            </Box>
    )
}

export default Login;