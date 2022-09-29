import React from 'react';
import { useSelector } from 'react-redux';
import { TbSword } from 'react-icons/tb';

import typeIcon from '../../assets/type';
import '../styles.css';

const TypeDamageGiven = () => {
  const { data } = useSelector((state) => state.loadPokemonTypeEffect);

  return (
    <div className="flex flex-col">
      <div className="w-fit flex items-center bg-zinc-100 p-4 rounded-t-xl">
        <div className="text-zinc-600 text-xl mr-2">
          <TbSword />
        </div>
        <h2 className="font-medium text-zinc-600 ">Damage Given</h2>
      </div>

      <div className="bg-zinc-100 p-4 grid grid-cols-3 items-center gap-2 rounded-b-xl rounded-tr-xl">
        {/* Very Effective */}
        {data?.double_damage_to?.map((item, index) => (
          <div key={index} className={`${item} p-2 rounded-full text-white flex justify-center items-center gap-1`}>
            <img
              src={typeIcon[item]}
              alt={item}
              className="w-[32px] p-1 rounded-full"
            />
            <p className="text-lg font-semibold">2&times;</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeDamageGiven;
