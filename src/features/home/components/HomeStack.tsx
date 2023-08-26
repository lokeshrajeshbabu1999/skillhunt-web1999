import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../../utils/Global';
import CourseDetail from '../../course/screens/CourseDetail';
import Home from '../screens/Home';

export type HomeStackParamList = {
  Home: undefined;
  CourseDetail: { id: string };
};

export const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  const appTheme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: appTheme.colors.primary,
        },
        headerTintColor: appTheme.colors.primaryText,
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ title: Global.Constant.appName }}
      />
      <HomeStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ title: Global.Constant.appName }}
      />
    </HomeStack.Navigator>
  );
};
