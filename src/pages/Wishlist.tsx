import React from 'react';
import { useStore } from '../store/store';
import { SetupCard } from '../components/SetupCard';
import { GearCard } from '../components/GearCard';

export const Wishlist = () => {
  const { setups, gearItems, currentUser } = useStore();

  const favoriteSetups = setups.filter(s => currentUser.favoriteSetupIds.includes(s.id));
  const wishlistGear = gearItems.filter(g => currentUser.wishlistGearIds.includes(g.id));

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Your Collection
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Saved setups and gear you're keeping an eye on.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Saved Setups
        </h2>
        {favoriteSetups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteSetups.map(setup => (
              <SetupCard key={setup.id} setup={setup} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center border border-dashed border-gray-300 dark:border-gray-700">
            You haven't saved any setups yet.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Gear Wishlist
        </h2>
        {wishlistGear.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistGear.map(item => (
              <GearCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center border border-dashed border-gray-300 dark:border-gray-700">
            Your wishlist is empty.
          </p>
        )}
      </section>
    </div>
  );
};
