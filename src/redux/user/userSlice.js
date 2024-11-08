import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast } from 'react-toastify';

const initialState = {
    user: JSON.parse(localStorage.getItem('UserData')) || null,
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

// Ação assíncrona para login do usuário
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/login', data);
            console.log(response.data);

            return response.data;
        } catch (error) {
            toast.error('Erro ao fazer login.');
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

// Ação assíncrona para criar do usuário
export const createUser = createAsyncThunk(
    'user/createUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/createUser', data);
            return response.data;
        } catch (error) {
            toast.error('Erro ao criar usuário.');
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.put(`/users/${data.cpf_cnpj}/update`, data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Erro desconhecido';
            toast.error(`Erro ao atualizar o usuário: ${errorMessage}`);
            return rejectWithValue(errorMessage);
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.status = 'idle';
            localStorage.removeItem('UserData');
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('UserData', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
            
                // Atualize o estado `user`, incluindo `termo_atual` explicitamente
                const updatedUser = {
                    ...state.user, // Dados existentes
                    ...action.meta.arg, // Novos dados enviados na requisição
                    termo_atual: action.meta.arg.termo_atual, // Inclua `termo_atual` explicitamente
                };
            
                state.user = updatedUser;
                localStorage.setItem('UserData', JSON.stringify(updatedUser));
            
                toast.success('Dados do usuário atualizados com sucesso!');
            })

            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }

});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
