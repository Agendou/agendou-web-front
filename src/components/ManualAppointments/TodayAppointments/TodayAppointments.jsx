import React from "react";
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function TodayAppointments() {
  return (
    <Card
      style={{
        marginTop: "20px",
        color: "black",
        backgroundColor: "#010726",
        width: "125%",
        marginLeft: "-40px",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            color: "#FFF",
            marginBottom: "1rem",
          }}
        >
          Agenda do Dia
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Horário</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>06:00</TableCell>
                <TableCell style={{ textAlign: "center" }}>Agendado</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>06:15</TableCell>
                <TableCell style={{ textAlign: "center" }}>Cancelado</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>06:30</TableCell>
                <TableCell style={{ textAlign: "center" }}>Concluído</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
