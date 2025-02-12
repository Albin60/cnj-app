import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "./CategoriesScreen"; // Importimi i ekranit të ri

const Stack = createStackNavigator();

const HomeScreen = ({ navigation, route }) => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [category, setCategory] = useState(route.params?.category || "");

  const fetchJoke = async () => {
    setLoading(true);
    setButtonPressed(true);
    try {
      let url = "https://api.chucknorris.io/jokes/random";
      if (category) {
        url += `?category=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setJoke("Failed to load joke. Try again!");
    } finally {
      setLoading(false);
      setTimeout(() => setButtonPressed(false), 200);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Chuck Norris Jokes 🔥</Text>

      <Image source={{ uri: "https://i.imgur.com/jp3iEZD.jpeg" }} style={styles.image} />

      <View style={styles.jokeContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff6600" />
        ) : (
          <Text style={styles.jokeText}>{joke}</Text>
        )}
      </View>

      <TouchableOpacity style={[styles.button, buttonPressed && styles.buttonPressed]} onPress={fetchJoke}>
        <Text style={styles.buttonText}>😂 Get New Joke</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate("Categories")}>
        <Text style={styles.buttonText}>📂 Select Category</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 🔹 Styles (mbeten të njëjtat)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#222831",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  jokeContainer: {
    backgroundColor: "#393E46",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: "90%",
  },
  jokeText: {
    fontSize: 18,
    color: "#EEEEEE",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#00ADB5",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
