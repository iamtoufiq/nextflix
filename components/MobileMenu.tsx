import { navbarItems } from "@/constant/navbarItems";
import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {navbarItems.map((curItem, index) => (
          <div
            key={index}
            className="px-3 text-center text-white hover:underline"
          >
            {curItem.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
