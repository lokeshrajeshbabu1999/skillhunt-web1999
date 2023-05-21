/* eslint-disable react/no-unstable-nested-components */
import { Authenticator } from '@aws-amplify/ui-react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeProvider } from 'styled-components';
import { CourseNavigator } from './src/features/course/components/CourseStack';
import { HomeNavigator } from './src/features/home/components/HomeStack';
import UserProfile from './src/features/profile/screens/UserProfile';
import { ScheduleNavigator } from './src/features/reference/ScheduleStack';
import { lightTheme } from './src/theme';

Amplify.configure({
  aws_project_region: 'ap-south-1',
  aws_user_pools_id: Config.USER_POOL_ID,
  aws_user_pools_web_client_id: Config.USER_POOL_WEB_CLIENT_ID,
  aws_cognito_identity_pool_id: Config.IDENTITY_POOL_ID,
});

const Tab = createMaterialBottomTabNavigator();

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // console.log(Config)
  return (
    <Authenticator.Provider>
      <Authenticator>
        <ThemeProvider theme={lightTheme}>
          <NavigationContainer>
            <Tab.Navigator
              barStyle={{ backgroundColor: lightTheme.PRIMARY_COLOR }}>
              <Tab.Screen
                name="HomeStack"
                component={HomeNavigator}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color }) => (
                    <Icon name="home" size={26} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Course"
                component={CourseNavigator}
                options={{
                  tabBarLabel: 'Courses',
                  tabBarIcon: ({ color }) => (
                    <Icon name="book-open" size={26} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Schedule"
                component={ScheduleNavigator}
                options={{
                  tabBarLabel: 'Schedule',
                  tabBarIcon: ({ color }) => (
                    <Icon
                      name="calendar-month-outline"
                      size={26}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                  tabBarLabel: 'Account',
                  tabBarIcon: ({ color }) => (
                    <Icon name="account" size={26} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
