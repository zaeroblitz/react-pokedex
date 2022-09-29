import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const searchPokemonData = createAsyncThunk('searchPokemonData', async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const searchPokemonSlice = createSlice({
  name: 'searchPokemonData',
  initialState,
  reducers: {
    resetSearchPokemon: (state) => {
      state.loading = false;
      state.data = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchPokemonData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchPokemonData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(searchPokemonData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default searchPokemonSlice.reducer;
export const { resetSearchPokemon } = searchPokemonSlice.actions;
