import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemonTypeData } from '../../features/loadPokemonType';
import TypeDamageGiven from './TypeDamageGiven';
import TypeDamageReceived from './TypeDamageReceived';

const TypesEffectiveness = ({ pokemonId, types }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonTypeData(types));
  }, [pokemonId]);

  return (
    <div className="flex flex-col">
      <TypeDamageGiven />
      <TypeDamageReceived />
    </div>
  );
};

export default TypesEffectiveness;
