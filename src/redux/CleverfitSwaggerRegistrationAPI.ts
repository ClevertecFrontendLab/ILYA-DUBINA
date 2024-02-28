import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type singupDataType = {
    email: string;
    password: string;
};
export const signupUser = createAsyncThunk(
    'users/signupUser',
    async ({ email, password }: singupDataType, { rejectWithValue }) => {
        console.log(email, password);
        try {
            const link = 'https://marathon-api.clevertec.ru/auth/registration';
            const params = {
                email: email,
                password: password,
            };
            const response = await axios.post(link, params, {
                withCredentials: true,
            });
            const statusNumber: string = response.status + '';
            if (statusNumber === '201') {
                return { status: statusNumber };
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

type state = {
    status: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    openTransfer: boolean;
    emailS: string;
    passwordS: string;
};
const SignupSlice = createSlice({
    name: 'signupSlice',
    initialState: {
        status: '',
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        openTransfer: false,
        emailS: '',
        passwordS: '',
    },
    reducers: {
        saveDataPost: (state, action) => {
            state.emailS = action.payload.email;
            state.passwordS = action.payload.password;
            return state;
        },
        createTransfer: (state) => {
            state.openTransfer = true;
            state.isError = false;
            return state;
        },
        clearData: (state) => {
            state.emailS = '';
            state.passwordS = '';
            state.status = '';
            return state;
        },
        clearStateS: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.openTransfer = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state: state, { payload }) => {
                state.status = payload.status;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(signupUser.rejected, (state: state, { payload }: any) => {
                state.status = `${payload.response.status}`;
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(signupUser.pending, (state: state) => {
                state.isLoading = true;
            });
    },
});
export const { clearStateS, createTransfer, saveDataPost, clearData } = SignupSlice.actions;
export default SignupSlice.reducer;
