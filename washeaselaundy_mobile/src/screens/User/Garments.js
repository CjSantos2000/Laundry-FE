import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const Garments = ({ route, navigation }) => {
  const {
    transaction_mode_id,
    shop_admin_id,
    service_id,
    additional_service_id,
    price,
  } = route.params;

  console.log(
    transaction_mode_id,
    shop_admin_id,
    service_id,
    additional_service_id,
    price
  );
  return (
    <ScrollView>
      <View style={styles2.container}>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Cart", {
                transaction_mode_id: transaction_mode_id,
                shop_admin_id: shop_admin_id,
                service_id: service_id,
                additional_service_id: additional_service_id,
                price: price,
                garment_id: 1,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/garments.png")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Regular Clothes</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Cart", {
                transaction_mode_id: transaction_mode_id,
                shop_admin_id: shop_admin_id,
                service_id: service_id,
                additional_service_id: additional_service_id,
                price: price,
                garment_id: 2,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/garments2.png")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>
                Maong Pants & Thick Jackets
              </Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 18,
  },
  card: {
    width: "100%",
    marginBottom: 16,
  },
  cardImage: {
    height: 150,
  },
});

export default Garments;
