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
import Calendar from "../CalendarCard/CalendarCard";
import TodayAppointments from "../TodayAppointments/TodayAppointments";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function ManualAppointments() {
  const [value, setValue] = useState(dayjs());
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: null,
    hora: null,
    infoAdicional: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Dados do agendamento:", formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={2}
        style={{ padding: "10px", marginLeft: "-40px" }}
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
                  style={{ color: "white" }}
                  sx={{
                    display: formData.servico ? "none" : "block",
                  }}
                  shrink={false}
                >
                  Serviço
                </InputLabel>
                <Select
                  value={formData.servico}
                  onChange={(e) => handleInputChange("servico", e.target.value)}
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
                >
                  <MenuItem value="luzes">Luzes</MenuItem>
                  <MenuItem value="degrade">Degradê</MenuItem>
                  <MenuItem value="corte">Social</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: "1rem", marginTop: 2 }}>
                <DateTimePicker
                  label="Data do agendamento"
                  value={formData.data}
                  onChange={(date) => handleInputChange("data", date)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
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
