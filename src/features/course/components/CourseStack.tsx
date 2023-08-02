import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../../utils/Global';
import CourseDetail from '../screens/CourseDetail';
import ListCategory from '../screens/ListCategory';
import ListCourse from '../screens/ListCourse';

export type CourseStackParamList = {
  ListCategory: undefined;
  ListCourse: { code: string; title: string };
  CourseDetail: undefined;
};

export const CourseStack = createStackNavigator<CourseStackParamList>();

export const CourseNavigator = () => {
  const appTheme = useTheme();
  return (
    <CourseStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: appTheme.colors.primary,
        },
        headerTintColor: appTheme.colors.primaryText,
      }}>
      <CourseStack.Screen
        name="ListCategory"
        component={ListCategory}
        options={{
          title: Global.Constant.appName,
        }}
      />
      <CourseStack.Screen name="ListCourse" component={ListCourse} />
      <CourseStack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ title: Global.Constant.appName }}
      />
    </CourseStack.Navigator>
  );
};
