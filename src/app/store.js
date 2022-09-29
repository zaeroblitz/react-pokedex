import { configureStore } from '@reduxjs/toolkit';
import activeMenuReducer from '../features/activeMenu';
import loadPokemonAbilityReducer from '../features/loadPokemonAbility';
import loadPokemonDataReducer from '../features/loadPokemonData';
import loadPokemonListReducer from '../features/loadPokemonList';
import loadPokemonTypeReducer from '../features/loadPokemonType';
import searchPokemonReducer from '../features/searchPokemonData';
import selectedPokemonReducer from '../features/selectedPokemon';

export default configureStore({
  reducer: {
    activeMenu: activeMenuReducer,
    pokemonList: loadPokemonListReducer,
    selectedPokemon: selectedPokemonReducer,
    searchPokemon: searchPokemonReducer,
    loadPokemon: loadPokemonDataReducer,
    loadPokemonAbility: loadPokemonAbilityReducer,
    loadPokemonTypeEffect: loadPokemonTypeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
