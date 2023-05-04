import { Text } from '@rneui/base';
import Config from 'react-native-config';

function App(): JSX.Element {
  return (
    <>
      <Text>Course API : {Config.COURSE_API_URL}</Text>
    </>
  );
}

export default App;
