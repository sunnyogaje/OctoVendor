
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreateMenu() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow access to your gallery to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: 100 ,paddingHorizontal: 20,},
          { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/(main)/food/menu")}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Menu</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Input Fields */}
        <TextInput
          placeholder="Menu name"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#999"
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
        />

        {/* Upload Image */}
        <View style={styles.uploadBox}>
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          <Ionicons name="cloud-upload-outline" size={32} color="#333" style={{ marginTop: image ? 10 : 0 }} />
          <TouchableOpacity onPress={handleImageUpload} style={styles.uploadBtn}>
            <Text style={styles.uploadText}>Upload image</Text>
          </TouchableOpacity>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>Create Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "Lato",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
  },
  uploadBox: {
    backgroundColor: "#f6f6f8",
    borderRadius: 10,
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    padding: 10,
  },
  uploadBtn: {
    marginTop: 10,
    backgroundColor: "#4A154B",
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 7,
  },
  uploadText: {
    color: "#E7E8E9",
    fontSize: 12,
  },
  imagePreview: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  createBtn: {
    backgroundColor: "#4A154B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: "25%",
  },
  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
