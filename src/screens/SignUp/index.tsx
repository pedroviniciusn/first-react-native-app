import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../routes/stack.routes';

const schema = yup.object().shape({
  fullName: yup.string().required('full name is required'),
  userName: yup.string().required('username is required'),
  email: yup
    .string()
    .email('format invalid, please set a correctly email')
    .required('email is required'),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords must match')
    .required('confirm password is required'),
});

interface SignUpProps {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickSignUp = (data: SignUpProps) => {
    console.log(data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.description}>Create account and enjoy our app</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Full Name"
                style={styles.textInput}
              />
            )}
          />
          {errors.fullName && <Text style={styles.textError}>{errors.fullName.message}</Text>}
          <Controller
            control={control}
            name="userName"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="User Name"
                autoCapitalize="none"
                style={styles.textInput}
              />
            )}
          />
          {errors.userName && <Text style={styles.textError}>{errors.userName.message}</Text>}
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
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={styles.textInput}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.textError}>{errors.confirmPassword.message}</Text>
          )}
          <Button color={'#483d8b'} title="Sign up" onPress={handleSubmit(handleClickSignUp)} />
          <View style={styles.signUpContainer}>
            <Text>I already have an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUp}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
