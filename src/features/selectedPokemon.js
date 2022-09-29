import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemon: '',
};

const SelectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
    resetSelectedPokemon: (state) => {
      state.pokemon = '';
    },
  },
});

export default SelectedPokemonSlice.reducer;
export const { setSelectedPokemon, resetSelectedPokemon } = SelectedPokemonSlice.actions;
