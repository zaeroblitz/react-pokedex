import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import typeIcon from '../../assets/type';
import { setSelectedPokemon } from '../../features/selectedPokemon';
import '../styles.css';
import { fetchPokemonData } from '../../features/loadPokemonData';

const PokemonRow = ({ name }) => {
  const [pokemonData, setPokemonData] = useState({});
  const dispatch = useDispatch();

  const loadPokemonData = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({ data }) => {
        setPokemonData(data);
      });
  };

  useEffect(() => {
    loadPokemonData();
  }, [name]);

  return (
    <div
      onClick={() => {
        dispatch(setSelectedPokemon(name));
        dispatch(fetchPokemonData(name));
      }}
      className="flex items-center px-4 py-2 mb-5 last:mb-0 rounded-lg hover:cursor-pointer hover:bg-zinc-100 duration-300"
    >
      {Object.keys(pokemonData).length !== 0 && (
        <>
          <div className="mr-3">
            <img
              src={pokemonData.sprites.other.home.front_default}
              alt={name}
              className="object-cover bg-cover bg-center w-[50px]"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-400">{(pokemonData.id.toString()).padStart(4, '0')}</p>
            <p className="text-zinc-600 capitalize">{pokemonData.name}</p>
            <div className="flex gap-1">
              {pokemonData.types.map((item, index) => (
                <img
                  key={index}
                  src={typeIcon[item.type.name]}
                  alt={item.type.name}
                  className={`${item.type.name} w-[20px] p-1 rounded-full`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonRow;
