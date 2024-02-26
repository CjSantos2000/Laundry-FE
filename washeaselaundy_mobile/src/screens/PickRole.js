import React from "react";
import { View, Text, TextInput,Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
      <Image
            source={require('../../assets/images/logo1.png')} // Update with your actual image path
            style={{ width: 230, height: 230, marginTop: 100, marginBottom: 2 }} // Adjust width, height, and marginTop as needed
          />
          <Text style={styles.title}>
            <Text style={{ fontWeight: 'bold', color: 'black', textTransform: 'capitalize' }}>Welcome to </Text>
            <Text style={{ fontWeight: 'bold', color: '#4e60de' }}>WashEase!</Text>
          </Text>
        <Text style={styles.description}>Pick Role.</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("User Login")}
        >
          <Text style={styles.inputButtonText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Rider Login")}
        >
          <Text style={styles.inputButtonText}>Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Staff Login")}
        >
          <Text style={styles.inputButtonText}>Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Shop Admin Login")}
        >
          <Text style={styles.inputButtonText}>Shop Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Super Admin Login")}
        >
          <Text style={styles.inputButtonText}>Super Admin</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
