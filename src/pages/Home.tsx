import React, { useEffect } from 'react';
import { useStore } from '../store/store';
import { seedSetups, seedGearItems } from '../store/seed';
import { SetupCard } from '../components/SetupCard';

export const Home = () => {
  const { setups, gearItems, setSeedData } = useStore();

  useEffect(() => {
    // Seed initial data if empty
    if (setups.length === 0 && gearItems.length === 0) {
      setSeedData(seedSetups, seedGearItems);
    }
  }, [setups.length, gearItems.length, setSeedData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Curated Desk Setups
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Discover beautiful workspace inspirations and build your dream gear wishlist.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {setups.map((setup) => (
          <SetupCard key={setup.id} setup={setup} />
        ))}
      </div>

      {setups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No setups found. Seed data might be missing.</p>
        </div>
      )}
    </div>
  );
};
