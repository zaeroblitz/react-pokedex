import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { GiLibertyWing } from "react-icons/gi";
import { TbCrown, TbPokeball, TbSwords } from "react-icons/tb";
import { useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import Navbar from "./Navbar";

import Ability from "./Ability";
import BaseStat from "./BaseStat";
import Evolutions from "./Evolutions";
import TypesEffectiveness from "./TypesEffectiveness";
import typeIcon from "../../assets/type";
import "../styles.css";

const MainContent = () => {
  const { loading, data, error } = useSelector((state) => state.loadPokemon);
  const { isActiveMenu } = useSelector((state) => state.activeMenu);

  return (
    <main
      className={`w-full min-h-screen max-w-[1280px] mb-[100px] px-6 py-4 mx-auto 
      ${isActiveMenu ? "lg:ml-96" : ""}`}
    >
      <Navbar />

      {/* Loading */}
      {loading && (
        <div className="w-full h-screen flex justify-center items-center mb-10">
          <GridLoader size={30} color="#CFD2CF" />
        </div>
      )}

      {/* Success Get Data */}
      <div className="hidden md:block absolute text-[600px] font-extrabold text-[#E9E9E9] -top-36 -right-44">
        <TbPokeball />
      </div>
      {Object.keys(data).length !== 0 && (
        <>
          <section className="relative flex flex-col items-center -mt-16 mx-6">
            <img
              src={data.sprites.other.home.front_default}
              alt={data.name}
              className="w-80 object-cover bg-cover bg-center bg-no-repeat"
            />
            <p className="text-xl text-zinc-300 font-bold mt-3">
              #{data.id.toString().padStart(4, "0")}
            </p>
            <p className="text-3xl text-zinc-300 font-semibold capitalize mt-2">
              {data.name}
            </p>
            <div className="flex item-center gap-3 mt-2">
              {data.types.map((item, index) => (
                <div
                  key={index}
                  className={`${item.type.name} flex items-center px-3 py-2 rounded-lg`}
                >
                  <img
                    src={typeIcon[item.type.name]}
                    alt={item.type.name}
                    className="w-[28px] p-1 rounded-full"
                  />
                  <p className="ml-1 text-lg text-white capitalize">
                    {item.type.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-12 gap-5 mt-8 mx-6">
            {/* Column 1 */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
              {/* Base Stats   */}
              <section className="bg-white py-6 rounded-xl">
                <div className="flex items-center px-6">
                  <div
                    className={`${data.types[0].type.name} rounded-full p-2 text-2xl text-white mr-3`}
                  >
                    <CgMenuLeft />
                  </div>
                  <h4 className="text-zinc-700 font-bold">Base Stats</h4>
                </div>
                <hr className="my-4" />

                <div className="px-6">
                  {data.stats.map((item, index) => (
                    <BaseStat
                      key={index}
                      itemData={item}
                      type={data.types[0].type.name}
                    />
                  ))}
                </div>
              </section>

              {/* Abilities */}
              <section className="bg-white py-6 rounded-xl">
                <div className="flex items-center px-6">
                  <div
                    className={`${data.types[0].type.name} rounded-full p-2 text-2xl text-white mr-3`}
                  >
                    <TbSwords />
                  </div>
                  <h4 className="text-zinc-700 font-bold">Abilities</h4>
                </div>
                <hr className="my-4" />
                <div className="mt-3 px-6">
                  {data.abilities.map((item, index) => (
                    <Ability key={index} abilityName={item.ability.name} />
                  ))}
                </div>
              </section>
            </div>

            {/* Column 2 */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
              {/* Evolution Line   */}
              <section className="bg-white py-6 rounded-xl">
                <div className="flex items-center px-6">
                  <div
                    className={`${data.types[0].type.name} rounded-full p-2 text-2xl text-white mr-3`}
                  >
                    <GiLibertyWing />
                  </div>
                  <h4 className="text-zinc-700 font-bold">Evolution Line</h4>
                </div>
                <hr className="my-4" />

                <div className="px-6">
                  <Evolutions url={data.species.url} />
                </div>
              </section>

              {/* Type Effectiveness */}
              <section className="bg-white py-6 rounded-xl">
                <div className="flex items-center px-6">
                  <div
                    className={`${data.types[0].type.name} rounded-full p-2 text-2xl text-white mr-3`}
                  >
                    <TbCrown />
                  </div>
                  <h4 className="text-zinc-700 font-bold">
                    Type Effectiveness
                  </h4>
                </div>
                <hr className="my-4" />
                <div className="mt-3 px-6">
                  <TypesEffectiveness
                    pokemonId={data.id}
                    types={data.types.map((item) => item.type.name)}
                  />
                </div>
              </section>
            </div>
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="w-full flex justify-center mt-8">
          <p className="text-center text-zinc-700">
            Something gone wrong. Please contact the developer.
          </p>
        </div>
      )}
    </main>
  );
};

export default MainContent;
