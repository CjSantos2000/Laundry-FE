import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const TransactionMode = ({ navigation, route }) => {
  const { shop_admin_id } = route.params;

  return (
    <ScrollView>
      <View style={styles2.container}>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Staff Services", {
                transaction_mode_id: 1,
                shop_admin_id: shop_admin_id,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/selfservice.jpg")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Self Sevice</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Staff Services", {
                transaction_mode_id: 2,
                shop_admin_id: shop_admin_id,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/pickupdelivery.jpg")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Pickup and Delivery</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Staff Services", {
                transaction_mode_id: 3,
                shop_admin_id: shop_admin_id,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/pickup.jpg")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Pickup Only</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Staff Services", {
                transaction_mode_id: 4,
                shop_admin_id: shop_admin_id,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/dropoff.jpg")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Dropoff</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Staff Services", {
                transaction_mode_id: 5,
                shop_admin_id: shop_admin_id,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/dropoffdelivery.jpg")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>Dropoff and Delivery</Title>
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

export default TransactionMode;
