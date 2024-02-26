import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/SuperAdmin/Dashboard";
import Manage from "../screens/SuperAdmin/Manage";
import Notification from "../screens/SuperAdmin/Notification";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Super Admin Account")}
            style={{ marginRight: 15 }}
          >
            <Feather name="user" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Super Admin Account")}
            style={{ marginLeft: 15 }}
          >
            <Image
              source={require("../../assets/images/logo1.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
              }}
            />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "#0d6efd",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#0d6efd" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Manage"
        component={Manage}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="columns"
              size={24}
              color={focused ? "#0d6efd" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="bell"
              size={24}
              color={focused ? "#0d6efd" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
