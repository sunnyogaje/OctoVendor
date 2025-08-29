import { Ionicons } from "@expo/vector-icons";
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
  View
} from "react-native";

 import UploadIcon from '@/assets/icons/upload.png';

export default function AddProduct() {
  const [portionToggle, setPortionToggle] = useState(false);
   const router = useRouter();
     const [price, setPrice] = useState("");

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
          <TouchableOpacity onPress={() => router.push('/(main)/food/menu')}  >
             <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add product</Text>
          {/* <View style={{ width: 22 }} /> */}
        </View>

        {/* Form */}
        <View style={styles.card}>
          <View style={styles.inputBox}>
            <Ionicons name="grid-outline" size={18} color="#6A1B9A" />
            <TextInput
              placeholder="Name of product"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="grid-outline" size={18} color="#6A1B9A" />
            <TextInput
              placeholder="Select Menu"
              placeholderTextColor="#999"
              style={styles.textInput}
            />
            <Ionicons name="chevron-down" size={18} color="#6A1B9A" />
          </View>

          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={[styles.textArea]}
            placeholder=""
            placeholderTextColor="#aaa"
            multiline
          />

          <Text style={styles.label}>Product Details</Text>
          <TextInput
            style={[styles.textArea]}
            placeholder=""
            placeholderTextColor="#aaa"
            multiline
          />
        </View>

        {/* Media Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Media</Text>

          <TouchableOpacity style={styles.mediaBox}>
            {/* <Ionicons name="image-outline" size={40} color="#999" /> */}
              <Image 
              source={UploadIcon} 
              style={{ width: 40, height: 40, tintColor: "#999" }} 
            />

            <Text style={styles.mediaText}>Add image</Text>
            <Text style={styles.mediaSubText}>(Not more than 5mb size)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaBox}>
            {/* <Ionicons name="image-outline" size={40} color="#999" /> */}
            <Image 
              source={UploadIcon} 
              style={{ width: 40, height: 40, tintColor: "#999" }} 
            />

            <Text style={styles.mediaText}>Add video</Text>
            <Text style={styles.mediaSubText}>(Not more than 10mb size)</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.smallBtn, { flexDirection: "column" }]}>
              <Image 
                source={UploadIcon} 
                style={{ width: 20, height: 20, tintColor: "#999", marginBottom: 4 }} 
              />
              <Text style={styles.smallBtnText}>Add image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Toggle */}
        <TouchableOpacity
          style={styles.toggleBox}
          onPress={() => setPortionToggle(!portionToggle)}
        >
          <Text style={styles.toggleText}>Product has different sizes</Text>
          <View
            style={[
              styles.radio,
              portionToggle && { borderColor: "#6A1B9A", borderWidth: 6 },
            ]}
          />
        </TouchableOpacity>

        {/* Example Size Field */}
        {portionToggle && (
          <View style={[styles.card, { marginTop: -5 }]}>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Large"
                placeholderTextColor="#000"
                style={styles.textInput}
                value="Large"
              />
            </View>
          </View>
        )}


         {/* Price Input (last field) */}
        <View style={styles.inputBoxAmount}>
          <Ionicons name="pricetag-outline" size={18} color="#6A1B9A" />
          <TextInput
            placeholder="Enter Price"
            placeholderTextColor="#999"
            keyboardType="numeric"
            style={styles.textInput}
            value={price}
            onChangeText={setPrice}
          />
        </View>


        {/* Button */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Button</Text>
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
    // justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal:8,
  },
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
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

    inputBoxAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 15,
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
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
    fontSize:12,
    fontFamily:'Lato',
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
  toggleBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    margin: 15,
  },
  toggleText: {
    fontSize: 14,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  submitBtn: {
    backgroundColor: "#4A154B",
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
  },
  submitText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
