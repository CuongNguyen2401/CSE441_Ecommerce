// import React, {createContext, useContext, useMemo} from 'react';
// import {useHomeScreen} from './useHomeScreen';
// import {Category, Promotion} from './HomeScreen.helpers';
// import {Product} from '../products/helpers';
// import {User} from 'store/auth/types';
// import {ProductResponse} from 'services/Product/types';

// type HomeScreenContextType = {
//   state: {
//     user: User | null;
//     products: ProductResponse[];
//     categories: Category[];
//     promotions: Promotion[];
//     isFetching: boolean;
//     isError: boolean;
//     error: Error | null;
//   };
//   handlers: {
//     handleSearch: (query: string) => void;
//     handleCategoryPress: (category: Category) => void;
//     handleProductPress: (product: Product) => void;
//   };
// };

// const HomeScreenContext = createContext<HomeScreenContextType | undefined>(
//   undefined,
// );

// export const HomeScreenProvider = ({children}: {children: React.ReactNode}) => {
//   const {state, handlers} = useHomeScreen();

//   const contextValue = useMemo(
//     () => ({
//       state: {
//         user: state.user,
//         products: state.products,
//         categories: state.categories,
//         promotions: state.promotions,
//         isFetching: state.isFetching,
//         isError: state.isError,
//         error: state.error,
//       },
//       handlers,
//     }),
//     [
//       state.user,
//       state.products,
//       state.categories,
//       state.promotions,
//       state.isFetching,
//       state.isError,
//       state.error,
//       handlers,
//     ],
//   );

//   return (
//     <HomeScreenContext.Provider value={contextValue}>
//       {children}
//     </HomeScreenContext.Provider>
//   );
// };

// export const useHomeScreenContext = () => {
//   const context = useContext(HomeScreenContext);
//   if (!context) {
//     throw new Error(
//       'useHomeScreenContext must be used within a HomeScreenProvider',
//     );
//   }
//   return context;
// };
