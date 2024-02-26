import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const AddAdditionalLaundryService = ({ navigation }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/shop_admins/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setServices(
          response.data.services.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.post(
        `${"http://192.168.133.240:8000"}/api/shop_admins/additional-services/add`,
        {
          name: name,
          description: description,
          price: price,
          service_id: service,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Shop Admin Additional Laundry Services", {
        result: response.data.message,
      });
    } catch (error) {
      setError("");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Additional Laundry Service</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <Text style={styles.description}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <DropDownPicker
          open={open}
          value={service}
          items={services}
          setOpen={setOpen}
          setValue={setService}
          setItems={setServices}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddAdditionalLaundryService;
