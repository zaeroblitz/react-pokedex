import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EvolutionItem from './EvolutionItem';

const Evolutions = ({ url }) => {
  const [speciesData, setSpeciesData] = useState({});
  const [evolutionChainData, setEvolutionChainData] = useState({});

  const loadPokemonSpeciesData = () => {
    axios.get(url)
      .then(({ data }) => {
        setSpeciesData(data);
        const evolutionChainURL = data.evolution_chain.url;
        axios.get(evolutionChainURL)
          .then(({ data: chainData }) => {
            setEvolutionChainData(chainData.chain);
          });
      });
  };

  const showPokemonEvolveChain = () => {
    if (Object.keys(evolutionChainData).length !== 0 && evolutionChainData.evolves_to.length !== 0) {
      return evolutionChainData.evolves_to.map((evolve2, index) => {
        if (evolve2.evolves_to.length !== 0) {
          return evolve2.evolves_to.map((evolve3, evolve3Index) => {
            if (evolve2.evolves_to.length > 1) {
              return (
                <div key={evolve3Index} className="px-4 py-2 bg-gray-50 mb-3 rounded-xl">
                  <p className="capitalize text-center text-zinc-500 text-sm font-medium">{evolve3.species.name} Line</p>
                  <div className="flex items-center gap-6">
                    <EvolutionItem name={evolutionChainData.species.name} />
                    <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
                    <EvolutionItem name={evolve2.species.name} />
                    <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
                    <EvolutionItem name={evolve3.species.name} />
                  </div>
                </div>
              );
            }

            return (
              <div key={evolve3Index} className="flex items-center">
                <EvolutionItem name={evolutionChainData.species.name} />
                <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
                <EvolutionItem name={evolve2.species.name} />
                <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
                <EvolutionItem name={evolve3.species.name} />
              </div>
            );
          });
        }

        if (evolutionChainData.evolves_to.length > 1) {
          return (
            <div key={index} className="px-4 py-2 bg-gray-50 mb-3 rounded-xl">
              <p className="capitalize text-center text-zinc-500 text-sm font-medium">{evolve2.species.name} Line</p>
              <div className="flex items-center gap-6">
                <EvolutionItem name={evolutionChainData.species.name} />
                <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
                <EvolutionItem name={evolve2.species.name} />
              </div>
            </div>
          );
        }

        return (
          <div key={index} className="flex items-center">
            <EvolutionItem name={evolutionChainData.species.name} />
            <div className="w-6 h-1 mx-1 bg-zinc-100 rounded-full" />
            <EvolutionItem name={evolve2.species.name} />
          </div>
        );
      });
    }
    return (
      <div className="flex items-center">
        <EvolutionItem name={speciesData.name} />
      </div>
    );
  };

  useEffect(() => {
    loadPokemonSpeciesData();
  }, [url]);

  return (
    <div className="flex flex-col items-center">
      {showPokemonEvolveChain()}
    </div>
  );
};

export default Evolutions;
