import { Badge } from '@rneui/themed';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
  margin-top: 8px;
`;

export const CategoryContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const AvatarContainer = styled.View`
  align-self: center;
  background-color: ${props => props.theme.PRIMARY_COLOR};
`;

export const CategoryTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  letter-spacing: 0;
  font-weight: 500;
`;

export const CourseSectionView = styled.View`
  margin-top: 20px;
`;

export const CourseImage = styled.Image`
  align-items: center;
  min-height: 80px;
`;

export const CourseDetailImage = styled.Image`
  width: 350px;
  height: 150px;
  align-self: center;
`;

export const CourseTitle = styled.Text`
  color: ${props => props.theme.TITLE_COLOR};
  font-size: 25px;
  font-weight: bold;
  margin-top: 8px;
  margin-left: 8px;
`;

export const HomeTitle = styled.Text`
  color: ${props => props.theme.TITLE_COLOR};
  font-size: 16px;
  font-weight: bold;
  margin: 4px;
`;

export const HomeAuthor = styled.Text`
  font-size: 14px;
  margin-left: 8px;
  color: ${props => props.theme.TITLE_COLOR};
`;

export const CourseAuthor = styled.Text`
  font-size: 18px;
  margin-left: 8px;

  color: ${props => props.theme.TITLE_COLOR};
`;
export const FrequencyView = styled.View`
  font-size: 12px;
  margin-left: 8px;

  color: ${props => props.theme.PRIMARY_COLOR};
  margin-bottom: 2px;
`;

export const CourseDesc = styled.Text`
  font-size: 15px;
  height: 65px;
  width: 340px;
  margin-top: 8px;
`;

export const FlexWrap = styled.View`
  width: 100%;
`;

// export const CourseFlex = styled.View`
//   width: 380px;
//   height: 280px;
// `;

export const ShareView = styled.View`
  margin-right: 20px;
`;

export const FlexView = styled(View)`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-grow: ${props => props.flexGrow || 1};
`;

export const ListCourseModeView = styled.View`
  display: flex;
  margin: 4px;
  justify-content: center;
`;

export const CoursePriceView = styled.View`
  display: flex;
  justify-content: center;
  margin: 4px;
`;

export const CourseDetailModeView = styled.View`
  margin-top: 10px;
  margin-left: 0px;
`;

// export const CourseDetailPriceView = styled.View`
//    margin-left: 110px;
//    margin-top: 5px;
// `;

export const IconView = styled.View`
  margin-right: 20px;
  // color: ${props => props.theme.PRIMARY_COLOR};
`;

// export const HomeView = styled.View`
//   margin-horizontal: 20px;
//   `;

export const HomePriceBadge = styled.View`
  margin-top: 30px;
  display: flex;
`;

export const CourseContainer = styled.SafeAreaView`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.BACKGROUND_COLOR};
  height: 100%;
`;

export const VideoStyle = styled.View`
  background-color: ${props => props.theme.BACKGROUND_COLOR};
  width: 350px;
  height: 150px;
`;

export const PriceBadge = styled(Badge)`
  padding: 8px;
  background-color: red;
`;

export const SpacedFlatList = styled(FlatList)`
  margin-top: 8px;
  margin-bottom: 16px;
`;
