import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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

import UploadIcon from "@/assets/icons/upload.png";

export default function AddProduct() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]); // will store URIs
  const [videos, setVideos] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sections, setSections] = useState([]);

  const isFilled =
    name && category && description && details && images.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: 100 },
          { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add product</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Product Name */}
          <View style={styles.inputBox}>
            <Ionicons name="grid-outline" size={18} color="#6A1B9A" />
            <TextInput
              placeholder="Name of product"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputBox}>
            <Ionicons name="grid-outline" size={18} color="#6A1B9A" />
            <Picker
              selectedValue={category}
              style={{ flex: 1, color: category ? "#000" : "#999" }}
              dropdownIconColor="#6A1B9A"
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Fashion" value="fashion" />
              <Picker.Item label="Electronics" value="electronics" />
              <Picker.Item label="Home" value="home" />
            </Picker>
          </View>

          {/* Product description */}
          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={styles.textArea}
            placeholder=""
            placeholderTextColor="#aaa"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Product Details */}
          <Text style={styles.label}>Product Details</Text>
          <TextInput
            style={styles.textArea}
            placeholder=""
            placeholderTextColor="#aaa"
            multiline
            value={details}
            onChangeText={setDetails}
          />
        </View>

        {/* Media Section */}
        <View style={styles.card}>
          {images.length > 0 ? (
            <>
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img }}
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />
              ))}
              <TouchableOpacity style={styles.mediaBox}>
                <Image
                  source={UploadIcon}
                  style={{ width: 40, height: 40, tintColor: "#999" }}
                />
                <Text style={styles.mediaText}>Add video</Text>
                <Text style={styles.mediaSubText}>
                  (Not more than 10mb size)
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.mediaBox}>
                <Image
                  source={UploadIcon}
                  style={{ width: 40, height: 40, tintColor: "#999" }}
                />
                <Text style={styles.mediaText}>Add image</Text>
                <Text style={styles.mediaSubText}>
                  (Not more than 5mb size)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mediaBox}>
                <Image
                  source={UploadIcon}
                  style={{ width: 40, height: 40, tintColor: "#999" }}
                />
                <Text style={styles.mediaText}>Add video</Text>
                <Text style={styles.mediaSubText}>
                  (Not more than 10mb size)
                </Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.smallBtn, { flexDirection: "column" }]}
            >
              <Image
                source={UploadIcon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "#999",
                  marginBottom: 4,
                }}
              />
              <Text style={styles.smallBtnText}>Add image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sizes */}
        <View style={styles.card}>
          <Text style={styles.toggleText}>Product has different sizes</Text>
          <View style={styles.innerCard}>
            <TouchableOpacity style={styles.addRow}>
              <Ionicons name="add-circle" size={20} color="#111" />
            </TouchableOpacity>
            {sizes.length > 0 &&
              sizes.map((s, idx) => (
                <Text key={idx} style={styles.itemText}>
                  {s}
                </Text>
              ))}
          </View>
        </View>

        {/* Colors */}
        <View style={styles.card}>
          <Text style={styles.toggleText}>Product has different Colors</Text>
          <View style={styles.innerCard}>
            <TouchableOpacity style={styles.addRow}>
              <Ionicons name="add-circle" size={20} color="#111" />
            </TouchableOpacity>
            {colors.length > 0 &&
              colors.map((c, idx) => (
                <Text key={idx} style={styles.itemText}>
                  {c}
                </Text>
              ))}
          </View>
        </View>

        {/* Sections */}
        <View style={styles.card}>
          <Text style={styles.toggleText}>Product has different Sections</Text>
          <View style={styles.innerCard}>
            <TouchableOpacity style={styles.addRow}>
              <Ionicons name="add-circle" size={20} color="#111" />
            </TouchableOpacity>
            {sections.length > 0 &&
              sections.map((sec, idx) => (
                <Text key={idx} style={styles.itemText}>
                  {sec}
                </Text>
              ))}
          </View>
        </View>

        {/* Bottom Buttons */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { backgroundColor: isFilled ? "#4A154B" : "#ccc" },
          ]}
          disabled={!isFilled}
        >
          <Text style={styles.submitText}>Publish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
  },
  innerCard: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  mediaBox: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  mediaText: {
    marginTop: 5,
    fontWeight: "500",
  },
  mediaSubText: {
    fontSize: 12,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  smallBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  smallBtnText: {
    marginLeft: 5,
    color: "#111827",
    fontWeight: "400",
    fontSize: 12,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4A164B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  toggleText: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    marginTop: 5,
    color: "#000",
  },
  submitBtn: {
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 20,
  },
  submitText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  saveBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  saveText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#111",
  },
  addRow: {
    marginBottom: 5,
  },
});
