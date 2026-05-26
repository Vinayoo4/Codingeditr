import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { GearCard } from '../components/GearCard';
import { ArrowLeft, Heart } from 'lucide-react';
import clsx from 'clsx';

export const SetupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { setups, gearItems, currentUser, toggleFavoriteSetup } = useStore();

  const setup = setups.find(s => s.id === id);
  const setupGear = gearItems.filter(g => setup?.gearIds.includes(g.id));

  if (!setup) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Setup not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  const isFavorite = currentUser.favoriteSetupIds.includes(setup.id);

  return (
    <div className="space-y-8">
      <div>
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to browsing
        </Link>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {setup.name}
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
              {setup.description}
            </p>
          </div>
          <button
            onClick={() => toggleFavoriteSetup(setup.id)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Heart className={clsx('w-5 h-5', isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500')} />
            {isFavorite ? 'Saved' : 'Save Setup'}
          </button>
        </div>
      </div>

      <div className="w-full aspect-[21/9] sm:aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
        <img
          src={setup.imageUrl}
          alt={setup.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gear in this setup</h2>
        {setupGear.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setupGear.map(item => (
              <GearCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No gear listed for this setup.</p>
        )}
      </div>
    </div>
  );
};
