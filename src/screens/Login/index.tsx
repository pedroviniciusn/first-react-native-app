import React from 'react';
import { Button, Text, TextInput, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../routes/stack.routes';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';

const schema = yup.object().shape({
  email: yup.string().email('format invalid, please set a correctly email').required(),
  password: yup.string().min(8).required(),
});

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickLogin = async (data: LoginProps): Promise<void> => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(userCredential.user)
        navigation.navigate('Home');
      })
      .catch((error) => {
        if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)
          return Alert.alert('Error on login', 'Invalid credentials');

        Alert.alert('Error on login, please try again');
      });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>Log in and enjoy our app</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInput}
            />
          )}
        />
        {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
            />
          )}
        />
        {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
        <Text>Forgot your password?</Text>
        <Button color={'#483d8b'} title="Login" onPress={handleSubmit(handleClickLogin)} />
        <View style={styles.signUpContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
