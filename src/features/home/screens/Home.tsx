/* eslint-disable react-hooks/exhaustive-deps */
import { Card, ListItem, SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import {
  CourseAuthor,
  CourseContainer,
  CourseImage,
  CourseTitle,
  CourseView,
  FlexView,
  FlexWrap,
  IconView
} from '../../../../style';
import courseClient from '../../../api/courseClient';
import CourseMode from '../../../components/CourseMode';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { courseImage } from '../../../utils/ImageUtil';
import CourseSection from '../components/CourseSection';
import useHome from '../hooks/useHome';

const Home = ({ navigation }) => {
  const [homeContent, errorMessage, isLoading, refreshing, onDataRefresh] =
    useHome();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [showResults, setShowResults] = useState(false);
  const theme = useTheme();

  const searchCourses = text => {
    // Check if searched text is not blank
    if (text && text.length > 3) {
      // FIXME - Move this to its own hook or utility method
      collectCoursesBySearchTerm(text);
      setSearch(text);
    } else {
      setShowResults(false);
      setSearch(text);
    }
  };

  const collectCoursesBySearchTerm = (searchTerm: any) => {
    courseClient
      .post('/search', { term: searchTerm })
      .then(response => {
        console.log(response.data);
        setSearchResults(response.data);
        setShowResults(true);
      })
      .catch(error => {
        console.log('Error :', error);
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
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity>
          <IconView>
            <Icon
              name="layers-search"
              size={26}
              color={theme.BACKGROUND_COLOR}
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
          containerStyle={{ backgroundColor: theme.SECONDARY_COLOR }}
          inputStyle={{
            color: theme.SECONDARY_COLOR,
            backgroundColor: theme.BACKGROUND_COLOR,
          }}
          inputContainerStyle={{ backgroundColor: theme.BACKGROUND_COLOR }}
        />
      );
    } else {
      return <></>;
    }
  };

  const displaySearchResults = () => {
    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
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
                        <Text>{course.price}</Text>
                      </FlexView>
                      <CourseView>
                        <CourseMode course={course} />
                      </CourseView>
                    </FlexView>
                  </View>
                </Card>
              </TouchableOpacity>
            </FlexWrap>
          </ListItem>
        ))}
      </ScrollView>
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onDataRefresh} />
        }
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {homeContent.map(courseSec => (
          <CourseSection
            content={courseSec}
            key={courseSec.key}
            navigation={navigation}
          />
        ))}
      </ScrollView>
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

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
});
