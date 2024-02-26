import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Card, Title, Paragraph } from "react-native-paper";
import { styles } from "../../styles/Box";

const TransactionMode = ({ route, navigation }) => {
  const { shop_admin_id } = route.params;

  return (
    <ScrollView>
      <View style={styles2.container}>
        <Card style={styles2.card}>
          <Card.Content>
            <Title style={{ fontWeight: "bold" }}>Selling Items</Title>
            <Paragraph>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
            <TouchableOpacity
              style={[styles.buttonContainer, { marginBottom: 10 }]}
              onPress={() => {
                navigation.navigate("User Selling Items");
              }}
            >
              <Text style={styles.buttonText}>View Items</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Services", {
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
              <Title style={{ fontWeight: "bold" }}>Self Service</Title>
              <Paragraph>Our self-service option provides customers with the flexibility to handle their laundry on their own terms. </Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Services", {
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
              <Paragraph>Our convenient pickup and delivery service brings the laundry experience to your doorstep. </Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("User Services", {
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
              <Paragraph>For customers who want the convenience of dropping off their laundry but prefer to pick it up later, our pickup-only service at our laundry shop is the ideal choice.</Paragraph>
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
