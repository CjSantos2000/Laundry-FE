// import React from "react";
// import { View, Text } from "react-native";

// const AddTransaction = ({ route }) => {
//   const {
//     shop_admin_id,
//     transaction_mode_id,
//     service_id,
//     additional_service_id,
//   } = route.params;

//   console.log(
//     shop_admin_id,
//     transaction_mode_id,
//     service_id,
//     additional_service_id
//   );
//   return (
//     <View>
//       <Text>hey</Text>
//     </View>
//   );
// };

// export default AddTransaction;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../styles/Box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { styles as style3 } from "../../styles/Form";

const AddTransaction = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [render, setRender] = useState(null);
  const {
    transaction_mode_id,
    shop_admin_id,
    service_id,
    additional_service_id,
    price,
    garment_id,
  } = route.params;
  const totalPrice = cartItems.reduce((sum, item) => {
    if (!item.additional_service) {
      return sum + parseInt(item.service.price);
    } else {
      return sum + parseInt(item.additional_service.price);
    }
  }, 0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/staffs/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(
          response.data.response.filter(
            (item) => item.shop_admin_id == shop_admin_id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, [render, route.params.result]);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("staffToken");

      const response = await axios.delete(
        `${"http://192.168.133.240:8000"}/api/staffs/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRender(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cartItems);

  return (
    <ScrollView>
      {/* <View style={styles2.container}>
        <Card style={styles2.card}>
          <Card.Content>
            <Title style={{ fontWeight: "bold" }}>Title</Title>
            <Paragraph>Description</Paragraph>
          </Card.Content>
        </Card>
      </View> */}
      {service_id !== 0 &&
      transaction_mode_id !== 0 &&
      additional_service_id !== 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Add Item</Text>
          <Text style={styles.description}>description</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate("Staff Add Transaction Item", {
                transaction_mode_id: transaction_mode_id,
                service_id: service_id,
                shop_admin_id: shop_admin_id,
                additional_service_id: additional_service_id,
                price: price,
                garment_id: garment_id,
              })
            }
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles2.container}>
        {cartItems.map((item) => (
          <Card style={styles2.card2} key={item.id}>
            <Card.Content>
              <Title style={{ fontWeight: "bold" }}>{item.name}</Title>
              <Paragraph>{item.quantity} pieces</Paragraph>
              <Paragraph>{item.weight} kilogram</Paragraph>
              <Paragraph>
                {item.shop_admin.first_name + " " + item.shop_admin.last_name}
              </Paragraph>
              <Paragraph>{item.transaction_mode.name}</Paragraph>
              <Paragraph>{item.service.name}</Paragraph>
              <Paragraph>{item.garment.name}</Paragraph>
              <Paragraph>
                {item.additional_service === null
                  ? item.additional_service
                  : item.additional_service.name}
              </Paragraph>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
        {cartItems.length !== 0 && (
          <TouchableOpacity
            style={style3.inputButton}
            onPress={() =>
              navigation.navigate("Staff Checkout", {
                shop_admin_id: shop_admin_id,
                price: totalPrice,
              })
            }
          >
            <Text style={style3.inputButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        )}
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

export default AddTransaction;
