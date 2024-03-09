import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../styles/Box";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const TransactionItemsHistory = ({ route }) => {
  const { transaction_id } = route.params;
  const [transaction, setTransaction] = useState(null);
  const [render, setRender] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/customers/transactions/${transaction_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransaction(response.data.response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, [render]);

  const renderRatingStars = (rating) => {
    const stars = Array.from({ length: 5 }).map((_, index) => (
      <Feather
        key={index}
        name={index < rating ? "star" : ""}
        size={16}
        color="black"
      />
    ));
    return <View style={{ flexDirection: "row", marginTop: 20 }}>{stars}</View>;
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const response = await axios.delete(
        `${`${API_BASE_URL}/api/customers/login`}/api/customers/feedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRender(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles2.container}>
        {transaction !== null && (
          <Card style={styles2.card}>
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>{transaction.name}</Title>
              <Paragraph>
                {transaction.shop_admin.first_name +
                  " " +
                  transaction.shop_admin.last_name}
              </Paragraph>
              <Paragraph>{transaction.total_price} pesos</Paragraph>
              <Paragraph>{transaction.address}</Paragraph>
              <Paragraph>{transaction.date}</Paragraph>
              {/* <Paragraph>{transaction.time}</Paragraph> */}
              <Paragraph>{transaction.status.name}</Paragraph>
              <Paragraph>{transaction.payment_method.name}</Paragraph>
              <Paragraph>{transaction.special_instruction}</Paragraph>
            </Card.Content>
          </Card>
        )}
        {transaction !== null && (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#38383b",
              width: "100%",
              marginBottom: 30,
            }}
          >
            Items:
          </Text>
        )}
        {transaction !== null &&
          transaction.items.map((item) => (
            <Card style={styles2.card2} key={item.id}>
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>{item.name}</Title>
                <Paragraph>{item.quantity} pieces</Paragraph>
                <Paragraph>{item.weight} kilogram</Paragraph>
                <Paragraph>{item.transaction_mode.name}</Paragraph>
                <Paragraph>{item.service.name}</Paragraph>
                <Paragraph>{item.garment.name}</Paragraph>
                <Paragraph>
                  {item.additional_service === null
                    ? item.additional_service
                    : item.additional_service.name}
                </Paragraph>
                <Paragraph>
                  {item.machine === null ? item.machine : item.machine.name}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        {transaction !== null && (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#38383b",
              width: "100%",
              marginBottom: 30,
            }}
          >
            Feedbacks:
          </Text>
        )}
        {transaction !== null &&
          transaction.feedbackss.map((item) => (
            <Card style={styles2.card2} key={item.id}>
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>{item.message}</Title>
                <Paragraph>
                  {item.customer.first_name + " " + item.customer.last_name}
                </Paragraph>
                {renderRatingStars(item.rating)}
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </Card.Content>
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

export default TransactionItemsHistory;
