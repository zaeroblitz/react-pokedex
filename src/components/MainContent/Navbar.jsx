import React from 'react';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { closeActiveMenu, openActiveMenu } from '../../features/activeMenu';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isActiveMenu, screenSize } = useSelector((state) => state.activeMenu);

  const handleActiveMenu = () => {
    if (isActiveMenu) {
      dispatch(closeActiveMenu());
    } else {
      dispatch(openActiveMenu());
    }
  };

  return (
    <nav className={`w-full sticky top-0 flex justify-between mx-6 py-4 ${isActiveMenu && screenSize <= 1100 ? 'z-10' : 'z-20'}`}>
      <div
        onClick={handleActiveMenu}
        className="text-2xl text-zinc-500 hover:cursor-pointer hover:scale-105 duration-300"
      >
        {isActiveMenu ? <HiMenuAlt3 /> : <HiMenuAlt2 />}
      </div>
    </nav>
  );
};

export default Navbar;
