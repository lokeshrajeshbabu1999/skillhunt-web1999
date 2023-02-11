import { Button, Text, View } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const UserProfile = () => {
  const { user, signOut } = useAuthenticator();
  console.log(user.signInUserSession);
  return (
    <View>
      <Text>Hello {user.username}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default UserProfile;
