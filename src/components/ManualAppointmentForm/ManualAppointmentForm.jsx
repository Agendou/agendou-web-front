import React, { useState } from "react";
import dayjs from "dayjs";
import {
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { useEffect } from "react";
import api from "../../services/api";

export default function ManualAppointments() {
    const [formData, setFormData] = useState({
        servico: [],
        cliente: "",
        dataHoraCorte: dayjs(),
    });


    const [servicos, setServicos] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast.error("Usuário não autenticado.");
                    return;
                }

                //get em /servicos
                const servicosResponse = await api.get("/servicos/listar", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setServicos(servicosResponse.data);

                //get em /usuarios (clientes)
                const clientesResponse = await api.get("/usuarios/listar", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClientes(clientesResponse.data);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (field, value) => {
        console.log("Antes da atualização:", formData);
        console.log(`Campo: ${field}, Valor: ${value}`);
        setFormData((prevState) => {
            const updatedState = {
                ...prevState,
                [field]: value,
            };
            console.log("Depois da atualização:", updatedState);
            return updatedState;
        });
    };

    const handleSubmit = async () => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
            alert("Usuário não autenticado. Faça login novamente.");
            return;
        }

        const agendamento = {
            fkUsuario: formData.cliente,
            fkServicos: formData.servico,
            data: formData.dataHoraCorte.format("YYYY-MM-DDTHH:mm:ss"),
        };

        try {
            const response = await api.post("/agendamentos/cadastrar", agendamento, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                console.log("Agendamento realizado com sucesso:", response.data);
                toast.success("Agendamento realizado com sucesso!");

                setFormData({
                    servico: [],
                    cliente: "",
                    dataHoraCorte: dayjs(),
                });

            } else {
                console.error("Erro ao realizar o agendamento:", response.statusText);
                toast.error("Erro ao realizar o agendamento. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error("Erro na conexão com o servidor. Tente novamente.");
        }
    };

    console.log("Serviços carregados:", servicos);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
                container
                spacing={2}
                style={{ padding: "10px" }}
                justifyContent="center"
                alignItems="flex-start"
            >
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            backgroundColor: "#010726",
                            color: "#FFF",
                            height: "auto",
                            width: "95%",
                            padding: "25px",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Cadastro de Agendamento Manual
                            </Typography>

                            <Box sx={{ display: "flex", gap: "1rem", marginTop: 2 }}>
                                <DateTimePicker
                                    label="Data e Hora do Agendamento"
                                    value={formData.dataHoraCorte}
                                    onChange={(date) => handleInputChange("dataHoraCorte", date)}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            color: "white",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "white",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "white",
                                        },
                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "white",
                                        },
                                    }}
                                />
                            </Box>

                            <FormControl fullWidth margin="normal">
                                <InputLabel
                                    style={{ color: "white" }}
                                    sx={{
                                        display: formData.cliente ? "none" : "block",
                                    }}
                                    shrink={formData.cliente.length > 0}
                                >
                                    Clientes
                                </InputLabel>
                                <Select
                                    value={formData.cliente}
                                    onChange={(e) =>
                                        handleInputChange("cliente", e.target.value)
                                    }
                                    label="Cliente"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "transparent",
                                        borderColor: "white",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "white",
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                backgroundColor: "#010720",
                                                color: "white",
                                            },
                                        },
                                        MenuListProps: {
                                            sx: {
                                                "& .MuiMenuItem-root": {
                                                    color: "white",
                                                },
                                                "& .MuiMenuItem-root:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {clientes.map((usuario) => (
                                        <MenuItem key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            
                            <FormControl fullWidth margin="normal">
                                <InputLabel
                                    style={{ color: "white" }}
                                    shrink={formData.servico.length > 0}
                                >
                                    Serviço
                                </InputLabel>
                                <Select
                                    multiple
                                    value={formData.servico}
                                    onChange={(e) => {
                                        handleInputChange("servico", e.target.value);
                                    }}
                                    label="Serviço"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "transparent",
                                        borderColor: "white",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "white",
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                backgroundColor: "#010720",
                                                color: "white",
                                            },
                                        },
                                        MenuListProps: {
                                            sx: {
                                                "& .MuiMenuItem-root": {
                                                    color: "white",
                                                },
                                                "& .MuiMenuItem-root:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                },
                                            },
                                        },
                                    }}
                                    renderValue={(selected) =>
                                        servicos
                                            .filter((servico) => selected.includes(servico.id))
                                            .map((servico) => servico.nome)
                                            .join(", ")
                                    }
                                >
                                    {servicos.map((servico) => (
                                        <MenuItem key={servico.id} value={servico.id}>
                                            {servico.nome}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            <TextField
                                label={!isFocused ? "Informações Adicionais" : ""}
                                value={formData.infoAdicional}
                                onChange={(e) =>
                                    handleInputChange("infoAdicional", e.target.value)
                                }
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => {
                                    if (formData.infoAdicional === "") {
                                        setIsFocused(false);
                                    }
                                }}
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    style: {
                                        color: "white",
                                        backgroundColor: "#010726",
                                    },
                                }}
                                InputLabelProps={{
                                    style: { color: "white" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white",
                                    },
                                }}
                            />

                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                sx={{ marginTop: 2 }}
                            >
                                <Grid item>
                                    <Button variant="outlined" onClick={() => setFormData({})}>
                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Agendar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}
