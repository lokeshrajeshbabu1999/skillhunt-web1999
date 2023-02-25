/* eslint-disable react/no-unstable-nested-components */
import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from 'styled-components';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import awsExports from './src/aws-exports';
import { CourseNavigator } from './src/features/course/components/CourseStack';
import { HomeNavigator } from './src/features/home/components/HomeStack';
import NewScreen from './src/features/reference/screens/NewScreen';
import { lightTheme } from './src/theme';

Amplify.configure(awsExports);

const Tab = createMaterialBottomTabNavigator();

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

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
                component={NewScreen}
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
                component={NewScreen}
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
