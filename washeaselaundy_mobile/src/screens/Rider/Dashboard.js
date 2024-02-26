import React from "react";
import Box from "../../components/Box";
import { styles } from "../../styles/Box";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import CarouselComponent from '../../styles/Banner';

const Dashboard = ({ navigation }) => {
  return (
    <ScrollView>
      
      <CarouselComponent />
      <View style={styles1.container}>
      {/* <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Welcome, Staff"
        // descriptionLabel="juanrobert@mail.com"
      />
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Additional Information"
        descriptionLabel="As a valued member of our team, you play a crucial role in providing excellent service to our customers. Please explore the app to access your tools and features. If you have any questions or need assistance, feel free to reach out to our support team. Thank you for your dedication and hard work!"
      /> */}
      <View style={styles1.welcomeContainer}>
      
        <Text style={styles1.welcomeText}>Welcome, Rider!</Text>
        <Text style={styles1.subText}>
        We're glad to have you on board. Your role is crucial in ensuring timely and efficient deliveries. Let's get started!
        </Text>
      </View>

      <TouchableOpacity
        style={styles1.getStartedButton}
        // onPress={() => navigation.navigate("")}
      >
        <Text style={styles1.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: "#4e60de",
    padding: 15,
    borderRadius: 8,
    marginHorizontal:20,
  },
  getStartedButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Dashboard;
