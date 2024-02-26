import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Transactions = ({ navigation, route }) => {
  const { result } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState(null);
  console.log(transactions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/staffs/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data.transactions);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    getUserData();
  }, [result]);

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("staffData");
      if (storedUserData) {
        // Parse the stored JSON string to an object
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add Transaction</Text>
        <Text style={styles.description}>add more riders for the better.</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Staff Transaction Modes", {
              shop_admin_id: userData.shop_admin_id,
            })
          }
        >
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles2.input}
          placeholder="Search by Name"
          secureTextEntry
        />
        {navigation && (
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        )}
      </View> */}
      <View style={styles2.table}>
        <View style={styles2.headerRow}>
          <Text style={styles2.headerCell}>ID</Text>
          <Text style={styles2.headerCell}>Name</Text>
          <Text style={styles2.headerCell}>Customer</Text>
          <Text style={styles2.headerCell}>Status</Text>
          <Text style={styles2.headerCell}>Actions</Text>
        </View>
        {transactions.map((item) => (
          <View style={styles2.row} key={item.id}>
            <Text style={styles2.cell}>{item.id}</Text>
            <Text style={styles2.cell}>{item.name}</Text>
            <Text style={styles2.cell}>
              {item.customer.first_name + " " + item.customer.last_name}
            </Text>
            <Text style={styles2.cell}>{item.status.name}</Text>
            <View style={styles2.cell}>
              <TouchableOpacity
                style={styles2.button}
                onPress={() =>
                  navigation.navigate("Staff View Transaction", {
                    transaction_id: item.id,
                  })
                }
              >
                <Text style={styles2.buttonText}>View</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles2.button}
                onPress={() =>
                  navigation.navigate("Staff Edit Transaction", {
                    transaction_id: item.id,
                  })
                }
              >
                <Text style={styles2.buttonText}>Edit</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderWidth: 1,
    borderBlockColor: "#d0d4dc",
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    backgroundColor: "#fffcfc",
  },
  row: {
    flexDirection: "row",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
  },
  button: {
    marginBottom: 6,
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Transactions;
