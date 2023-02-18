import { createStackNavigator } from '@react-navigation/stack';
import Global from '../../../utils/Global';
import Home from '../screens/Home';
import { useTheme } from 'styled-components';
import CourseDetail from '../../course/screens/CourseDetail';

export const HomeStack = createStackNavigator();
// export const SearchStack = createStackNavigator();

// type SkillHuntTheme = {
//   PRIMARY_COLOR: string;
//   BACKGROUND_COLOR: string;
// };

export const HomeNavigator = ({}) => {
  const theme = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.PRIMARY_COLOR,
        },
        headerTintColor: theme.BACKGROUND_COLOR,
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
