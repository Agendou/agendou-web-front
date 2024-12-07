import { useState } from "react";
import { Box, Button, Modal, TextField, Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../services/api";

const DownloadCsvModal = () => {
    const [open, setOpen] = useState(false);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDownloadCsv = async () => {
        setError(null);

        if (!dataInicio || !dataFim) {
            setError("Por favor, preencha ambos os campos de data.");
            return;
        }

        if (dayjs(dataInicio).isAfter(dayjs(dataFim))) {
            setError("A data de início não pode ser posterior à data de fim.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const dataInicioISO = dayjs(dataInicio).startOf("day").toISOString();
            const dataFimISO = dayjs(dataFim).endOf("day").toISOString();

            console.log(dataInicioISO, dataFimISO);

            const response = await api.get(
                `/historico/csv?dataInicio=${dataInicioISO}&dataFim=${dataFimISO}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(`URL gerada: /historico/csv?dataInicio=${dataInicioISO}&dataFim=${dataFimISO}`);

            const blob = new Blob([response.data], { type: "text/csv" });
            console.log("Blob gerado:", blob);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "historico.csv";
            link.click();

            setLoading(false);
            handleClose();
        } catch (error) {
            setLoading(false);
            console.error("Erro ao gerar CSV:", error.response?.data || error.message);
            toast.error("Erro ao gerar CSV:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Baixar Histórico
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 4,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                        margin: "auto",
                        marginTop: "10vh",
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Selecionar Período
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <DatePicker
                                    label="Data de Início"
                                    value={dataInicio}
                                    onChange={(newValue) => setDataInicio(newValue)}
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                />
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    label="Data de Fim"
                                    value={dataFim}
                                    onChange={(newValue) => setDataFim(newValue)}
                                    inputFormat="DD/MM/YYYY"
                                    renderInput={(props) => <TextField {...props} fullWidth />}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>

                    {error && (
                        <Typography color="error" variant="body2" mt={2}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            sx={{ marginRight: 2 }}
                        >
                            Fechar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDownloadCsv}
                            disabled={loading}
                        >
                            {loading ? "Gerando..." : "Baixar CSV"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default DownloadCsvModal;
