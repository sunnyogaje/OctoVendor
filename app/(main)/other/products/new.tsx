import UploadIcon from "@/assets/icons/upload.png";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
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

// --------- Helper: radio indicator ----------
const Radio = ({ on }: { on: boolean }) => (
  <View style={[styles.radioOuter, on && { borderColor: "#6A1B9A" }]}>
    {on && <View style={styles.radioInner} />}
  </View>
);

// --------- Helper: variant section with Add button ----------
const VariantSection = ({
  title,
  open,
  setOpen,
  items,
}: {
  title: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  items: string[];
}) => (
  <View style={styles.variantCard}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.variantHeader}
      onPress={() => setOpen(!open)}
    >
      <Text style={styles.variantTitle}>{title}</Text>
      <Radio on={open} />
    </TouchableOpacity>

    {open && (
      <View style={styles.variantBody}>
        {/* Add button */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
        >
          <View
            style={{
              backgroundColor: "#292D32", 
              borderRadius: 18, 
              padding: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Existing items */}
        {items.length === 0 ? (
          <Text style={{ color: "#999", fontSize: 13 }}>No items added</Text>
        ) : (
          items.map((item, index) => (
            <Text key={`${item}-${index}`} style={styles.variantItemText}>
              {item}
            </Text>
          ))
        )}
      </View>
    )}
  </View>
);

export default function AddProduct() {
  const router = useRouter();

  // ---------- Form state ----------
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // selected value
  const [dropdownOpen, setDropdownOpen] = useState(false); // open/close dropdown
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  // Variant lists
  const [sizes, setSizes] = useState<string[]>(["L", "S"]);
  const [colors, setColors] = useState<string[]>(["Green", "Blue"]);
  const [sections, setSections] = useState<string[]>(["Shorts", "Ties"]);

  // Section open/close
  const [sizesOpen, setSizesOpen] = useState<boolean>(true);
  const [colorsOpen, setColorsOpen] = useState<boolean>(true);
  const [sectionsOpen, setSectionsOpen] = useState<boolean>(true);

  // Required fields for publishing
  const canPublish = useMemo(
    () =>
      Boolean(
        name && category && description && details && images.length > 0
      ),
    [name, category, description, details, images.length]
  );

  const categoryOptions = ["Fashion", "Electronics", "Home"];

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
          <TouchableOpacity onPress={() => router.push("/(main)/other/menu")}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add product</Text>
        </View>

        {/* Top card */}
        <View style={styles.card}>
          {/* Name */}
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

          {/* Custom Category Dropdown */}
          <View>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Ionicons name="list-outline" size={18} color="#6A1B9A" />
              <Text
                style={[
                  styles.textInput,
                  { color: category ? "#111" : "#999", paddingVertical: 0 },
                ]}
              >
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : "Select Category"}
              </Text>
              <Ionicons
                name={dropdownOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#6A1B9A"
              />
            </TouchableOpacity>

            {dropdownOpen && (
              <View style={[styles.variantBody, { marginTop: -1 }]}>
                {categoryOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ paddingVertical: 12, paddingHorizontal: 10 }}
                    onPress={() => {
                      setCategory(item.toLowerCase());
                      setDropdownOpen(false);
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "#111" }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={styles.label}>Product description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter product description"
            placeholderTextColor="#aaa"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Details */}
          <Text style={styles.label}>Product Details</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter product details"
            placeholderTextColor="#aaa"
            multiline
            value={details}
            onChangeText={setDetails}
          />
        </View>

        {/* Media card */}
        <View style={styles.card}>
          <Text style={styles.sectionSmallTitle}>Cover photo</Text>

          {images.length > 0 ? (
            images.map((uri, i) => (
              <Image
                key={`${uri}-${i}`}
                source={{ uri }}
                style={styles.coverImage}
              />
            ))
          ) : (
            <TouchableOpacity activeOpacity={0.8} style={styles.mediaBox}>
              <Image source={UploadIcon} style={styles.mediaIcon} />
              <Text style={styles.mediaText}>Add image</Text>
              <Text style={styles.mediaSubText}>(Not more than 5mb size)</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity activeOpacity={0.8} style={styles.mediaBox}>
            <Image source={UploadIcon} style={styles.mediaIcon} />
            <Text style={styles.mediaText}>Add video</Text>
            <Text style={styles.mediaSubText}>(Not more than 10mb size)</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.smallBtn, { flexDirection: "column" }]}
              onPress={() => {
                if (images.length === 0)
                  setImages([
                    "https://via.placeholder.com/680x360.png?text=Cover+photo",
                  ]);
              }}
            >
              <Image source={UploadIcon} style={styles.smallIcon} />
              <Text style={styles.smallBtnText}>Add image</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Variant sections */}
        <VariantSection
          title="Product has different sizes"
          open={sizesOpen}
          setOpen={setSizesOpen}
          items={sizes}
        />

        <VariantSection
          title="Product has different colors"
          open={colorsOpen}
          setOpen={setColorsOpen}
          items={colors}
        />

        <VariantSection
          title="Product has different sections"
          open={sectionsOpen}
          setOpen={setSectionsOpen}
          items={sections}
        />


        {/* Price Input */}
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

        {/* Bottom buttons */}
        <TouchableOpacity
          disabled={!canPublish}
          style={[
            styles.publishBtn,
            { backgroundColor: canPublish ? "#4A154B" : "#4A154B" },
          ]}
        >
          <Text style={styles.publishText}>Publish</Text>
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
  headerText: { fontSize: 16, fontWeight: "600", marginLeft: 8 },

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
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 2 : 6,
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
  textInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#111" },

  label: { fontSize: 14, fontWeight: "500", marginTop: 8, marginBottom: 5 },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    color: "#111",
  },

  sectionSmallTitle: { fontSize: 14, marginBottom: 8, color: "#111" },
  coverImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 12 },
  mediaBox: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  mediaIcon: { width: 40, height: 40, tintColor: "#999" },
  mediaText: { marginTop: 5, fontWeight: "500" },
  mediaSubText: { fontSize: 12, color: "#666" },

  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  smallBtn: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  smallIcon: { width: 20, height: 20, tintColor: "#999", marginBottom: 4 },
  smallBtnText: { color: "#111827", fontSize: 12, fontWeight: "400" },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4A164B",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  variantCard: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    marginHorizontal: 15,
    marginTop: 15,
  },
  variantHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  variantTitle: { fontSize: 14, color: "#111" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#B9B9C1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6A1B9A",
  },
  variantBody: {
    borderWidth: 1,
    borderColor: "#E0CFF7",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  variantItemText: { fontSize: 14, color: "#000", marginTop: 4 },

  publishBtn: {
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginTop: 16,
  },
  publishText: { textAlign: "center", color: "#fff", fontWeight: "600" },
  saveBtn: {
    borderWidth: 1,
    borderColor: "#4A154B",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 28,
    backgroundColor: "#FFFFFF",
  },
  saveText: { textAlign: "center", fontWeight: "600", color: "#111827" },
});
