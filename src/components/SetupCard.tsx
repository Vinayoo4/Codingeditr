import React from 'react';
import { Setup, useStore } from '../store/store';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import clsx from 'clsx';

interface SetupCardProps {
  setup: Setup;
}

export const SetupCard: React.FC<SetupCardProps> = ({ setup }) => {
  const { currentUser, toggleFavoriteSetup } = useStore();
  const isFavorite = currentUser.favoriteSetupIds.includes(setup.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavoriteSetup(setup.id);
  };

  return (
    <Link to={`/setup/${setup.id}`} className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={setup.imageUrl}
          alt={setup.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <Heart
            className={clsx('w-5 h-5', isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300')}
          />
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{setup.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{setup.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {setup.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
