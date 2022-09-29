import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvolutionItem = ({ name }) => {
  const [pokemonData, setPokemonData] = useState({});

  const loadPokemonData = () => {
    if (name) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(({ data }) => {
          setPokemonData(data);
        });
    }
  };

  useEffect(() => {
    loadPokemonData();
  }, [name]);

  return (
    <div className="flex flex-col justify-center items-center">
      {Object.keys(pokemonData).length !== 0 && (
        <>
          <img src={pokemonData.sprites.other.home.front_default} alt={name} className="w-20 mb-2" />
          <p className="capitalize text-zinc-500 text-sm">{pokemonData.name}</p>
        </>
      )}
    </div>
  );
};

export default EvolutionItem;
