import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbSword } from 'react-icons/tb';

const Ability = ({ abilityName }) => {
  const [abilityData, setAbilityData] = useState({});
  let effectEntries = {};
  let flavorEntries = {};

  const loadAbilityData = () => {
    axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`)
      .then(({ data }) => {
        setAbilityData(data);
      });
  };

  if (Object.keys(abilityData).length !== 0) {
    if (abilityData.effect_entries.length !== 0) {
      effectEntries = abilityData.effect_entries.find((element) => element.language.name === 'en');
    }

    if (abilityData.effect_entries.length === 0 && abilityData.flavor_text_entries.length !== 0) {
      flavorEntries = abilityData.flavor_text_entries.find((element) => element.language.name === 'en');
    }
  }

  useEffect(() => {
    loadAbilityData();
  }, [abilityName]);

  return (
    <div className="flex flex-col mb-5 last:mb-0">
      <div className="flex items-center bg-zinc-100  text-zinc-600 font-semibold px-3 py-2 rounded-t-xl w-fit">
        <div className="text-lg mr-2">
          <TbSword />
        </div>
        <p className="font-medium capitalize">{abilityName}</p>
      </div>
      <div className="mt-0">
        {(Object.keys(abilityData).length !== 0) && (
        <div className="px-4 py-2 bg-zinc-100 text-zinc-400 rounded-b-xl rounded-tr-xl">
            {Object.keys(effectEntries).length !== 0 && (
              <p>{effectEntries.short_effect}</p>
            )}

            {Object.keys(flavorEntries).length !== 0 && (
              <p>{flavorEntries.flavor_text}</p>
            )}

            {(Object.keys(effectEntries).length !== 0 && Object.keys(flavorEntries).length !== 0) && (
              <p>No ability description has found</p>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

export default Ability;
