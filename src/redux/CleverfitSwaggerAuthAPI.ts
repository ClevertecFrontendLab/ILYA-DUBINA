import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type loginUserType = {
    email: string;
    password: string;
    remember?: boolean;
};
type getNewCodeVType = {
    email: string;
    code: string;
};
type setNewCodeVType = {
    password: string;
    twoPassword: string;
};
export const loginUser = createAsyncThunk(
    'users/loginUser',
    async ({ email, password, remember }: loginUserType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/auth/login';
            const params = {
                email: email,
                password: password,
            };
            const response = await axios.post(link, params);
            const data = await response.data;
            console.log(email, password, remember, response);
            if (response.status === 200) {
                remember && localStorage.setItem('token', data.accessToken);
                return data;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (e: any) {
            return rejectWithValue(e.response.message);
        }
    },
);
export const getNewEmailPassword = createAsyncThunk(
    'users/getNewEmailPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/auth/check-email';
            const params = {
                email: email,
            };
            const response = await axios.post(link, params, {
                withCredentials: true,
            });
            const data = await response.data;
            if (response.status === 200) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (e: any) {
            return rejectWithValue(e);
        }
    },
);
export const getNewCodeV = createAsyncThunk(
    'users/getNewCodeV',
    async ({ email, code }: getNewCodeVType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/auth/confirm-email';
            const params = {
                email: email,
                code: code,
            };
            const response = await axios.post(link, params, {
                withCredentials: true,
            });
            const data = await response.data;
            if (response.status === 200 || response.status === 201) {
                return data;
            } else {
                return rejectWithValue(data);
            }
        } catch (e: any) {
            return rejectWithValue(e);
        }
    },
);
export const setNewCodeV = createAsyncThunk(
    'users/setNewCodeV',
    async ({ password, twoPassword }: setNewCodeVType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/auth/change-password';
            const params = {
                password: password,
                confirmPassword: twoPassword,
            };
            const response = await axios.post(link, params, {
                withCredentials: true,
            });
            const data = await response.data;
            if (response.status === 201) {
                return data;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

type state = {
    token: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    errorStatus: number;
    emailV: string;
    openTransferAuth: boolean;
    passwordV: string;
    twoPasswordV: string;
    blockError: boolean;
    code: string;
};
const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        token: '',
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        errorStatus: 0,
        emailV: '',
        openTransferAuth: false,
        passwordV: '',
        twoPasswordV: '',
        blockError: false,
        code: '',
    },
    reducers: {
        saveDataEmail: (state, action) => {
            state.emailV = action.payload.email;
            return state;
        },
        saveCode: (state, action) => {
            state.code = action.payload.code;
            return state;
        },
        saveDataPasswords: (state, action) => {
            state.passwordV = action.payload.password;
            state.twoPasswordV = action.payload.twoPassword;
            return state;
        },
        clearDataEmail: (state) => {
            state.emailV = '';
            return state;
        },
        clearDataPasswords: (state) => {
            state.passwordV = '';
            state.twoPasswordV = '';
            state.code = '';
            return state;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.openTransferAuth = false;
            return state;
        },
        clearBlockError: (state) => {
            state.blockError = false;
            return state;
        },
        setBlockError: (state) => {
            state.blockError = true;
            return state;
        },
        createTransferAuth: (state) => {
            state.openTransferAuth = true;
            state.isError = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state: state, { payload }) => {
                state.token = payload.accessToken;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(loginUser.rejected, (state: state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(loginUser.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(getNewEmailPassword.fulfilled, (state: state, { payload }) => {
                state.token = payload.accessToken;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getNewEmailPassword.rejected, (state: state, { payload }: any) => {
                console.log(payload);
                state.isLoading = false;
                state.isError = true;
                state.errorStatus =
                    payload.response?.data?.statusCode || payload.response?.status || 0;
                state.errorMessage =
                    payload.response?.data?.message || payload.response?.body?.message || ' ';
                state.isSuccess = false;
            })
            .addCase(getNewEmailPassword.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(getNewCodeV.fulfilled, (state: state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getNewCodeV.rejected, (state: state, { payload }: any) => {
                console.log(payload);
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorStatus =
                    payload.response?.data?.statusCode || payload.response?.status || 0;
            })
            .addCase(getNewCodeV.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(setNewCodeV.fulfilled, (state: state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(setNewCodeV.rejected, (state: state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(setNewCodeV.pending, (state: state) => {
                state.isLoading = true;
            });
    },
});
export const {
    clearState,
    saveDataEmail,
    createTransferAuth,
    clearDataEmail,
    setBlockError,
    saveDataPasswords,
    clearDataPasswords,
    saveCode,
    clearBlockError,
} = LoginSlice.actions;
export default LoginSlice.reducer;
