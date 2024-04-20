import React from "react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userListDto, setUserListDto] = useState<any>({
        state: "ready",
        data: null,
    });
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        setUserListDto((current: any) => ({ ...current, state: "loading" }));
        fetch(`http://localhost:8000/user/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setUserListDto({ state: "error", error: responseJson.error });
            } else {
                setUserListDto({ state: "ready", data: responseJson });
            }
        });
    }, []);

    const value = {
        userList: userListDto.data || [],
        loggedInUser: loggedInUser
            ? (userListDto.data || []).find(
                  (user: any) => user.id === loggedInUser
              )
            : null,
        handlerMap: {
            login: setLoggedInUser,
            logout: () => setLoggedInUser(null),
        },
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
