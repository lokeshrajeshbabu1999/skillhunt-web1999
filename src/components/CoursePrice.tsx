import { Badge } from '@rneui/themed';
import { View } from 'react-native';
import { FlexView } from '../../style';

const CoursePrice = ({ course }) => {
    const getPrice = (courseInput: { price: string }) => {
        let price = '';
        if (courseInput.price) {
            if (courseInput.price === '0') {
                price = 'Free';
            } else {
                price = 'Rs ' + courseInput.price;
            }
        }
        return price;
    };

    const displayPriceBadge = (courseInput: { price: any }) => {
        return courseInput.price ? <Badge value={getPrice(courseInput)} /> : <></>;
    };
    return (
        <FlexView>
            <View>{displayPriceBadge(course)}</View>
        </FlexView>
    );
};

export default CoursePrice;