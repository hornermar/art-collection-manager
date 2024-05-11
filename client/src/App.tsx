import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./component/Layout";
import { Dashboard } from "./component/Dashboard";
import { UserProvider } from "./context/UserProvider";
import { CollectionListProvider } from "./context/CollectionListProvider";
import CollectionProvider from "./context/CollectionProvider";
import { Collection } from "./component/Collection/Collection";
import ArtworkProvider from "./context/ArtworkProvider";
import { Artwork } from "./component/Artwork";
import "./App.css";
import { ArtworkListProvider } from "./context/ArtworkListProvider";

function App() {
    return (
        <div>
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
        </div>
    );
}

export default App;
