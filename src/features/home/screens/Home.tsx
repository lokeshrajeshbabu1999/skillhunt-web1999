import { StackScreenProps } from '@react-navigation/stack';
import { Card, ListItem, SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';

import styled from 'styled-components/native';
import {
  CourseAuthor,
  CourseContainer,
  CourseImage,
  CourseTitle,
  FlexView,
  FlexWrap,
  IconView,
} from '../../../../style';
import courseClient from '../../../api/courseClient';
import CourseMode from '../../../components/CourseMode';
import CoursePrice from '../../../components/CoursePrice';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { CourseType } from '../../../types/CourseType';
import shLogger from '../../../utils/Loggers';
import { courseImage } from '../../../utils/MediaUtil';
import CourseSection from '../components/CourseSection';
import { HomeStackParamList } from '../components/HomeStack';
import useHome from '../hooks/useHome';

type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [homeContent, errorMessage, isLoading, refreshing, onDataRefresh] =
    useHome();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<CourseType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const appTheme = useTheme();

  const searchCourses = (text: string) => {
    // Check if searched text is not blank
    if (text && text.length > 3) {
      collectCoursesBySearchTerm(text);
      setSearch(text);
    } else {
      setShowResults(false);
      setSearch(text);
    }
  };

  const collectCoursesBySearchTerm = (searchTerm: string) => {
    courseClient
      .post('/search', { term: searchTerm })
      .then(response => {
        shLogger.debug(response.data);
        setSearchResults(response.data);
        setShowResults(true);
      })
      .catch(error => {
        shLogger.error('Error in collectCoursesBySearchTerm:', error);
      });
  };

  const swapSearchBarDisplay = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <IconView>
            <Icon
              name="layers-search"
              size={26}
              color={appTheme.colors.primaryText}
              onPress={() => swapSearchBarDisplay()}
            />
          </IconView>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderSearchBar = (showSearchBarFlag: boolean) => {
    if (showSearchBarFlag) {
      return (
        <SearchBar
          lightTheme
          placeholder="Type Here..."
          onChangeText={text => searchCourses(text)}
          onClear={() => searchCourses('')}
          value={search}
          containerStyle={{ backgroundColor: appTheme.colors.background }}
          inputStyle={{
            color: appTheme.colors.backgroundText,
            backgroundColor: appTheme.colors.background,
          }}
          inputContainerStyle={{ backgroundColor: appTheme.colors.background }}
        />
      );
    } else {
      return <></>;
    }
  };

  const displaySearchResults = () => {
    return (
      <Scroll showsVerticalScrollIndicator={false}>
        {searchResults.map((course, i) => (
          <ListItem key={i} bottomDivider>
            <FlexWrap>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CourseDetail', { id: course.course_id })
                }>
                <Card>
                  <CourseImage
                    source={{
                      uri: courseImage(course.image),
                    }}
                  />
                  <View>
                    <CourseTitle>{course.title}</CourseTitle>
                    <FlexView direction="row">
                      <FlexView direction="column">
                        <CourseAuthor>{course.author}</CourseAuthor>
                        <CoursePrice course={course} />
                      </FlexView>
                      <CourseMode course={course} />
                    </FlexView>
                  </View>
                </Card>
              </TouchableOpacity>
            </FlexWrap>
          </ListItem>
        ))}
      </Scroll>
    );
  };
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
    return errorMessage === '' ? displayHomeContent() : skillMessage();
  };

  const displayMainContent = () => {
    return (
      <View>{isLoading ? skillActivityIndicator() : displayResult()}</View>
    );
  };

  const displayHomeContent = () => {
    return (
      <Scroll
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {homeContent.map(
          courseSec =>
            courseSec.courses.length > 0 && (
              <CourseSection
                content={courseSec}
                key={courseSec.key}
                navigation={navigation}
              />
            ),
        )}
      </Scroll>
    );
  };

  return (
    <View>
      {renderSearchBar(showSearchBar)}
      {showResults ? displaySearchResults() : displayMainContent()}
    </View>
  );
};
export default Home;

const Scroll = styled(ScrollView)`
  margin-horizontal: 8px;
`;
