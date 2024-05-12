import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./component/Layout";
import { Dashboard } from "./component/Dashboard";
import { UserProvider } from "./context/UserProvider";
import { CollectionListProvider } from "./context/CollectionListProvider";
import CollectionProvider from "./context/CollectionProvider";
import { Collection } from "./component/Collection/Collection";
import ArtworkProvider from "./context/ArtworkProvider";
import { Artwork } from "./component/Artwork";
import { ArtworkListProvider } from "./context/ArtworkListProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#e60000",
        },
        secondary: {
            main: "#ffffff",
        },
    },
});

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <UserProvider>
                    <CollectionListProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Dashboard />} />

                                    <Route
                                        path="collection"
                                        element={
                                            <CollectionProvider>
                                                <ArtworkListProvider>
                                                    <Collection />
                                                </ArtworkListProvider>
                                            </CollectionProvider>
                                        }
                                    />
                                    <Route
                                        path="artwork"
                                        element={
                                            <ArtworkListProvider>
                                                <ArtworkProvider>
                                                    <Artwork />
                                                </ArtworkProvider>
                                            </ArtworkListProvider>
                                        }
                                    />
                                    <Route path="*" element={"not found"} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </CollectionListProvider>
                </UserProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
