import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import CarouselComponent from '../../styles/CustomerBanner';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const Dashboard = ({ navigation }) => {
  const [shopAdmins, setShopAdmins] = useState([]);
  const allRatings = shopAdmins.flatMap((admin) =>
    admin.transactions.flatMap((transaction) =>
      transaction.feedbacks.map((feedback) => feedback.rating)
    )
  );

  const totalAverage =
    allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

  const roundedAverage = totalAverage.toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/customers/shop_admins`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setShopAdmins(response.data.shop_admins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <ScrollView>
      <CarouselComponent />
      <View style={styles2.container}>
      {/* <CarouselComponent /> */}
        {shopAdmins.map((item) => (
          
          <Card style={styles2.card} key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Transaction Modes", {
                  shop_admin_id: item.id,
                })
              }
            >
              <Card.Cover
                source={require("../../../assets/images/shop.png")}
                style={styles2.cardImage}
              />
              <Card.Content>
              <Title style={{ fontWeight: 'bold' }}>{item.shop_name}</Title>
                <Paragraph>{item.address}</Paragraph>
                <Paragraph>{item.phone_number}</Paragraph>
                {/* <Paragraph>{item.email}</Paragraph> */}
                <Paragraph style={{ marginTop: 10 }}>
                  <Feather name="star" size={20} color="orange" />{" "}
                  {roundedAverage}
                </Paragraph>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        ))}
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
    width: "48%",
    marginBottom: 16,
  },
  cardImage: {
    height: 150,
  },
});

export default Dashboard;
