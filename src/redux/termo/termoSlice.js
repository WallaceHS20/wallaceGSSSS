import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

// Ação assíncrona para buscar os termos mais recentes
export const fetchLatestTerm = createAsyncThunk(
    'terms/fetchLatestTerm',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/terms/ultimoTermo');
            return response.data;
        } catch (error) {
            toast.error('Erro ao buscar os termos.');
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const initialState = {
    latestTerm: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLatestTerm.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLatestTerm.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.latestTerm = action.payload;
            })
            .addCase(fetchLatestTerm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default termsSlice.reducer;
export const { } = termsSlice.actions;