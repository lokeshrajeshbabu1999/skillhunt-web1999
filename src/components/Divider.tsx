import { View } from 'react-native';
import styled from 'styled-components/native';

const Divider = props => {
  return (
    <LineContainer>
      <View>{props.View}</View>
    </LineContainer>
  );
};

export const LineContainer = styled.View`
  border-width: 0.7px;
  color: ${props => props.theme.LINE_COLOR};
  border-color: ${props => props.theme.LINE_COLOR};
`;
export default Divider;
