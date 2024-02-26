import React from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const BannerSlider = () => {
    const bannerImage = require('../../assets/images/shop.jpg');


    const renderItem = ({ item }) => (
        <Image source={item.image} style={styles.bannerImage} />
    );

    return (
        <View style={styles.container}>
            <Image source={bannerImage} style={styles.bannerImage} />
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 250, // Adjust the height as needed
        marginTop: 2,
    },
    bannerImage: {
        width,
        height: '100%',
        resizeMode: 'cover',
    },
});

export default BannerSlider;