import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const fetchPokemonData = createAsyncThunk('loadPokemonData', async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const loadPokemonSlice = createSlice({
  name: 'loadPokemonData',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPokemonData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default loadPokemonSlice.reducer;
