import React from 'react';
import {ScrollView, Separator, YStack} from 'tamagui';
import {SearchProduct} from './components';
import {SpecialOffer} from './components/SpecialOffer';
import {Categories} from './components/ShopByCategory';
import {FeaturedProducts} from './components/FeatureProduct';

const HomeScreen = () => {
  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        <SearchProduct />
        <SpecialOffer />
        <Categories />
        <Separator marginVertical="$2" />
        <FeaturedProducts />
      </YStack>
    </ScrollView>
  );
};

export default HomeScreen;
