import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing an icon for the back button

const CategoriesScreen = ({ navigation }) => {
  // State to store categories
  const [categories, setCategories] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from the API
        const response = await fetch("https://api.chucknorris.io/jokes/categories");
        const data = await response.json();
        setCategories(data); // Save categories to state
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false); // Stop loading once fetching is done
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back button to return to the previous screen */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>📂 Select a Category</Text>

      {loading ? (
        // Show a loading spinner while fetching categories
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        // Display categories as a grid
        <FlatList
          data={categories}
          keyExtractor={(item) => item} // Unique key for each category
          numColumns={2} // Display categories in two columns
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            // Button to select a category and navigate back to Home
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate("Home", { category: item })}
            >
              <Text style={styles.buttonText}>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#222831",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#00ADB5",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    margin: 10,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoriesScreen;
