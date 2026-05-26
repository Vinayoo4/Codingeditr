import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/store';
import { Monitor, Heart, ShieldAlert, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export const Navbar = () => {
  const { currentUser, setRole } = useStore();
  const location = useLocation();

  const toggleRole = () => {
    setRole(currentUser.role === 'admin' ? 'visitor' : 'admin');
  };

  const navLinks = [
    { name: 'Browse', path: '/' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  if (currentUser.role === 'admin') {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Monitor className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                Space Makeover
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                    location.pathname === link.path
                      ? 'border-indigo-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Heart className="h-6 w-6" />
              {(currentUser.favoriteSetupIds.length > 0 || currentUser.wishlistGearIds.length > 0) && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
              )}
            </Link>
            <button
              onClick={toggleRole}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {currentUser.role === 'admin' ? (
                <><ShieldCheck className="h-4 w-4 text-green-500"/> Admin</>
              ) : (
                <><ShieldAlert className="h-4 w-4"/> Visitor</>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
