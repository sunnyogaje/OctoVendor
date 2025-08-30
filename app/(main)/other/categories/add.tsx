import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddCategoryScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
        contentContainerStyle={[
          { paddingBottom: 100 },
          { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) },
        ]}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(main)/other/menu")}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add category</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Category title"
          placeholderTextColor="#888"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#888"
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Save button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save category</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  form: {
    marginTop: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d4b4e0", // soft purple border
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    // marginTop: 50,
    backgroundColor: "#4A154B", // deep purple
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical:'30%',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily:'Lato',
  },
});
