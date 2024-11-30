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

const MerchantInfo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    cnpj: "",
    nomeEmpresa: "",
    representante: "",
    telefone: "",
    email: "",
    senha: "",
  });

  const dataMerchantInfo = async () => {
    const token = localStorage.getItem("token");
    const userIdEmpresa = localStorage.getItem("userIdEmpresa");

    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página");
      return;
    }

    try {
      const response = await api.get(`/empresas/${userIdEmpresa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFormData({
          cnpj: response.data.cnpj || "",
          nomeEmpresa: response.data.nomeEmpresa || "",
          representante: response.data.representante || "",
          telefone: response.data.telefone || "",
          email: response.data.email || "",
          senha: "",
        });
      } else {
        toast.error("Erro ao buscar informações da empresa");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      toast.error("Erro ao carregar os dados. Tente novamente.");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userIdEmpresa = localStorage.getItem("userIdEmpresa");

    if (!token) {
      toast.error("Você precisa estar logado para acessar essa página")
    }

    const perfilAtualizado = {
      cnpj: formData.cnpj,
      nomeEmpresa: formData.nomeEmpresa,
      representante: formData.representante,
      telefone: formData.telefone,
      email: formData.email,
      senha: formData.senha,
    };

    setIsLoading(true);

    try {
      const response = await api.put(`/empresas/atualizar/${userIdEmpresa}`, perfilAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Perfil atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar perfil");
      }

    } catch (error) {
      console.error("Erro na requisição: " + error);
      toast.error("Erro de conexão com o servidor. Tente novamente.");

    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    dataMerchantInfo();
  }, []);

  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor: "#010726",
        borderRadius: "16px",
        color: "#fff",
        maxWidth: "500px",
        margin: "auto",
        marginLeft: "270px"
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
          label="CNPJ"
          variant="outlined"
          disabled
          value={formData.cnpj}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Lock sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            style: { color: "#fff" },
          }}
          InputLabelProps={{ style: { color: "#fff" } }}
          sx={{
            backgroundColor: "#808080",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
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
        />

        <TextField
          label="Nome Empresa"
          variant="outlined"
          value={formData.nomeEmpresa}
          onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })
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
          defaultValue="Nome empresa"
        />

        <TextField
          label="Representante Legal"
          variant="outlined"
          value={formData.representante}
          onChange={(e) => setFormData({ ...formData, representante: e.target.value })
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
          defaultValue="Nome"
        />

        <TextField
          label="Telefone"
          variant="outlined"
          value={(formData.telefone)}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })
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

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target })
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
          defaultValue="humberto@gmail.com"
        />

        <TextField
          label="Senha"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={formData.senha}
          onChange={(e) => setFormData({ ...formData, senha: e.target.value })
          }
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
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#0066CC",
              "&:hover": {
                backgroundColor: "#005BB5",
              },
            }}
          >
            {isLoading ? "Salvando..." : "Salvar alterações"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MerchantInfo;
