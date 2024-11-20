import React from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Edit } from "@mui/icons-material";

const ClientInfo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor: "#010726",
        borderRadius: "16px",
        color: "#fff",
        minWidth: "100%",
        margin: "auto",
      }}
      elevation={3}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Informações Pessoais{" "}
        <IconButton size="small" sx={{ color: "#fff" }}>
          <Edit />
        </IconButton>
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >

        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF",
              },
              "&:hover fieldset": {
                borderColor: "#CCC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC",
              },
            },
          }}
          defaultValue="Henrique"
        />

        <TextField
          label="Telefone"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF",
              },
              "&:hover fieldset": {
                borderColor: "#CCC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC",
              },
            },
          }}
          defaultValue="(11) 93025-9645"
        />

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF",
              },
              "&:hover fieldset": {
                borderColor: "#CCC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC",
              },
            },
          }}
          defaultValue="henrique@gmail.com"
        />

        <TextField
          label="Senha"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          InputLabelProps={{ style: { color: "#ccc" } }}
          sx={{
            borderRadius: 2,
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderColor: "#FFF",
              "& fieldset": {
                borderColor: "#FFF",
              },
              "&:hover fieldset": {
                borderColor: "#CCC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0066CC",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <Visibility sx={{ color: "#fff" }} />
                  ) : (
                    <VisibilityOff sx={{ color: "#fff" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#ccc",
              "&:hover": {
                borderColor: "#fff",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0066CC",
              "&:hover": {
                backgroundColor: "#005BB5",
              },
            }}
          >
            Salvar alterações
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ClientInfo;
