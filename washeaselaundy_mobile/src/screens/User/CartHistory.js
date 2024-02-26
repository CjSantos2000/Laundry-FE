import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";

const CartHistory = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/customers/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data.response);
        setCartItems(
          response.data.response.filter((value, index, self) => {
            const currentId = value.shop_admin.id;
            return (
              self.findIndex((entry) => entry.shop_admin.id === currentId) ===
              index
            );
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  // console.log(cartItems);
  return (
    <ScrollView>
      <View style={styles2.container}>
        {cartItems.map((item) => (
          <Card style={styles2.card2} key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Cart", {
                  shop_admin_id: item.shop_admin_id,
                  transaction_mode_id: 0,
                  service_id: 0,
                  additional_service_id: 0,
                })
              }
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>
                  {item.shop_admin.first_name + " " + item.shop_admin.last_name}
                </Title>
                <Paragraph>description</Paragraph>
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
    width: "100%",
    marginBottom: 16,
  },
  card2: {
    width: "49%",
    marginBottom: 16,
  },
  cardImage: {
    height: 150,
  },
});

export default CartHistory;
