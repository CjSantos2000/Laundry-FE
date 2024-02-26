import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Dashboard = ({ route, navigation }) => {
  const { transaction_mode_id, shop_admin_id, service_id } = route.params;
  const [additionalServices, setAdditionalServices] = useState([]);

  useEffect(() => {
    const fetchAdditionalServices = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/customers/additional-services/${service_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data.additional_services);
        setAdditionalServices(response.data.additional_services);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdditionalServices();
  }, []);

  return (
    <ScrollView>
      <View style={styles2.container}>
        {additionalServices.map((item) => (
          <Card style={styles2.card} key={item.id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("User Garments", {
                  service_id: service_id,
                  transaction_mode_id: transaction_mode_id,
                  shop_admin_id: shop_admin_id,
                  additional_service_id: item.id,
                  price: item.price,
                })
              }
            >
              <Card.Cover
                source={require("../../../assets/images/bg.png")}
                style={styles2.cardImage}
              />
              <Card.Content>
                <Title style={{ fontWeight: "bold" }}>{item.name}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph>{item.price}</Paragraph>
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
