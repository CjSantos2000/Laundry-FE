import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Dashboard = ({ route, navigation }) => {
  const { transaction_mode_id } = route.params;
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/staffs/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setServices(response.data.response);
        // console.log(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <ScrollView>
      <View style={styles2.container}>
        {services.map((item) => (
          <Card style={styles2.card} key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  item.additional_services.length === 0
                    ? "Staff Garments"
                    : "Staff Additional Services",
                  {
                    shop_admin_id: item.shop_admin_id,
                    transaction_mode_id: transaction_mode_id,
                    service_id: item.id,
                    additional_service_id: null,
                    price: item.price,
                  }
                )
              }
            >
              <Card.Cover
                source={require("../../../assets/images/services.jpg")}
                style={styles2.cardImage}
              />
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph>{item.price} pesos</Paragraph>
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

export default Dashboard;
