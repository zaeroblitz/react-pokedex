import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokeApi = createApi({
  reducerPath: 'pokeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    //* Get 10 pokemon list
    getInitialPokemonList: builder.query({
      query: (offset = 0) => `pokemon?limit=10&offset=${offset}`,
    }),

    //* Get pokemon data
    getPokemonData: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const {
  useGetInitialPokemonListQuery,
  useGetPokemonDataQuery,
} = pokeApi;
