import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Button, Text, View } from 'react-native';
import log from '../../../utils/Loggers';

const UserProfile = () => {
  const { user, signOut } = useAuthenticator();
  log.debug(user.signInUserSession);
  return (
    <View>
      <Text>Hello {user.username}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default UserProfile;
