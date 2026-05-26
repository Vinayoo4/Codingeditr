import React, { useState } from 'react';
import { useStore, GearItem, Setup } from '../store/store';
import { Navigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const Admin = () => {
  const { currentUser, setups, gearItems, addSetup, deleteSetup, addGearItem, deleteGearItem } = useStore();
  const [activeTab, setActiveTab] = useState<'setups' | 'gear'>('setups');

  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleAddGear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newGear: GearItem = {
      id: uuidv4(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string) || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      url: formData.get('url') as string || undefined,
    };
    addGearItem(newGear);
    e.currentTarget.reset();
  };

  const handleAddSetup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedGearIds = Array.from(formData.getAll('gearIds')) as string[];
    const tagsString = formData.get('tags') as string;

    const newSetup: Setup = {
      id: uuidv4(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      gearIds: selectedGearIds,
      tags: tagsString.split(',').map(t => t.trim()).filter(Boolean),
    };
    addSetup(newSetup);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Manage curated setups and gear items.
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('setups')}
            className={`${activeTab === 'setups' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manage Setups
          </button>
          <button
            onClick={() => setActiveTab('gear')}
            className={`${activeTab === 'gear' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manage Gear
          </button>
        </nav>
      </div>

      {activeTab === 'gear' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Gear</h2>
            <form onSubmit={handleAddGear} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input required name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <input required name="category" type="text" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea required name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
                  <input name="price" type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product URL</label>
                  <input name="url" type="url" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input name="imageUrl" type="url" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Gear Item
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Existing Gear Items</h2>
            <div className="space-y-2">
              {gearItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button onClick={() => deleteGearItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </div>
              ))}
              {gearItems.length === 0 && <p className="text-gray-500">No gear items found.</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'setups' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Setup</h2>
            <form onSubmit={handleAddSetup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input required name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea required name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                <input required name="imageUrl" type="url" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                <input name="tags" type="text" placeholder="dark, minimalist, mac" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Gear for Setup</label>
                <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-md p-2">
                  {gearItems.map(item => (
                    <label key={item.id} className="flex items-center space-x-3">
                      <input type="checkbox" name="gearIds" value={item.id} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                    </label>
                  ))}
                  {gearItems.length === 0 && <p className="text-sm text-gray-500 p-2">No gear available to select.</p>}
                </div>
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save Setup
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Existing Setups</h2>
            <div className="space-y-2">
              {setups.map(setup => (
                <div key={setup.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={setup.imageUrl} alt={setup.name} className="w-16 h-12 object-cover rounded-md" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{setup.name}</p>
                      <p className="text-sm text-gray-500">{setup.gearIds.length} items</p>
                    </div>
                  </div>
                  <button onClick={() => deleteSetup(setup.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex-shrink-0">
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </div>
              ))}
              {setups.length === 0 && <p className="text-gray-500">No setups found.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
