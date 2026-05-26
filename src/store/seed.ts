import { GearItem, Setup } from './store';

export const seedGearItems: GearItem[] = [
  {
    id: 'gear-1',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    category: 'Keyboard',
    description: 'A tactile mechanical keyboard with RGB lighting.',
    price: 99.00,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'gear-2',
    name: 'Logitech MX Master 3',
    category: 'Mouse',
    description: 'Advanced wireless mouse designed for creatives and coders.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac1eebc3f59e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'gear-3',
    name: 'Dell UltraSharp 27 4K USB-C Monitor',
    category: 'Monitor',
    description: '27-inch 4K monitor with brilliant color and detail.',
    price: 600.00,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'gear-4',
    name: 'Herman Miller Aeron Chair',
    category: 'Chair',
    description: 'Ergonomic office chair that provides ultimate comfort.',
    price: 1200.00,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400',
  }
];

export const seedSetups: Setup[] = [
  {
    id: 'setup-1',
    name: 'Minimalist Dark Theme',
    description: 'A clean and dark workspace optimized for deep coding sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    gearIds: ['gear-1', 'gear-2', 'gear-3'],
    tags: ['minimalist', 'dark', 'productivity'],
  },
  {
    id: 'setup-2',
    name: 'Ergonomic Developer Haven',
    description: 'Focusing on health with an ergonomic chair and monitor setup.',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
    gearIds: ['gear-1', 'gear-3', 'gear-4'],
    tags: ['ergonomic', 'light', 'clean'],
  }
];
