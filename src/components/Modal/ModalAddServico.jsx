import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import api from "../../services/api";
import { toast } from "react-toastify";

const EditarServicos = ({ open, onClose }) => {
    const token = localStorage.getItem("token");
    const [servicos, setServicos] = useState([]);
    const [novoServico, setNovoServico] = useState({
        nome: "",
        preco: "",
        descricao: "",
    });

    // Função para buscar serviços da API
    const carregarServicos = async () => {
        try {
            const servicosResponse = await api.get("/api/servicos/listar", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServicos(servicosResponse.data);
        } catch (error) {
            toast.error(
                "Não foi possível exibir os serviços da sua empresa: " +
                (error.response?.data || error.message)
            );
        }
    };

    // Função para adicionar um novo serviço via API
    const adicionarServico = async () => {
        if (!novoServico.nome || !novoServico.preco || !novoServico.descricao) {
            toast.error("Por favor, preencha todos os campos!");
            return;
        }

        try {
            const response = await api.post("/api/servicos/cadastrar", novoServico, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            );

            if (response.status === 201) {
                toast.success("Serviço cadastrado com sucesso!");
                setNovoServico({ nome: "", preco: "", descricao: "" });
                carregarServicos();
            } else {
                toast.error("Erro ao cadastrar serviço. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar serviço:", error);
            toast.error(
                "Erro ao cadastrar serviço: " +
                (error.response?.data || error.message)
            );
        }
    };

    // Função para deletar um serviço via API
    const deletarServico = async (id) => {
        try {
            await api.delete(`/api/servicos/deletar/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            carregarServicos();
        } catch (error) {
            toast.error("Erro ao excluir serviço. Tente novamente.");
        }
    };

    // Carregar serviços ao abrir o modal
    useEffect(() => {
        if (open) {
            carregarServicos();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    mb={2}
                    sx={{
                        textAlign: "center",
                        color: "#0066CC",
                    }}
                >
                    Gerenciar Serviços
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} mb={2}>
                    <TextField
                        fullWidth
                        label="Nome do Serviço"
                        value={novoServico.nome}
                        onChange={(e) =>
                            setNovoServico((prev) => ({
                                ...prev,
                                nome: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        fullWidth
                        label="Preço do Serviço"
                        type="number"
                        value={novoServico.preco}
                        onChange={(e) =>
                            setNovoServico((prev) => ({
                                ...prev,
                                preco: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        multiline
                        rows={3}
                        value={novoServico.descricao}
                        onChange={(e) =>
                            setNovoServico((prev) => ({
                                ...prev,
                                descricao: e.target.value,
                            }))
                        }
                    />
                    <Button
                        variant="contained"
                        onClick={adicionarServico}
                        sx={{
                            backgroundColor: "#0066CC",
                            "&:hover": { backgroundColor: "#005BB5" },
                        }}
                    >
                        <Add /> Adicionar Serviço
                    </Button>
                </Box>

                <List>
                    {servicos.map((servico) => (
                        <ListItem
                            key={servico.id}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() => deletarServico(servico.id)}
                                >
                                    <Delete />
                                </IconButton>
                            }
                        >
                            {servico.nome} - R$ {servico.preco.toFixed(2)}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default EditarServicos;