import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../../utils/Global';
import ListCategory from '../screens/ListCategory';
import ListCourse from '../screens/ListCourse';

export const CourseStack = createStackNavigator();

export const CourseNavigator = () => {
  const theme = useTheme();
  return (
    <CourseStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.PRIMARY_COLOR,
        },
        headerTintColor: theme.BACKGROUND_COLOR,
      }}>
      <CourseStack.Screen
        name="ListCategory"
        component={ListCategory}
        options={{
          title: Global.Constant.appName,
        }}
      />
      <CourseStack.Screen name="ListCourse" component={ListCourse} />
    </CourseStack.Navigator>
  );
};
