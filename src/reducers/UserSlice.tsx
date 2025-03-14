import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

interface User {
    email: string;
    hashedPassword: string;
    role: string;
}

interface AuthState {
    users: User[];
    currentUser: User | null;
}

const initialState: AuthState = {
    users: [
        {
            email: "rashi@gmail.com",
            hashedPassword: bcrypt.hashSync("1234567890", 10),
            role: "Manager",
        },
    ],
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<{ email: string; password: string; role: string }>) {
            const { email, password, role } = action.payload;
            const hashedPassword = bcrypt.hashSync(password, 10); // Hashing the new user's password
            state.users.push({ email, hashedPassword, role });
        },
        loginUser(state, action: PayloadAction<{ email: string; password: string }>) {
            const { email, password } = action.payload;
            const user = state.users.find((user) => user.email === email);

            if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
                return { ...state };
            }

            state.currentUser = user;
        },
        logoutUser(state) {
            state.currentUser = null;

        }

    },
});

export const { addUser, loginUser,logoutUser } = userSlice.actions;
export default userSlice.reducer;
