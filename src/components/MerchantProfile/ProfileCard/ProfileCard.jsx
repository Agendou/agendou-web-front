import React from "react";
import dayjs from "dayjs";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
} from "@mui/material";
import Calendar from '../CalendarCard/CalendarCard'; // Importamos o novo componente
import TodayAppointments from "../TodayAppointments/TodayAppointments";

export default function ProfileCard() {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "20px", height: "100vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={10} md={8} style={{ margin: "0 auto" }}>
        <Card
          sx={{
            backgroundColor: "#010726",
            color: "#FFF",
            height: "500px",
            width: "100%",
          }}
        >
          <CardContent>
            <Typography variant="h6">José do Carmo Pereira</Typography>
            <Typography>Email: jose@gmail.com</Typography>
            <Typography>Telefone: (11) 96060-0000</Typography>

            <Typography variant="h6">Serviços</Typography>
            <Button variant="contained">Luzes</Button>
            <Button variant="contained">Degradê</Button>

            <TextField
              label="Informações Adicionais"
              multiline
              rows={6}
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  color: "black",
                  backgroundColor: "white",
                  height: "240px",
                },
              }}
              InputLabelProps={{
                style: { color: "black" },
              }}
              style={{ marginTop: "20px" }}
            />

            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button variant="outlined">Cancelar</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
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
            height: "310px",
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

        {/* Utilize o novo componente ScheduleCard */}
        <TodayAppointments />
      </Grid>
    </Grid>
  );
}
