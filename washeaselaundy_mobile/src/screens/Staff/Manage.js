import React from "react";
import Box from "../../components/Box";
import { styles } from "../../styles/Box";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Manage = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
       
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Staff Inventory", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="pencil" size={40} color="#FF5733" />
            <Text style={styles2.cardTitle}>Inventory</Text>
          </View>
          <Text style={styles2.cardDescription}>
          Manage your inventory efficiently to keep track of available items and stock levels.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Staff Transactions", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="exchange" size={40} color="#2ecc71" />
            <Text style={styles2.cardTitle}>Transactions</Text>
          </View>
          <Text style={styles2.cardDescription}>
          Monitor and review transactions to ensure accuracy and transparency in financial dealings.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Staff Selling Items", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="shopping-cart" size={40} color="#3498db" />
            <Text style={styles2.cardTitle}>Selling Items</Text>
          </View>
          <Text style={styles2.cardDescription}>
          Keep an eye on the items being sold and manage sales efficiently for better business outcomes.
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles2 = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  cardContent: {
    alignItems: "center",  // Center items horizontally
    justifyContent: "center", // Center items vertically
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,  // Add space between icon and title
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default Manage;
