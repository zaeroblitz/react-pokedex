import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { HiMenuAlt3 } from "react-icons/hi";

import PokemonRow from "./PokemonRow";
import PokeballIcon from "../../assets/pokeball.png";
import { loadPokemonList } from "../../features/loadPokemonList";
import {
  resetSearchPokemon,
  searchPokemonData,
} from "../../features/searchPokemonData";
import { closeActiveMenu, openActiveMenu } from "../../features/activeMenu";

const Sidebar = () => {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const ref = useRef(undefined);
  const dispatch = useDispatch();
  const {
    loading,
    data: listPokemon,
    error,
  } = useSelector((state) => state.pokemonList);
  const {
    loading: searchLoading,
    data: searchData,
    error: searchError,
  } = useSelector((state) => state.searchPokemon);
  const { isActiveMenu, screenSize } = useSelector((state) => state.activeMenu);

  const handleScroll = () => {
    if (
      ref.current.scrollTop + ref.current.clientHeight >=
      ref.current.scrollHeight
    ) {
      setOffset(offset + 10);
    }
  };

  const handlePokemonSearch = (event) => {
    if (event.key === "Enter" && query !== "") {
      dispatch(searchPokemonData(query));
    }

    if (event.key === "Enter" && query === "") {
      dispatch(resetSearchPokemon());
      dispatch(loadPokemonList(offset));
    }
  };

  //* Handle infinite loading at bottom of sidebar scroll
  useEffect(() => {
    if (isActiveMenu) {
      dispatch(loadPokemonList(offset));
      ref.current.addEventListener("scroll", handleScroll);
    }
  }, [isActiveMenu, offset]);

  //* Hide sidebar if screen size <= 1100px
  useEffect(() => {
    if (screenSize > 0 && screenSize <= 1100) {
      dispatch(closeActiveMenu());
    } else if (screenSize > 0 && screenSize >= 1100 && isActiveMenu) {
      dispatch(openActiveMenu());
    } else if (screenSize > 0 && screenSize >= 1100 && !isActiveMenu) {
      dispatch(closeActiveMenu());
    }
  }, [screenSize]);

  //* Return empty div if active menu is not active
  if (!isActiveMenu) {
    return <div className="w-0" />;
  }

  return (
    <nav
      className="fixed h-screen overflow-auto w-64 sm:w-72 lg:w-96 bg-[#F6F6F6] z-50"
      ref={ref}
    >
      {/* Header */}
      <div className="sticky w-full top-0 bg-[#F6F6F6] pt-8 px-8 pb-2">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <div className="mr-3">
              <img
                src={PokeballIcon}
                alt=""
                className="object-cover bg-cover rounded-full w-8 h-8"
              />
            </div>
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl text-zinc-500">
              Pokédex
            </h2>
          </div>
          {screenSize <= 1100 && (
            <div
              className="text-xl text-zinc-500 hover:cursor-pointer hover:scale-105 duration-300"
              onClick={() => dispatch(closeActiveMenu())}
            >
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Search pokemon.."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          onKeyDown={handlePokemonSearch}
          value={query}
          className="w-full rounded-xl px-6 py-4 text-zinc-500 placeholder:text-zinc-300 border-none focus:outline-4 focus:outline-zinc-200"
        />
      </div>

      {(loading || searchLoading) && (
        <div className="flex justify-center">
          <PuffLoader color="#333333" size={64} />
        </div>
      )}

      {/* Pokemon List */}
      {listPokemon.length !== 0 && Object.keys(searchData).length === 0 && (
        <div className="flex flex-col bg-white rounded-xl mt-5 mb-8 mx-8">
          {listPokemon.map((pokemon, index) => (
            <PokemonRow key={index} i={index} name={pokemon} />
          ))}
        </div>
      )}

      {/* Pokemon Search Result */}
      {Object.keys(searchData).length !== 0 && (
        <div className="flex flex-col bg-white rounded-xl mt-5 mb-8 mx-8">
          <PokemonRow name={searchData.name} />
        </div>
      )}

      {(error || searchError) && (
        <p className="text-zinc-600 mt-5 mb-8 mx-8">{error}</p>
      )}
    </nav>
  );
};

export default Sidebar;
