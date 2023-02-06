import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Loader = () => {
  return (
    <LoaderContainer>
      <ActivityIndicator size="large" />
    </LoaderContainer>
  );
};

export const LoaderContainer = styled.View`
  height: 100%;
  justify-content: center;
`;

export default Loader;
