import React from "react";
import { Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const getStatusStyle = (status) => {
  switch (status) {
    case "Concluído":
      return { backgroundColor: "green", color: "white", padding: "0.2rem 0.5rem", borderRadius: "12px" };
    case "Cancelado":
      return { backgroundColor: "red", color: "white", padding: "0.2rem 0.5rem", borderRadius: "12px" };
    case "Remarcado":
      return { backgroundColor: "yellow", color: "black", padding: "0.2rem 0.5rem", borderRadius: "12px" };
    default:
      return {};
  }
};

export default function TodayAppointments() {
  return (
    <Card
      style={{
        color: "black",
        backgroundColor: "#010726",
        width: "100%",
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
          Últimos agendamentos
        </Typography>

        <TableContainer component={Paper} style={{ backgroundColor: "#010726" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Profissional</TableCell>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Concluído")}>Concluído</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Remarcado")}>Remarcado</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Concluído")}>Concluído</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Cancelado")}>Cancelado</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Cancelado")}>Cancelado</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Concluído")}>Concluído</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Cancelado")}>Cancelado</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ textAlign: "center", color: "#FFF" }}>Humberto</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <span style={getStatusStyle("Concluído")}>Concluído</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
