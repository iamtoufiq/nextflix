import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { icons, logoPath, navbarItems } from "@/constant/navbarItems";
import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); 
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={30}
          priority
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navbarItems.map((item, index) => (
            <NavbarItem key={index} label={item.label} active={item.active} />
          ))}
        </div>
        <div
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        {/* acount menu */}
        <div className="flex flex-row ml-auto gap-7 items-center">
          {icons.map(({ id, Icon }) => (
            <div
              key={id}
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
            >
              <Icon className="w-6" />
            </div>
          ))}

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
          <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src={logoPath}
                alt="profile-image"
                width={24}
                height={24}
                layout="responsive"
              />
            </div>
            <ChevronDownIcon
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
