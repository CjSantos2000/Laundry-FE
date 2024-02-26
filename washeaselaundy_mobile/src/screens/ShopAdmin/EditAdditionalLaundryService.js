import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

const EditAdditionalLaundryService = ({ navigation, route }) => {
  const { additional_service_id } = route.params;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  // console.log(additional_service_id);

  useEffect(() => {
    const fetchServices = async () => {
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
    const fetchService = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/shop_admins/additional-services/${additional_service_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.additional_service.name);
        setDescription(response.data.additional_service.description);
        setPrice(response.data.additional_service.price);
        setService(response.data.additional_service.service_id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.put(
        `${"http://192.168.133.240:8000"}/api/shop_admins/additional-services/${additional_service_id}`,
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

export default EditAdditionalLaundryService;
