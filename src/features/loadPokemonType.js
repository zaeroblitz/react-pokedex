/* eslint-disable no-await-in-loop */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const fetchPokemonTypeData = createAsyncThunk('loadPokemonType', async (types) => {
  try {
    const typeEffectiveness = {};

    for (let i = 0; i < types.length; i += 1) {
      const type = types[i];

      const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const dmgRelations = Object.keys(data.damage_relations);

      dmgRelations.forEach((relation) => {
        const typeRelations = data.damage_relations[relation].map((item) => item.name);

        if (typeEffectiveness[relation]) {
          typeEffectiveness[relation] = [...typeEffectiveness[relation], ...typeRelations];
        } else {
          typeEffectiveness[relation] = typeRelations;
        }
      });
    }

    return {
      types,
      effects: typeEffectiveness,
    };
  } catch (err) {
    return err.message;
  }
});

const pokemonTypeDataSlice = createSlice({
  name: 'loadPokemonType',
  initialState,
  reducers: {
    resetPokemonTypeData: (state) => {
      state.loading = false;
      state.data = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonTypeData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonTypeData.fulfilled, (state, action) => {
      state.loading = false;

      const { types, effects } = action.payload;
      const effectsKey = Object.keys(effects);
      const filteredEffects = {};

      for (let i = 0; i < effectsKey.length; i += 1) {
        /* console.log(effectsKey[i]);
        console.log(effects[effectsKey[i]]);
        console.log(''); */

        filteredEffects[effectsKey[i]] = effects[effectsKey[i]].filter((item) => item !== types[0] && item !== types[1]);
      }

      state.data = effects;
    });
    builder.addCase(fetchPokemonTypeData.rejected, (state) => {
      state.loading = false;
      state.data = [];
      state.err = state.error.message;
    });
  },
});

export default pokemonTypeDataSlice.reducer;
export const { resetPokemonTypeData } = pokemonTypeDataSlice.actions;
