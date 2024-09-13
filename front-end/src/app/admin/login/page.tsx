"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Button } from "@mui/material";
import { fetchDataLogin } from "@/services/admin";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const access = async () => {
    if (password === "" || login === "") {
      setError(null);

      setIsEmpty(true);
      setTimeout(() => setIsEmpty(false), 2000);
      return;
    }
    try {
      setIsEmpty(false);
      await fetchDataLogin(login, password);
      setError("Login feito com sucesso!");
      setTimeout(() => {
        setError("");
        router.push("/admin");
      }, 2000);
    } catch (error: any) {
      setError(error);
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "50vh",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <TextField
        label="Login"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        onChange={(e) => setLogin(e.target.value)}
      />

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        variant="contained"
        style={{ padding: "10px 105px", width: "32ch" }}
        onClick={access}
      >
        Enter
      </Button>
      {isEmpty && (
        <Alert variant="filled" severity="error" style={{ marginTop: 10 }}>
          Algum campo vazio!
        </Alert>
      )}
      {error && (
        <Alert
          variant="filled"
          severity={error === "Login feito com sucesso!" ? "success" : "error"}
          style={{ marginTop: 10 }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
}
