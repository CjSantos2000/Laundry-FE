import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/shop_admins/login`,
        {
          email,
          password,
        }
      );
      const { token, user } = response.data.response;

      await AsyncStorage.setItem("shopAdminToken", token);
      await AsyncStorage.setItem("shopAdminData", JSON.stringify(user));

      setEmail("");
      setPassword("");
      navigation.navigate("Shop Admin Tab Navigator", { screen: "Dashboard" });
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Welcome Shop Admin!</Text>
        <Text style={styles.description}>Login to continue.</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleLogin}>
          <Text style={styles.inputButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>
          Don't have an Account?{" "}
          <Text
            style={styles.subInputText}
            onPress={() => navigation.navigate("Shop Admin Pick Subscription")}
          >
            Subscription
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Login;
