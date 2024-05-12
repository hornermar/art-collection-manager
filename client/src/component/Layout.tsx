import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Container, Stack } from "@mui/material";

export function Layout() {
    return (
        <Stack sx={{ minHeight: "100vh" }} flexDirection="column">
            <NavBar />

            <Container sx={{ flexGrow: 1, marginTop: "30px" }}>
                <Outlet />
            </Container>

            <Stack
                flexDirection="row-reverse"
                alignItems="center"
                sx={{
                    backgroundColor: "#e60000",
                    color: "#ffffff",
                    marginTop: "30px",
                    padding: "5px 10px",
                }}
            >
                © Markéta Hájková
            </Stack>
        </Stack>
    );
}
