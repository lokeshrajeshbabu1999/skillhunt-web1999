import { StackScreenProps } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import { Container, CourseContainer } from '../../../../style';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import Category from '../components/Category';
import { CourseStackParamList } from '../components/CourseStack';
import useCategory from '../hooks/useCategory';

type ListCategoryProps = StackScreenProps<CourseStackParamList, 'ListCategory'>;

const ListCategory = ({ navigation }: ListCategoryProps) => {
  const [category, errorMessage, isLoading] = useCategory();

  const numColumns = 2;

  const skillActivityIndicator = () => {
    return <Loader />;
  };

  const skillMessage = () => {
    return (
      <CourseContainer>
        <Message type="error" text={errorMessage} />
      </CourseContainer>
    );
  };

  const displayResult = () => {
    return errorMessage === '' ? renderCourseCard() : skillMessage();
  };

  const renderCourseCard = () => {
    return (
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={category}
          renderItem={({ item }) => (
            <Category content={item} navigation={navigation} />
          )}
          keyExtractor={item => item.code}
          numColumns={numColumns}
        />
      </Container>
    );
  };
  return (
    <Container>
      {isLoading ? skillActivityIndicator() : displayResult()}
    </Container>
  );
};

export default ListCategory;
