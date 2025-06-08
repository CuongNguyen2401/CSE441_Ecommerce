import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Card,
  H3,
  Input,
  Label,
  TextArea,
  Spinner,
  Image,
  Select,
  Adapt,
  Sheet,
} from 'tamagui';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

import {useCreateProduct} from 'queries/product/useCreateProduct';
import {useGetAllCategories} from 'queries/category/useGetAllCategories';
import {productFormSchema, ProductFormData} from 'queries/product/validation';
import {ProductRequest, ProductStatus} from 'queries/product/types';

const CreateProductScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Hooks
  const {createProduct, isCreating, error} = useCreateProduct();
  const {categories} = useGetAllCategories(); // Form setup with React Hook Form and Zod
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      salePrice: undefined,
      quantity: 0,
      categoryId: 1,
      productStatus: 'ACTIVE',
      relatedProducts: [],
    },
  });

  // Image picker handler
  const handleImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission required',
          'Please allow access to your photo library to select an image.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);

        // Convert to File object for web/form submission
        if (asset.uri.startsWith('http')) {
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          const file = new File([blob], 'product-image.jpg', {
            type: 'image/jpeg',
          });
          setImageFile(file);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Form submission
  const onSubmit = (data: ProductFormData) => {
    const productData: ProductRequest = {
      name: data.name,
      description: data.description || '',
      price: data.price,
      salePrice: data.salePrice,
      quantity: data.quantity,
      categoryId: data.categoryId,
      productStatus: data.productStatus,
      relatedProducts: data.relatedProducts || [],
      image: imageFile || undefined,
    };

    createProduct(productData, {
      onSuccess: () => {
        Alert.alert('Success', 'Product created successfully!');
        // Reset form
        reset();
        setSelectedImage(null);
        setImageFile(null);
      },
      onError: (err: any) => {
        Alert.alert(
          'Error',
          err.response?.data?.message || 'Failed to create product',
        );
      },
    });
  };

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        <H3>Create New Product</H3>

        <Card bordered padding="$4">
          <YStack gap="$4">
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Product Image
              </Label>

              <XStack gap="$3" alignItems="center">
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    width={100}
                    height={100}
                    borderRadius="$3"
                    objectFit="cover"
                  />
                ) : (
                  <YStack
                    width={100}
                    height={100}
                    backgroundColor="$gray3"
                    borderRadius="$3"
                    borderWidth={2}
                    borderColor="$gray6"
                    borderStyle="dashed"
                    justifyContent="center"
                    alignItems="center">
                    <Icon name="image" size={30} color="#999" />
                  </YStack>
                )}

                <Button
                  size="$3"
                  backgroundColor="$blue5"
                  color="$blue10"
                  onPress={handleImagePicker}>
                  <Icon name="photo-library" size={16} />
                  <Text>Select Image</Text>
                </Button>
              </XStack>
            </YStack>
            {/* Product Name */}
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Product Name *
              </Label>
              <Controller
                control={control}
                name="name"
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Enter product name"
                    value={value}
                    onChangeText={onChange}
                    borderColor={errors.name ? '$red8' : '$gray8'}
                  />
                )}
              />
              {errors.name && (
                <Text fontSize="$2" color="$red10">
                  {errors.name.message}
                </Text>
              )}
            </YStack>
            {/* Description */}
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Description
              </Label>
              <Controller
                control={control}
                name="description"
                render={({field: {onChange, value}}) => (
                  <TextArea
                    placeholder="Enter product description"
                    value={value}
                    onChangeText={onChange}
                    numberOfLines={4}
                    borderColor="$gray8"
                  />
                )}
              />
            </YStack>
            {/* Price and Sale Price */}
            <XStack gap="$3">
              <YStack gap="$2" flex={1}>
                <Label fontSize="$3" fontWeight="bold">
                  Price *
                </Label>
                <Controller
                  control={control}
                  name="price"
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="0.00"
                      value={value?.toString() || ''}
                      onChangeText={text => onChange(parseFloat(text) || 0)}
                      keyboardType="numeric"
                      borderColor={errors.price ? '$red8' : '$gray8'}
                    />
                  )}
                />
                {errors.price && (
                  <Text fontSize="$2" color="$red10">
                    {errors.price.message}
                  </Text>
                )}
              </YStack>

              <YStack gap="$2" flex={1}>
                <Label fontSize="$3" fontWeight="bold">
                  Sale Price
                </Label>
                <Controller
                  control={control}
                  name="salePrice"
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="0.00"
                      value={value?.toString() || ''}
                      onChangeText={text =>
                        onChange(parseFloat(text) || undefined)
                      }
                      keyboardType="numeric"
                      borderColor={errors.salePrice ? '$red8' : '$gray8'}
                    />
                  )}
                />
                {errors.salePrice && (
                  <Text fontSize="$2" color="$red10">
                    {errors.salePrice.message}
                  </Text>
                )}
              </YStack>
            </XStack>
            {/* Quantity */}
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Quantity *
              </Label>
              <Controller
                control={control}
                name="quantity"
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="0"
                    value={value?.toString() || ''}
                    onChangeText={text => onChange(parseInt(text) || 0)}
                    keyboardType="numeric"
                    borderColor={errors.quantity ? '$red8' : '$gray8'}
                  />
                )}
              />
              {errors.quantity && (
                <Text fontSize="$2" color="$red10">
                  {errors.quantity.message}
                </Text>
              )}
            </YStack>
            {/* Category */}
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Category *
              </Label>
              <Controller
                control={control}
                name="categoryId"
                render={({field: {onChange, value}}) => (
                  <Select
                    value={value?.toString()}
                    onValueChange={val => onChange(parseInt(val))}>
                    <Select.Trigger
                      iconAfter={<Icon name="keyboard-arrow-down" size={20} />}>
                      <Select.Value placeholder="Select a category" />
                    </Select.Trigger>

                    <Adapt when="sm" platform="touch">
                      <Sheet modal dismissOnSnapToBottom>
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay />
                      </Sheet>
                    </Adapt>

                    <Select.Content zIndex={200000}>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          {categories?.map(category => (
                            <Select.Item
                              key={category.id}
                              index={category.id}
                              value={category.id.toString()}>
                              <Select.ItemText>{category.name}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <Text fontSize="$2" color="$red10">
                  {errors.categoryId.message}
                </Text>
              )}
            </YStack>
            {/* Product Status */}
            <YStack gap="$2">
              <Label fontSize="$3" fontWeight="bold">
                Status
              </Label>
              <Controller
                control={control}
                name="productStatus"
                render={({field: {onChange, value}}) => (
                  <Select
                    value={value}
                    onValueChange={val => onChange(val as ProductStatus)}>
                    <Select.Trigger
                      iconAfter={<Icon name="keyboard-arrow-down" size={20} />}>
                      <Select.Value />
                    </Select.Trigger>

                    <Adapt when="sm" platform="touch">
                      <Sheet modal dismissOnSnapToBottom>
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay />
                      </Sheet>
                    </Adapt>

                    <Select.Content zIndex={200000}>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          <Select.Item index={0} value="ACTIVE">
                            <Select.ItemText>Active</Select.ItemText>
                          </Select.Item>
                          <Select.Item index={1} value="INACTIVE">
                            <Select.ItemText>Inactive</Select.ItemText>
                          </Select.Item>
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                )}
              />
            </YStack>
            {/* Submit Button */}
            <Button
              size="$4"
              backgroundColor="$green8"
              color="white"
              fontWeight="bold"
              onPress={handleSubmit(onSubmit)}
              disabled={isCreating}
              marginTop="$3">
              {isCreating ? (
                <XStack gap="$2" alignItems="center">
                  <Spinner size="small" color="white" />
                  <Text color="white">Creating Product...</Text>
                </XStack>
              ) : (
                <XStack gap="$2" alignItems="center">
                  <Icon name="add" size={20} color="white" />
                  <Text color="white">Create Product</Text>
                </XStack>
              )}
            </Button>
            {/* Error Display */}
            {error && (
              <Card backgroundColor="$red2" borderColor="$red8" padding="$3">
                <Text color="$red10" fontSize="$3">
                  {error.response?.data?.message || 'Failed to create product'}
                </Text>
              </Card>
            )}
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default CreateProductScreen;
