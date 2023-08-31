import NavbarItem from '@/components/NavbarItem';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from '@/components/MobileMenu';
import { useCallback, useEffect, useState } from 'react';
import AccountMenu from '@/components/AccountMenu';

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
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className='fixed z-40 w-full'>
      <div
        className={`
                flex
                flex-row
                items-center
                px-4
                py-6
                transition
                duration-500
                md:px-16
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}
      >
        <img className='h-4 lg:h-7' src='/images/logo.png' alt='Logo' />
        <div
          className='
                        ml-8
                        hidden
                        flex-row
                        gap-7
                        lg:flex
                '
        >
          <NavbarItem label='Home'></NavbarItem>
          <NavbarItem label='Series'></NavbarItem>
          <NavbarItem label='Films'></NavbarItem>
          <NavbarItem label='New & Popular'></NavbarItem>
          <NavbarItem label='My List'></NavbarItem>
          <NavbarItem label='Browse by languages'></NavbarItem>
        </div>
        <div
          onClick={toggleMobileMenu}
          className='relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden'
        >
          <p className='text-sm text-white'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex-rwo ml-auto flex items-center gap-7'>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <BsSearch />
          </div>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <BsBell />
          </div>

          <div
            onClick={toggleAccountMenu}
            className=' relative flex cursor-pointer flex-row items-center gap-2'
          >
            <div className='h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10'>
              <img src='/images/default-blue.png' alt='' />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
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
