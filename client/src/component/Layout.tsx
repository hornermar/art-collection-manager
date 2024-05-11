import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Container, Stack } from "@mui/material";

export function Layout() {
    return (
        <Stack sx={{ minHeight: "100vh" }} flexDirection="column">
            <NavBar />

            <Container sx={{ flexGrow: 1, marginTop: "50px" }}>
                <Outlet />
            </Container>

            <Stack>© Markéta Hájek</Stack>
        </Stack>
    );
}
