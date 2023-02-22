import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useEffect, useState } from 'react';
const useUser = () => {
  const [userEmail, setUserEmail] = useState();
  const { user } = useAuthenticator();

  const initUser = () => {
    console.log('Auth User', user.attributes.email);
    setUserEmail(user.attributes.email);
  };

  useEffect(() => {
    initUser();
  }, []);

  return [userEmail];
};

export default useUser;
