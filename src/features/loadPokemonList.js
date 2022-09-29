import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const loadPokemonList = createAsyncThunk('loadPokemonList', async (offset = 0) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    return response.data.results;
  } catch (err) {
    return err.message;
  }
});

const LoadPokemonListSlice = createSlice({
  name: 'loadPokemonList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadPokemonList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPokemonList.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.forEach((element) => {
        if (state.data.indexOf(element.name) === -1) {
          state.data.push(element.name);
        }
      });
    });
    builder.addCase(loadPokemonList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default LoadPokemonListSlice.reducer;
