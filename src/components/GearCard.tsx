import React from 'react';
import { GearItem, useStore } from '../store/store';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';

interface GearCardProps {
  item: GearItem;
}

export const GearCard: React.FC<GearCardProps> = ({ item }) => {
  const { currentUser, toggleWishlistGear } = useStore();
  const inWishlist = currentUser.wishlistGearIds.includes(item.id);

  const handleWishlistClick = () => {
    toggleWishlistGear(item.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex overflow-hidden group">
      {item.imageUrl && (
        <div className="w-24 sm:w-32 flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wide">{item.category}</p>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
            </div>
            <button
              onClick={handleWishlistClick}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors flex-shrink-0"
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {inWishlist ? (
                <BookmarkCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <BookmarkPlus className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">
            {item.price ? `$${item.price.toFixed(2)}` : 'N/A'}
          </span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
            >
              View Item
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
