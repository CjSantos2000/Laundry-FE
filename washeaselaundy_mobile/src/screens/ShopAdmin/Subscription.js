import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import { CheckBox } from "react-native-elements";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Subscription = ({ navigation, route }) => {
  const { subscription_id } = route.params;
  const [shopName, setShopName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [paymentScreenshot, setPaymentScreenshot] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("shopAdminToken");
    if (token) {
      navigation.navigate("Shop Admin Tab Navigator", { screen: "Dashboard" });
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${"http://192.168.133.240:8000"}/api/shop_admins/register`,
        {
          shop_name: shopName,
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phoneNumber,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
          subscription_id: subscription_id,
          payment_screenshot: "null",
        }
      );

      // const { token, user } = response.data.response;

      console.log(response.data.message);
      // await AsyncStorage.setItem("shopAdminToken", token);
      // await AsyncStorage.setItem("shopAdminData", JSON.stringify(user));

      navigation.navigate("Shop Admin Login");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.description}>Create a new account.</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Shop name"
          value={shopName}
          onChangeText={(text) => setShopName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          secureTextEntry
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Payment Screenshot"
          value={paymentScreenshot}
          onChangeText={(text) => setPaymentScreenshot(text)}
        /> */}
        <TouchableOpacity style={styles.inputButton} onPress={handleRegister}>
          <Text style={styles.inputButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>
          Already have an account?{" "}
          <Text
            style={styles.subInputText}
            onPress={() => navigation.navigate("Shop Admin Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Subscription;
