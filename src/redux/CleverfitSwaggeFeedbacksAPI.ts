import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type getFeedbacksUsersType = {
    feedbackToken: string;
    all?: boolean;
};
type setFeedbackUserType = {
    feedbackToken: string;
    ratingUser: number;
    messageUser: string;
};
export const getFeedbacksUsers = createAsyncThunk(
    'users/getFeedbacksUsers',
    async ({ feedbackToken, all }: getFeedbacksUsersType, { rejectWithValue }) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/feedback';
            const response: { status: number; data: object[] } = await axios.get(link, {
                headers: { Authorization: `Bearer ${feedbackToken}`, withCredentials: true },
            });
            const data: any = await response.data;
            const newData = [...data].sort((a, b) => {
                const keyA: number = new Date(a.createdAt).valueOf();
                const keyB: number = new Date(b.createdAt).valueOf();
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            const result = !all ? newData.slice(0, 4) : newData;
            if (response.status === 200) {
                return result;
            } else {
                return rejectWithValue('Error: Something went wrong.');
            }
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);
export const setFeedbackUser = createAsyncThunk(
    'users/setFeedbackUser',
    async (
        { feedbackToken, ratingUser, messageUser }: setFeedbackUserType,
        { rejectWithValue },
    ) => {
        try {
            const link = 'https://marathon-api.clevertec.ru/feedback';
            const params = {
                rating: ratingUser,
                message: messageUser,
            };
            const response: { status: number; data: object[] } = await axios.post(link, params, {
                headers: { Authorization: `Bearer ${feedbackToken}`, withCredentials: true },
            });
            if (response.status === 200 || response.status === 201) {
                return response.status;
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
    openTransferF: boolean;
    ratingReduxF: number;
    messageReduxF: string;
    feedbacksData: object[];
};
const FeedbacksSlice = createSlice({
    name: 'signupSlice',
    initialState: {
        status: 0,
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        openTransferF: false,
        ratingReduxF: 0,
        messageReduxF: '',
        feedbacksData: [],
    },
    reducers: {
        saveDataModal: (state, action) => {
            state.ratingReduxF = action.payload.ratingF;
            state.messageReduxF = action.payload.messageF;
            return state;
        },
        createTransferF: (state) => {
            state.openTransferF = true;
            state.isError = false;
            state.isSuccess = false;
            return state;
        },
        clearDataModal: (state) => {
            state.ratingReduxF = 0;
            state.messageReduxF = '';
            return state;
        },
        clearStateF: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.openTransferF = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacksUsers.fulfilled, (state: state, { payload }) => {
                state.feedbacksData = payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(getFeedbacksUsers.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getFeedbacksUsers.pending, (state: state) => {
                state.isLoading = true;
            })
            .addCase(setFeedbackUser.fulfilled, (state: state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(setFeedbackUser.rejected, (state: state, { payload }: any) => {
                state.status = payload.response?.data?.statusCode || payload.response?.status || 0;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(setFeedbackUser.pending, (state: state) => {
                state.isLoading = true;
            });
    },
});
export const { clearStateF, createTransferF, clearDataModal, saveDataModal } =
    FeedbacksSlice.actions;
export default FeedbacksSlice.reducer;
