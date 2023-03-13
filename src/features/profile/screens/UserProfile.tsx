import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Button, Text, View } from 'react-native';
import shLogger from '../../../utils/Loggers';

const UserProfile = () => {
  const { user, signOut } = useAuthenticator();
  shLogger.debug('Signed in user : ', user.username);
  return (
    <View>
      <Text>Hello {user.username}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default UserProfile;
