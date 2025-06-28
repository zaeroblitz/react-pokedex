import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../features/activeMenu";
import { fetchPokemonData } from "../features/loadPokemonData";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./Sidebar/Sidebar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonData("bulbasaur"));

    const handleResize = () => dispatch(setScreenSize(window.innerWidth));
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex bg-[#F6F6F6] overflow-x-hidden">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;
