import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ikona për shigjetën e kthimit

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.chucknorris.io/jokes/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Shigjeta për kthim */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>📂 Select a Category</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff6600" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          numColumns={2} // Dy kolona për një layout më të mirë
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
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
