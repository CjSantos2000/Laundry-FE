import React, { useState, useEffect } from "react";
import Box from "../../components/Box";
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

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ShopAdmins = ({ navigation, route }) => {
  const { result } = route.params;
  const [shopAdmins, setShopAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("superAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}}/api/super_admins/shop_admins`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.shop_admins);
        setShopAdmins(response.data.shop_admins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [result]);

  return (
    <ScrollView>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Shop Admins"
        descriptionLabel="add more riders for the better."
      />
      <View style={styles2.table}>
        <View style={styles2.headerRow}>
          <Text style={styles2.headerCell}>ID</Text>
          <Text style={styles2.headerCell}>Name</Text>
          <Text style={styles2.headerCell}>Status</Text>
          <Text style={styles2.headerCell}>Actions</Text>
        </View>
        {shopAdmins.map((item) => (
          <View style={styles2.row} key={item.id}>
            <Text style={styles2.cell}>{item.id}</Text>
            <Text style={styles2.cell}>{item.shop_name}</Text>
            <Text style={styles2.cell}>
              {item.subscription.status_id === 1
                ? "Pending"
                : item.subscription.status_id === 6
                ? "Successful"
                : item.subscription.status_id === 10
                ? "Failed"
                : ""}
            </Text>
            <View style={styles2.cell}>
              <TouchableOpacity
                style={styles2.button}
                onPress={() => {
                  navigation.navigate("Super Admin View Shop Admins", {
                    shop_admin: item,
                  });
                }}
              >
                <Text style={styles2.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles2.button}
                onPress={() => {
                  navigation.navigate("Super Admin Edit Shop Admins Status", {
                    shop_admin: item,
                  });
                }}
              >
                <Text style={styles2.buttonText}>Edit Status</Text>
              </TouchableOpacity>
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

export default ShopAdmins;