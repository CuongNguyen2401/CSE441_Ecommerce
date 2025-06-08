import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignUp } from '@services/Auth/useSignUp';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import { useState } from 'react';

// Define the signup form schema with validation
export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .refine(val => !/\d/.test(val), {
      message: 'First name should not contain numbers',
    }),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .refine(val => !/\d/.test(val), {
      message: 'Last name should not contain numbers',
    }),
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters'),
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      value => {
        if (!value) return false;
        const birthDate = dayjs(value);
        const today = dayjs();
        const age = today.diff(birthDate, 'year');
        return age >= 18;
      },
      {
        message: 'You must be at least 18 years old',
      },
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const useSignUpScreen = () => {
  const navigation = useNavigation();
  const { signUp, isSigningUp, error: signUpError } = useSignUp();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onToggleDatePicker = () => {
    setShowDatePicker(prevState => !prevState);
  };

  const onChangeDateOfBirth = (selectedDate: Date) => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    setValue('dateOfBirth', formattedDate);
    setShowDatePicker(false);
  };

  const onSubmit = handleSubmit(data => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
    };

    signUp(payload, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'Your account has been created successfully. Please sign in.',
        });
        // @ts-ignore
        navigation.navigate('Login', { screen: 'Login' });
      },
      onError: (err: any) => {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: err?.message ?? 'Failed to create account. Please try again.',
        });
        console.error('SignUp error:', err);
      },
    });
  });

  const navigateToLogin = () => {
    // @ts-ignore
    navigation.navigate('Login', { screen: 'Login' });
  };

  return {
    state: {
      control,
      errors,
      isSigningUp,
      signUpError,
      showDatePicker,
      watchedValues: {
        dateOfBirth: watch('dateOfBirth'),
      },
    },
    handlers: {
      handleSubmit: onSubmit,
      navigateToLogin,
      onToggleDatePicker,
      onChangeDateOfBirth,
    },
  };
};
