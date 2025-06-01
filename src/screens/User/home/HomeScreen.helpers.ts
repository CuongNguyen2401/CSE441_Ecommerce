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
