import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

// ✅ Custom Toggle Switch
const CustomSwitch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onValueChange}
      style={[
        styles.switchContainer,
        { backgroundColor: value ? "#6E446F" : "#ccc" },
      ]}
    >
      <View
        style={[
          styles.switchThumb,
          { transform: [{ translateX: value ? 22 : 0 }] },
        ]}
      />
    </TouchableOpacity>
  );
};

export default function StoreInformation() {
  const [days, setDays] = useState<Record<Day, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const [logo, setLogo] = useState<string | null>(null);

  const toggleDay = (day: Day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };
    const router = useRouter();

  // ✅ Pick image from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

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
           <TouchableOpacity onPress={() => router.push('/(main)/account/account')}  >
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Store Information</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Store Logo */}
        <Text style={styles.sectionTitle}>Store Logo</Text>
        <View style={styles.logoContainer}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logo} />
          ) : (
            <View style={styles.placeholderBox}>
              <Ionicons name="image-outline" size={40} color="#aaa" />
            </View>
          )}
        </View>
        <Text style={styles.note}>
          Recommended dimensions: 500x500 pixels. Accepted file types: JPG, PNG.
        </Text>

        <TouchableOpacity style={styles.updateLogoBtn} onPress={pickImage}>
          <Text style={styles.updateLogoText}>
            {logo ? "Update logo" : "Upload logo"}
          </Text>
        </TouchableOpacity>

        {/* Store Name */}
        <Text style={styles.label}>Store name</Text>
        <TextInput
          style={styles.input}
          placeholder="Hannah Famodimu"
          placeholderTextColor="#aaa"
        />

        {/* Store Description */}
        <Text style={styles.label}>Store description</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Brief description of what you offer"
          placeholderTextColor="#aaa"
          multiline
        />

        {/* Store Address */}
        <Text style={styles.label}>Store address</Text>
        <TextInput style={styles.input} placeholder="Address" />

        {/* Store Phone Number */}
        <Text style={styles.label}>Store phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="090054956"
          keyboardType="phone-pad"
        />

        {/* Store Email */}
        <Text style={styles.label}>Store email</Text>
        <TextInput
          style={styles.input}
          placeholder="foood@co.com"
          keyboardType="email-address"
        />

        {/* Operating Hours */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Operating hours
        </Text>
        {(Object.keys(days) as Day[]).map((day, index) => (
          <View key={index} style={styles.dayRow}>
            <View>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.timeText}>
                {day === "Saturday" || day === "Sunday"
                  ? "9:00 AM - 6:00 PM"
                  : "8:00 AM - 6:00 PM"}
              </Text>
            </View>
            <CustomSwitch
              value={days[day]}
              onValueChange={() => toggleDay(day)}
            />
          </View>
        ))}

        {/* Update Button */}
        <TouchableOpacity style={styles.updateInfoBtn}>
          <Text style={styles.updateInfoText}>Update information</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  logoContainer: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    borderRadius: 10,
  },
  placeholderBox: {
    width: "100%",
    height: 160,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  note: {
    fontSize: 12,
    color: "#555",
    marginHorizontal: 15,
    marginTop: 5,
  },
  updateLogoBtn: {
    backgroundColor: "#E9D5FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  updateLogoText: {
    color: "#121217",
    fontWeight: "600",
  },
  label: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 15,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 12,
  },
  dayText: {
    fontWeight: "500",
    fontSize: 14,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
  updateInfoBtn: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  updateInfoText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  switchContainer: {
    width: 50,
    height: 28,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
  },
});
