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
import { toast } from "react-toastify";
import api from "../../services/api";
import { useEffect } from 'react';
import DeleteAccountModal from "../Modal/ModalValidacao";

const ClientInfo = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const getClientData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página");
      return;
    }

    try {
      const response = await api.get(`/usuarios/listar/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFormData({
          nome: response.data.nome || "",
          telefone: response.data.telefone || "",
          email: response.data.email || "",
          senha: "",
        });
      } else {
        toast.error("Erro ao buscar informações do cliente");
      }
    } catch (error) {
      console.error("Erro ao buscar informações: ", error);
      toast.error("Erro ao carregar os dados. Tente novamente.");
    }
  };

  useEffect(() => {
    getClientData();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página");
      return;
    }

    const perfilAtualizado = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      senha: formData.senha,
    };

    setIsLoading(true);

    try {
      const response = await api.put(`/usuarios/atualizar/${userId}`, perfilAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.status === 200) {
        toast.success("Perfil atualizado com sucesso!");
        getClientData();
      } else {
        toast.error("Erro ao atualizar perfil");
      }

    } catch (error) {
      console.log("Erro na requisição" + error);
      toast.error("Erro de conexão com o servidor. Tente novamente.");
    }

  }

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      console.log("Deletando conta:", userId);

      const response = await api.delete(`/usuarios/deletar/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Conta cancelada! Sentiremos sua falta :(");

      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);

    } catch (error) {
      console.error("Erro ao excluir o agendamento:", error);
      toast.error("Erro ao excluir agendamento. Tente novamente.");
    }
  };

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

      <DeleteAccountModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

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
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
          value={formData.telefone}
          onChange={(e) =>
            setFormData({ ...formData, telefone: e.target.value })
          }
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

        <TextField
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              disable={isLoading}
              sx={{
                backgroundColor: "#0066CC",
                "&:hover": {
                  backgroundColor: "#005BB5",
                },
              }}
            >
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleOpenModal}
              sx={{
                color: "#fff",
                backgroundColor: "#7d1414",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderColor: "#ccc",
                "&:hover": {
                  borderColor: "#fff",
                },
              }}
            >
              Deletar conta
            </Button>

          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ClientInfo;
