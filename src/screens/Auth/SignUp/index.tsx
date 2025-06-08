import React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  ScrollView,
  Text,
  XStack,
  YStack,
  Spinner,
  Card,
  H2,
  Paragraph,
  SizableText,
} from 'tamagui';
import { Controller } from 'react-hook-form';
import { useSignUpScreen } from './useSignUpScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = () => {
  const {
    state: {
      control,
      errors,
      isSigningUp,
      signUpError,
      showDatePicker,
      watchedValues: { dateOfBirth },
    },
    handlers: {
      handleSubmit,
      navigateToLogin,
      onToggleDatePicker,
      onChangeDateOfBirth,
    },
  } = useSignUpScreen();

  return (
    <ScrollView flex={1} backgroundColor="$background" contentContainerStyle={{ flexGrow: 1 }}>      <Card
        elevate
        bordered
        size="$4"
        margin="$4"
        scale={0.98}
        hoverStyle={{ scale: 0.99 }}
      >
        <Card.Header padded>
          <H2 textAlign="center" color="$color">Create Account</H2>
          <Paragraph textAlign="center" color="$color" opacity={0.7}>
            Sign up to get started
          </Paragraph>
        </Card.Header>

        <Card.Footer padded>
          <Form onSubmit={handleSubmit} width="100%">
            <YStack gap="$4" width="100%">
              <YStack gap="$1.5">
                <Label htmlFor="firstName" fontSize="$3">
                  First Name
                </Label>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="firstName"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your first name"
                      borderColor={errors.firstName ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.firstName && (
                  <SizableText color="$red10" size="$2">
                    {errors.firstName.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="lastName" fontSize="$3">
                  Last Name
                </Label>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="lastName"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your last name"
                      borderColor={errors.lastName ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.lastName && (
                  <SizableText color="$red10" size="$2">
                    {errors.lastName.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="username" fontSize="$3">
                  Username
                </Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="username"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Choose a username"
                      autoCapitalize="none"
                      borderColor={errors.username ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.username && (
                  <SizableText color="$red10" size="$2">
                    {errors.username.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="email" fontSize="$3">
                  Email
                </Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="email"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      borderColor={errors.email ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.email && (
                  <SizableText color="$red10" size="$2">
                    {errors.email.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="phoneNumber" fontSize="$3">
                  Phone Number
                </Label>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="phoneNumber"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      borderColor={errors.phoneNumber ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <SizableText color="$red10" size="$2">
                    {errors.phoneNumber.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="dateOfBirth" fontSize="$3">
                  Date of Birth
                </Label>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { value } }) => (
                    <TouchableOpacity onPress={onToggleDatePicker}>
                      <Input
                        id="dateOfBirth"
                        size="$4"
                        value={value ? dayjs(value).format('MM/DD/YYYY') : 'Select date'}
                        editable
                        placeholder="Select your date of birth"
                        paddingRight="$10"
                        borderColor={errors.dateOfBirth ? "$red8" : undefined}
                      />
                      <XStack
                        position="absolute"
                        right="$3"
                        alignItems="center"
                        height="100%"
                        justifyContent="center"
                      >
                        <Icon name="calendar-today" size={20} color="#666" />
                      </XStack>
                    </TouchableOpacity>
                  )}
                />
                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(_, selectedDate) => {
                      if (selectedDate) {
                        onChangeDateOfBirth(selectedDate);
                      } else {
                        onToggleDatePicker();
                      }
                    }}
                    maximumDate={new Date()}
                  />
                )}
                {errors.dateOfBirth && (
                  <SizableText color="$red10" size="$2">
                    {errors.dateOfBirth.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="password" fontSize="$3">
                  Password
                </Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="password"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Create a password"
                      secureTextEntry
                      borderColor={errors.password ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.password && (
                  <SizableText color="$red10" size="$2">
                    {errors.password.message}
                  </SizableText>
                )}
              </YStack>

              <YStack gap="$1.5">
                <Label htmlFor="confirmPassword" fontSize="$3">
                  Confirm Password
                </Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      id="confirmPassword"
                      size="$4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Confirm your password"
                      secureTextEntry
                      borderColor={errors.confirmPassword ? "$red8" : undefined}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <SizableText color="$red10" size="$2">
                    {errors.confirmPassword.message}
                  </SizableText>
                )}
              </YStack>

              <XStack alignItems="center" gap="$2" marginTop="$1">
                <Controller
                  control={control}
                  name="agreeToTerms"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      id="terms"
                      checked={value}
                      onCheckedChange={(checked) => onChange(!!checked)}
                      borderColor={errors.agreeToTerms ? "$red8" : undefined}
                    >
                      <Checkbox.Indicator>
                        <Text>✓</Text>
                      </Checkbox.Indicator>
                    </Checkbox>
                  )}
                />                <Label htmlFor="terms" fontSize="$2" color="$color">
                  I agree to the Terms and Conditions
                </Label>
              </XStack>
              {errors.agreeToTerms && (
                <SizableText color="$red10" size="$2" textAlign="center">
                  {errors.agreeToTerms.message}
                </SizableText>
              )}

              {signUpError ? (
                <YStack
                  backgroundColor="$red2"
                  padding="$3"
                  borderRadius="$4"
                  borderColor="$red6"
                  borderWidth={1}
                >                  <SizableText color="$red10" size="$2" textAlign="center">
                    An error occurred while creating your account
                  </SizableText>
                </YStack>
              ) : null}              <Button
                themeInverse
                size="$4"
                onPress={handleSubmit}
                disabled={isSigningUp}
                marginTop="$2"
                pressStyle={{ scale: 0.97 }}
              >
                {isSigningUp ? (
                  <XStack gap="$2" alignItems="center">
                    <Spinner size="small" color="white" />
                    <Text color="white">Creating Account...</Text>
                  </XStack>
                ) : (
                  <Text color="white">Create Account</Text>
                )}
              </Button>

              <XStack justifyContent="center" alignItems="center" gap="$2" marginTop="$4">
                <SizableText size="$3" color="$color">
                  Already have an account?
                </SizableText>                <Button 
                  variant="outlined" 
                  onPress={navigateToLogin}
                  pressStyle={{ scale: 0.95 }}
                >
                  <Text color="$blue10" fontSize="$3" fontWeight="bold">
                    Sign In
                  </Text>
                </Button>
              </XStack>
            </YStack>
          </Form>
        </Card.Footer>
      </Card>
    </ScrollView>
  );
};

export default SignUpScreen;
