import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../../utils/Global';
import CourseDetail from '../../course/screens/CourseDetail';
import Home from '../screens/Home';

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
