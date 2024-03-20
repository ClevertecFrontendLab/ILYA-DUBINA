import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type getFeedbacksUsersType = {
    token: string;
    all?: boolean;
};
export const getListTraningUser = createAsyncThunk(
    'users/getListTraningUser',
    async ({ token }: getFeedbacksUsersType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/catalogs/training-list';
            const response = await axios.get(link, {
                headers: { Authorization: `Bearer ${token}`, withCredentials: true },
            });
            const data = await response.data;
            if (response.status >= 200 && response.status < 300) {
                return data;
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);
type setTraningUserType = {
    token: string;
    name: string;
    date: string;
    exercises: object[];
};
export const setTraningUser = createAsyncThunk(
    'users/setTraningUser',
    async ({ token, name, date, exercises }: setTraningUserType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/training';
            const param = { name: name, date: date, exercises: exercises };
            const response = await axios.post(link, param, {
                headers: { Authorization: `Bearer ${token}`, withCredentials: true },
            });
            const data = await response.data;
            if (response.status >= 200 && response.status < 300) {
                return data;
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);
type getAllTraningsUserType = {
    token: string;
};
export const getAllTraningsUser = createAsyncThunk(
    'users/getAllTraningsUser',
    async ({ token }: getAllTraningsUserType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/training';
            const response = await axios.get(link, {
                headers: { Authorization: `Bearer ${token}`, withCredentials: true },
            });
            const data = await response.data;
            if (response.status >= 200 && response.status < 300) {
                return data;
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);
type changeTraningUserType = {
    token: string;
    id: string;
    name: string;
    date: string;
    exercises: object[];
    isImplementation?: boolean;
};
export const changeTraningUser = createAsyncThunk(
    'users/changeTraningUser',
    async (
        { token, id, name, date, exercises, isImplementation }: changeTraningUserType,
        { rejectWithValue },
    ) => {
        try {
            const link = `https://marathon-api.clevertec.ru/training/${id}`;
            const param = { name: name, date: date, exercises: exercises, isImplementation };
            const response = await axios.put(link, param, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true,
                },
            });
            const data = await response.data;
            if (response.status >= 200 && response.status < 300) {
                return data;
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);
type state = {
    status: number;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    openTransferC: boolean;
    ratingReduxF: number;
    messageReduxF: string;
    listTraningData: object[];
    listAllTraningsData: object[];
    openRequestC: boolean;
    openErrorRequestC: boolean;
    lastAndFutureDay: boolean;
    listChangeTraning: { exercises: object[]; name: string; date: string };
};
const CalendarTraningSlice = createSlice({
    name: 'calendarTraningSlice',
    initialState: {
        status: 0,
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        openTransferC: false,
        ratingReduxF: 0,
        messageReduxF: '',
        listTraningData: [],
        listAllTraningsData: [],
        openRequestC: false,
        openErrorRequestC: false,
        lastAndFutureDay: false,
        listChangeTraning: { exercises: [], name: '', date: '' },
    },
    reducers: {
        createTransferC: (state) => {
            state.openTransferC = true;
            state.isError = false;
            state.isSuccess = false;
            return state;
        },
        createRequestC: (state) => {
            state.openRequestC = true;
            state.isError = false;
            state.isSuccess = false;
            return state;
        },
        createErrorRequestC: (state) => {
            state.openErrorRequestC = true;
            return state;
        },
        createLastAndFutureDayC: (state) => {
            state.lastAndFutureDay = true;
            return state;
        },
        clearLastAndFutureDayC: (state) => {
            state.lastAndFutureDay = false;
            return state;
        },
        clearErrorRequestC: (state) => {
            state.openErrorRequestC = false;
            return state;
        },
        clearChangeObject: (state) => {
            state.listChangeTraning = { exercises: [], name: '', date: '' };
            return state;
        },
        clearStateC: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.openTransferC = false;
            state.openRequestC = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListTraningUser.fulfilled, (state: state, { payload }) => {
                state.listTraningData = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getListTraningUser.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getListTraningUser.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(setTraningUser.fulfilled, (state: state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(setTraningUser.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(setTraningUser.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(getAllTraningsUser.fulfilled, (state: state, { payload }) => {
                state.listAllTraningsData = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getAllTraningsUser.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getAllTraningsUser.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(changeTraningUser.fulfilled, (state: state, { payload }) => {
                state.listChangeTraning = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(changeTraningUser.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(changeTraningUser.pending, (state: state) => {
                state.isLoading = true;
            });
    },
});
export const {
    clearStateC,
    createTransferC,
    createRequestC,
    createErrorRequestC,
    clearErrorRequestC,
    clearChangeObject,
    createLastAndFutureDayC,
    clearLastAndFutureDayC,
} = CalendarTraningSlice.actions;
export default CalendarTraningSlice.reducer;
