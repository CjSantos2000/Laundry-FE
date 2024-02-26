import React from "react";
import Box from "../../components/Box";
import { styles } from "../../styles/Box";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Manage = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("Super Admin Shop Admins", {
              result: "",
            });
          }}
        >
          <View style={styles2.cardContent}>
            <Icon name="user-circle" size={40} color="#FF5733" />
            <Text style={styles2.cardTitle}>Shop Admins</Text>
          </View>
          <Text style={styles2.cardDescription}>
          Manage and oversee administrators responsible for the day-to-day operations of your shop.
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
