import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

export type AppStackParamList = {
  Login: undefined;
  SignUp: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const StackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
