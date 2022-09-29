import React from 'react';

const BaseStat = ({ itemData, type }) => (
  <div className="flex items-center justify-between mb-2 last:mb-0">
    <p className="w-[40%] lg:w-[25%] uppercase text-zinc-600 lg:text-right font-semibold">
      {itemData.stat.name.includes('special-') ? `SP ${itemData.stat.name.split('-')[1]}` : itemData.stat.name}
    </p>
    <p className="w-[10%] lg:w-[10%] uppercase text-zinc-600 text-center lg:text-right">
      {itemData.base_stat}
    </p>
    <div className="w-[40%] lg:w-[60%] bg-zinc-200 h-3 rounded-full">
      <div className={`rounded-full h-3 ${type}`} style={{ width: `${(itemData.base_stat / 256) * 100}%` }} />
    </div>
  </div>
);

export default BaseStat;
