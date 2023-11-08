import { Button, View } from 'react-native';

const UserProfile = () => {
  // const { user, signOut } = useAuthenticator();
  // shLogger.debug('Signed in user : ', user.username);
  return (
    <View>
      {/* <Text>Hello {user.username}</Text> */}
      <Button title="Sign Out" />
    </View>
  );
};

export default UserProfile;
