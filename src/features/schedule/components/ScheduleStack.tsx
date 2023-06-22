import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../../utils/Global';
import ListUserSchedule from '../screens/ListUserSchedule';

export const ScheduleStack = createStackNavigator();

export const ScheduleNavigator = () => {
  const theme = useTheme();

  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.PRIMARY_COLOR,
        },
        headerTintColor: theme.BACKGROUND_COLOR,
      }}>
      <ScheduleStack.Screen
        name="ListSchedule"
        component={ListUserSchedule}
        options={{ title: Global.Constant.appName }}
      />
    </ScheduleStack.Navigator>
  );
};
