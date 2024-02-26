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

const ViewTransaction = ({ route, navigation }) => {
  const { transaction_id, result } = route.params;
  const [transaction, setTransaction] = useState(null);
  console.log(transaction);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/staffs/transactions/${transaction_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransaction(response.data.transaction[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [result]);

  // console.log(transaction);
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
              <Paragraph>{transaction.time}</Paragraph>
              <Paragraph>{transaction.status.name}</Paragraph>
              <Paragraph>{transaction.payment_method.name}</Paragraph>
              <Paragraph>{transaction.special_instruction}</Paragraph>
            </Card.Content>
          </Card>
        )}
        {transaction !== null && (
          <Text
            style={{
              fontSize: 16,
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
                <Paragraph>{item.status.name}</Paragraph>
                <Paragraph>
                  {item.machine === null
                    ? null
                    : item.machine.name + " (" + item.machine.status_id + ") "}
                </Paragraph>
                <Paragraph>
                  {item.additional_service === null
                    ? item.additional_service
                    : item.additional_service.name}
                </Paragraph>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() =>
                    navigation.navigate("Staff Edit Transaction Item", {
                      transaction_item_id: item.id,
                      transaction_mode_id: item.transaction_mode.id,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                {item.machine === null ? null : (
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() =>
                      navigation.navigate("Staff Edit Machine Status", {
                        machine_id: item.machine.id,
                        transaction_id: transaction_id,
                        machine_status_id: item.machine.status_id,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Change Machine Status</Text>
                  </TouchableOpacity>
                )}
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

export default ViewTransaction;
