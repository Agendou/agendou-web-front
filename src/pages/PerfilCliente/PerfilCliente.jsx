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
                    flexDirection: "column",
                    flexGrow: 1,
                    padding: (theme) => theme.spacing(3),
                    gap: (theme) => theme.spacing(3),
                }}
            >
                <Grid
                    container
                    spacing={4}
                    sx={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        alignItems: "stretch",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: (theme) => theme.spacing(2),
                        }}
                    >
                        <ClientInfo />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: (theme) => theme.spacing(2),
                            padding: (theme) => theme.spacing(2),
                            backgroundColor: (theme) => theme.palette.background.paper,
                            borderRadius: (theme) => theme.shape.borderRadius,
                            boxShadow: (theme) => theme.shadows[1],
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
