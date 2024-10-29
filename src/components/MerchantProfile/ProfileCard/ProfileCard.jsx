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
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import Calendar from "../CalendarCard/CalendarCard";
import TodayAppointments from "../TodayAppointments/TodayAppointments";

export default function ProfileCard() {
  const [value, setValue] = useState(dayjs());
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: null,
    hora: null,
    infoAdicional: "",
  });

  // Estado para controlar o foco do campo de informações adicionais
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Dados do agendamento:", formData);
    // Lógica para enviar os dados ao backend
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={2}
        style={{ padding: "10px", marginLeft: "-40px"}}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} md={8} style={{ margin: "0 auto" }}>
          <Card
            sx={{
              backgroundColor: "#010726",
              color: "#FFF",
              height: "auto",
              width: "100%",
              padding: "20px",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cadastro de Agendamento Manual
              </Typography>

              <TextField
                label="Nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFF",
                    },
                  },
                }}
              />

              <TextField
                label="Telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white" },
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FFF",
                    },
                  },
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel
                  style={{ color: "black" }}
                  sx={{
                    display: formData.servico ? "none" : "block", // Esconde a label se um serviço estiver selecionado
                  }}
                  shrink={false} // Faz a label não encolher
                >
                  Serviço
                </InputLabel>
                <Select
                  value={formData.servico}
                  onChange={(e) => handleInputChange("servico", e.target.value)}
                  label="Serviço"
                  sx={{
                    color: "black", // Exibe a opção selecionada em preto
                    backgroundColor: "#fff",
                    "& .MuiSvgIcon-root": {
                      color: "black", // Ícone da lista (seta) em branco
                    },
                  }}
                >
                  <MenuItem value="luzes">Luzes</MenuItem>
                  <MenuItem value="degrade">Degradê</MenuItem>
                  <MenuItem value="corte">Social</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: "1rem", marginTop: 2 }}>
                <DatePicker
                  label="Data do Agendamento"
                  value={formData.data}
                  onChange={(date) => handleInputChange("data", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputLabelProps={{
                        sx: {
                          color: "white", // Cor da label
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Cor da borda
                          },
                          "&:hover fieldset": {
                            borderColor: "white", // Borda ao passar o mouse
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Borda ao focar
                          },
                          color: "white", // Cor do texto
                          "& .MuiInputBase-input": {
                            color: "white", // Cor do texto da input
                          },
                        },
                      }}
                    />
                  )}
                />

                <TimePicker
                  label="Hora do Agendamento"
                  value={formData.hora}
                  onChange={(time) => handleInputChange("hora", time)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputLabelProps={{
                        sx: {
                          color: "white", // Cor da label
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white", // Cor da borda
                          },
                          "&:hover fieldset": {
                            borderColor: "white", // Borda ao passar o mouse
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white", // Borda ao focar
                          },
                          color: "white", // Cor do texto
                          "& .MuiInputBase-input": {
                            color: "white", // Cor do texto da input
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <TextField
                label={!isFocused ? "Informações Adicionais" : ""}
                value={formData.infoAdicional}
                onChange={(e) =>
                  handleInputChange("infoAdicional", e.target.value)
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  // Para mostrar o rótulo novamente se o campo estiver vazio
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
                    color: "black",
                    backgroundColor: "white",
                  },
                }}
                InputLabelProps={{
                  style: { color: "black" },
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
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={10} md={3} style={{ margin: "0 auto" }}>
          <Card
            style={{
              height: "325px",
              color: "black",
              backgroundColor: "#010726",
              width: "125%",
              marginLeft: "-40px",
            }}
          >
            <CardContent>
              <Calendar value={value} onChange={setValue} />
            </CardContent>
          </Card>

          <TodayAppointments />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
