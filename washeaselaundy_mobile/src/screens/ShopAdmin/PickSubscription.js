import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const PickSubscription = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View style={styles2.container}>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Shop Admin Subscription", {
                subscription_id: 1,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/onemonth.png")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>1 Month</Title>
              <Paragraph>Description</Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
        <Card style={styles2.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Shop Admin Subscription", {
                subscription_id: 2,
              })
            }
          >
            <Card.Cover
              source={require("../../../assets/images/oneyear.png")}
              style={styles2.cardImage}
            />
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>1 Year</Title>
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

export default PickSubscription;
