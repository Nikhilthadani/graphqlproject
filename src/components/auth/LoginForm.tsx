import { useMutation } from "@apollo/client";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ImBlogger } from "react-icons/im";
import { USER_LOGIN, USER_SIGNUP } from "../../mutations-queries/blogMutations";
import { authStyles } from "../../styles/auth-styles";
import { useDispatch } from "react-redux";
import { AUTH_ACTIONS } from "../../store";
import { useNavigate } from "react-router-dom";
type State = {
  name: string;
  email: string;
  password: string;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<State>({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [addUser, signupResponse] = useMutation(USER_SIGNUP, {
    variables: {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    },
  });
  const [userLogin, loginResponse] = useMutation(USER_LOGIN, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
  });

  const handleChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSignup) {
      await addUser();
      localStorage.setItem("userId", signupResponse.data.addUser.id);
      localStorage.setItem("userName", signupResponse.data.addUser.name);
      dispatch(AUTH_ACTIONS.login());
      navigate("/blogs");
    } else {
      await userLogin().then(() => {
        console.log(loginResponse.data.loginUser.id);
        localStorage.setItem("userId", loginResponse.data.loginUser.id);
        localStorage.setItem("userName", loginResponse.data.loginUser.name);
        dispatch(AUTH_ACTIONS.login());
        navigate("/blogs");
      });
    }
  };
  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.logoTitle}>
        <ImBlogger
          style={{
            background: "red",
            borderRadius: "50%",
            padding: "10px",
          }}
          size="20px"
        />
        <Typography sx={authStyles.logoText}>devBlog</Typography>
      </Box>
      <Box sx={authStyles.formBorder}>
        <Typography sx={authStyles.formTitle}>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {/**@ts-ignore */}
        <form onSubmit={handleSubmit} style={authStyles.form}>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                name="name"
                value={inputs.name}
                onChange={handleChange}
                sx={authStyles.input}
                InputProps={{ style: { borderRadius: "20px" } }}
              />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            sx={authStyles.input}
            InputProps={{ style: { borderRadius: "20px" } }}
          />
          <FormLabel>Password</FormLabel>
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            sx={authStyles.input}
            InputProps={{
              style: { borderRadius: "20px" },
            }}
          />
          <Button type="submit" sx={authStyles.buttons} variant="contained">
            {isSignup ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => setIsSignup((prev) => !prev)}
            //@ts-ignore
            sx={{ ...authStyles.buttons, ...authStyles.switchBtn }}
            variant="text"
          >
            Switch To {isSignup ? "Login" : "Signup"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
