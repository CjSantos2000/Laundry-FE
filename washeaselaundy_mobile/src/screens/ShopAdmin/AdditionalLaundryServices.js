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

const AdditionalLaundryServices = ({ navigation, route }) => {
  const { result } = route.params;
  const [additionalLaundryServices, setAdditionalLaundryServices] = useState(
    []
  );
  const [render, setRender] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/shop_admins/additional-services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data);
        setAdditionalLaundryServices(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [result, render]);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.delete(
        `${API_BASE_URL}/api/shop_admins/additional-services/${id}`,
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

  return (
    <ScrollView>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Add Additional Laundry Service"
        descriptionLabel="add more additional laundry service for the better."
        navigation={navigation}
        buttonContainer={styles.buttonContainer}
        buttonText={styles.buttonText}
        buttonTextLabel={"Add"}
        buttonNavigation={"Shop Admin Add Additional Laundry Service"}
      />
      <View style={styles2.table}>
        <View style={styles2.headerRow}>
          <Text style={styles2.headerCell}>ID</Text>
          <Text style={styles2.headerCell}>Name</Text>
          <Text style={styles2.headerCell}>Price</Text>
          <Text style={styles2.headerCell}>Service</Text>
          <Text style={styles2.headerCell}>Actions</Text>
        </View>
        {additionalLaundryServices.map((item) => (
          <View style={styles2.row} key={item.id}>
            <Text style={styles2.cell}>{item.id}</Text>
            <Text style={styles2.cell}>{item.name}</Text>
            <Text style={styles2.cell}>{item.price}</Text>
            <Text style={styles2.cell}>{item.service.name}</Text>
            <View style={styles2.cell}>
              <TouchableOpacity
                style={styles2.button}
                onPress={() =>
                  navigation.navigate(
                    "Shop Admin View Additional Laundry Service",
                    {
                      additional_service_id: item.id,
                    }
                  )
                }
              >
                <Text style={styles2.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles2.button}
                onPress={() =>
                  navigation.navigate(
                    "Shop Admin Edit Additional Laundry Service",
                    {
                      additional_service_id: item.id,
                    }
                  )
                }
              >
                <Text style={styles2.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles2.button}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles2.buttonText}>Delete</Text>
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

export default AdditionalLaundryServices;
