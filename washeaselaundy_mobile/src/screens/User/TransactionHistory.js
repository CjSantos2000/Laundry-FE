import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { styles } from "../../styles/Box";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const TransactionHistory = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/customers/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  // console.log(transactions);

  return (
    <ScrollView>
      <View style={styles2.container}>
        {transactions.map((item) => (
          <Card style={styles2.card} key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Transaction Items History", {
                  transaction_id: item.id,
                })
              }
            >
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>{item.name}</Title>
                <Paragraph>
                  {item.shop_admin.first_name + " " + item.shop_admin.last_name}
                </Paragraph>
                <Paragraph>{item.total_price} pesos</Paragraph>
                <Paragraph>{item.address}</Paragraph>
                <Paragraph>{item.date}</Paragraph>
                <Paragraph>{item.status.name}</Paragraph>
                <Paragraph>{item.payment_method.name}</Paragraph>
                <Paragraph>{item.special_instruction}</Paragraph>
                <TouchableOpacity
                  style={[styles.buttonContainer, { marginBottom: 10 }]}
                  onPress={() =>
                    navigation.navigate("User Feedback", {
                      transaction_id: item.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Add Feedback</Text>
                </TouchableOpacity>
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
  cardImage: {
    height: 150,
  },
});

export default TransactionHistory;
