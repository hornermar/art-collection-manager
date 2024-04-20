import { SetStateAction, createContext } from "react";

export const UserContext = createContext({
    userList: [],
    loggedInUser: {
        id: null,
        name: null,
    },
    handlerMap: {
        login: (value: SetStateAction<null>) => {},
        logout: (value: SetStateAction<null>) => {},
    },
});
