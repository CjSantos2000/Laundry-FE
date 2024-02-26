import React, { useState, useRef } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Text } from 'react-native';

const BannerSlider = () => {
    const banners = [
        { id: '1', image: require('../../assets/images/laundry2.jpg') },
        { id: '2', image: require('../../assets/images/aboutus.jpg') },
        { id: '3', image: require('../../assets/images/laundry3.jpg') },
        // Add more banner images as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = ({ item }) => (
        <Image source={item.image} style={styles.bannerImage} />
    );

    const pagination = () => (
        <View style={styles.paginationContainer}>
            {banners.map((_, index) => (
                <Text
                    key={index}
                    style={[
                        styles.paginationDot,
                        index === currentIndex && styles.activeDot,
                    ]}
                >
                    ●
                </Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={banners}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate="normal"
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / width);
                    setCurrentIndex(index);
                }}
            />
            {pagination()}
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 250, // Adjust the height as needed
    },
    bannerImage: {
        width,
        height: '100%',
        resizeMode: 'cover',
    },
    paginationContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    paginationDot: {
        margin: 3,
        color: 'gray',
    },
    activeDot: {
        color: 'black',
    },
});

export default BannerSlider;