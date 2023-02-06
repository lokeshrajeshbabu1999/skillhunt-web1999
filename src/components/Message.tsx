import { Text } from 'react-native';
import styled from 'styled-components/native';

const Message = props => {
  return (
    <ErrorMessageView>
      <Text> {props.text} </Text>
    </ErrorMessageView>
  );
};

// FIXME - This has to be a styled component
// FIXME - Display the error in red color picked from theme

export const ErrorMessageView = styled.Text`
  align-items: center;
  flex: 1;
`;
// color: ${props => props.theme.ERROR_COLOR};

export default Message;
