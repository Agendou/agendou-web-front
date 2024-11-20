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
                height: "100vh",
            }}
        >
            <ClienteHeader />
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid
                    container
                    spacing={9}
                    sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
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

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <RecentAppointments />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PerfilComerciante;
