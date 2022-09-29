import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const fetchPokemonAbility = createAsyncThunk('loadPokemonAbility', async (ability) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const loadPokemonAbilitySlice = createSlice({
  name: 'loadPokemonAbility',
  initialState,
  reducers: {
    resetPokemonAbility: (state) => {
      state.loading = false;
      state.data = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonAbility.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonAbility.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.data.findIndex((element) => element.id === action.payload.id);

      if (index === -1) {
        state.data.push(action.payload);
      }
    });
    builder.addCase(fetchPokemonAbility.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default loadPokemonAbilitySlice.reducer;
export const { resetPokemonAbility } = loadPokemonAbilitySlice.actions;
