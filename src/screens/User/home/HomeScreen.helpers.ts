
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {id: 1, name: 'Electronics', icon: 'devices'},
  {id: 2, name: 'Clothing', icon: 'checkroom'},
  {id: 3, name: 'Home & Kitchen', icon: 'kitchen'},
  {id: 4, name: 'Books', icon: 'menu-book'},
  {id: 5, name: 'Sports', icon: 'sports-basketball'},
];

export const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Up to 50% off',
    image: 'https://placekitten.com/400/150',
  },
  {
    id: 2,
    title: 'New Arrivals',
    description: 'Check out our latest products',
    image: 'https://placekitten.com/401/150',
  },
];

