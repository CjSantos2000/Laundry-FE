import React from "react";
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

const SelfService = ({ navigation }) => {
  return (
    <ScrollView>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Add Self Service"
        descriptionLabel="add more riders for the better."
        navigation={navigation}
        buttonContainer={styles.buttonContainer}
        buttonText={styles.buttonText}
        buttonTextLabel={"Add Self Service"}
        buttonNavigation={"Staff Add Self Service"}
      />
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
          <Text style={styles2.headerCell}>Subject</Text>
          <Text style={styles2.headerCell}>Date</Text>
          <Text style={styles2.headerCell}>Actions</Text>
        </View>
        <View style={styles2.row}>
          <Text style={styles2.cell}>34354</Text>
          <Text style={styles2.cell}>Test Subject</Text>
          <Text style={styles2.cell}>May 01, 2022 12:59 PM</Text>
          <View style={styles2.cell}>
            <TouchableOpacity style={styles2.button}>
              <Text style={styles2.buttonText}>[button]</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default SelfService;
