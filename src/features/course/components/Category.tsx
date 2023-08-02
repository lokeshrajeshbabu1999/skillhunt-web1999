import { Avatar } from '@rneui/themed';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components';
import {
  AvatarContainer,
  CategoryContainer,
  CategoryTitle,
} from '../../../../style';
import { CategoryType } from '../../../types/CategoryType';

type CategoryProps = {
  content: CategoryType;
  navigation: any;
};

const Category = ({ navigation, content }: CategoryProps) => {
  const appTheme = useTheme();

  return (
    <CategoryContainer>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListCourse', {
            code: content.code,
            title: content.title,
            mode: content.mode,
          })
        }>
        <View>
          <AvatarContainer>
            <Avatar
              size="large"
              rounded
              icon={{
                name: content.icon_name,
                type: content.icon_family,
                color: appTheme.colors.primary,
              }}
            />
          </AvatarContainer>
          <CategoryTitle>{content.title}</CategoryTitle>
          <Text>{content.mode}</Text>
        </View>
      </TouchableOpacity>
    </CategoryContainer>
  );
};

export default Category;
