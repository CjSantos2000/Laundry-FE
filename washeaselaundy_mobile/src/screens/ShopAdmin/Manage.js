import React from "react";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../styles/Box";

const ManagetAccounts = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Shop Admin Riders", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="motorcycle" size={40} color="#3498db" />
            <Text style={styles2.cardTitle}>Riders</Text>
          </View>
          <Text style={styles2.cardDescription}>
            Manage and track rider accounts to ensure timely and efficient delivery services.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Shop Admin Staffs", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="users" size={40} color="#e74c3c" />
            <Text style={styles2.cardTitle}>Staffs</Text>
          </View>
          
          <Text style={styles2.cardDescription}>
            Administer staff accounts to streamline day-to-day operations.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Shop Admin Machines", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="gears" size={40} color="#2ecc71" />
            <Text style={styles2.cardTitle}>Machines</Text>
          </View>
          <Text style={styles2.cardDescription}>
            Monitor and control machine accounts for effective laundry processing.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Shop Admin Laundry Services", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="list-alt" size={40} color="#f39c12" />
            <Text style={styles2.cardTitle}>Laundry Services</Text>
          </View>
          <Text style={styles2.cardDescription}>
            Manage laundry service accounts to offer a seamless experience for customers.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Shop Admin Additional Laundry Services", {
              result: "",
            })
          }
        >
          <View style={styles2.cardContent}>
            <Icon name="plus" size={40} color="#9b59b6" />
            <Text style={styles2.cardTitle}>Additional Laundry Services</Text>
          </View>
          <Text style={styles2.cardDescription}>
            Administer accounts for additional laundry services to enhance customer choices.
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
export default ManagetAccounts;