import { Box, Grid } from "@mui/material";
import ClienteHeader from "../../components/ClienteHeader/ClientHeader";
import ClientInfo from "../../components/ClientInfo/ClientInfo";
import RecentAppointments from "../../components/RecentAppointments/RecentAppointments";

const PerfilComerciante = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                minHeight: "100vh",
                boxSizing: "border-box",
            }}
        >
            <ClienteHeader />
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: {
                        xs: 2, // Margem superior menor em telas pequenas.
                        sm: 4, // Margem maior em telas médias.
                        md: 6, // Margem ainda maior para telas grandes.
                    },
                }}
            >
                <Grid
                    container
                    spacing={3} // Espaçamento entre os grids.
                    sx={{
                        justifyContent: "space-around",
                        alignItems: "flex-start", // Grids alinhados ao topo.
                        width: "100%",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <ClientInfo />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PerfilComerciante;
