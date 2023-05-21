import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Global from '../../utils/Global';
import NewScreen from './screens/NewScreen';

export const ScheduleStack = createStackNavigator();
// export const SearchStack = createStackNavigator();

// type SkillHuntTheme = {
//   PRIMARY_COLOR: string;
//   BACKGROUND_COLOR: string;
// };

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
                name="NewScreen"
                component={NewScreen}
                options={{ title: Global.Constant.appName }}
            />
        </ScheduleStack.Navigator>
    );
};
