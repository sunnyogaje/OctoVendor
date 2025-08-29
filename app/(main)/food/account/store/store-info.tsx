import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
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

// Custom Toggle Switch
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
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeEmail, setStoreEmail] = useState("");

  const [hours, setHours] = useState<
    Record<Day, { open: boolean; start: string; end: string }>
  >({
    Monday: { open: true, start: "08:00 AM", end: "06:00 PM" },
    Tuesday: { open: true, start: "08:00 AM", end: "06:00 PM" },
    Wednesday: { open: true, start: "08:00 AM", end: "06:00 PM" },
    Thursday: { open: true, start: "08:00 AM", end: "06:00 PM" },
    Friday: { open: true, start: "08:00 AM", end: "06:00 PM" },
    Saturday: { open: true, start: "09:00 AM", end: "06:00 PM" },
    Sunday: { open: true, start: "09:00 AM", end: "06:00 PM" },
  });

  const [logo, setLogo] = useState<string | null>(null);

  const router = useRouter();

  // Toggle open/close
  const toggleDay = (day: Day) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  };

  // Update start/end time
  const updateTime = (day: Day, field: "start" | "end", value: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  // Image picker
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  //  Time Picker
  const [showPicker, setShowPicker] = useState<{
    day: Day | null;
    field: "start" | "end" | null;
  }>({ day: null, field: null });

  const [pickerTime, setPickerTime] = useState(new Date());

  const openTimePicker = (day: Day, field: "start" | "end") => {
    setShowPicker({ day, field });
    setPickerTime(new Date());
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowPicker({ day: null, field: null });
      return;
    }
    if (selectedDate && showPicker.day && showPicker.field) {
      const formatted = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      updateTime(showPicker.day, showPicker.field, formatted);
    }
    setShowPicker({ day: null, field: null });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={[
          { paddingBottom: 100,paddingHorizontal: 18, },
          { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(main)/food/account/account")}
          >
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
          value={storeName}
          onChangeText={setStoreName}
        />

        {/* Store Description */}
        <Text style={styles.label}>Store description</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Brief description of what you offer"
          placeholderTextColor="#aaa"
          multiline
          value={storeDescription}
          onChangeText={setStoreDescription}
        />

        {/* Store Address */}
        <Text style={styles.label}>Store address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#aaa"
          value={storeAddress}
          onChangeText={setStoreAddress}
        />

        {/* Store Phone Number */}
        <Text style={styles.label}>Store phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="090054956"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={storePhone}
          onChangeText={setStorePhone}
        />

        {/* Store Email */}
        <Text style={styles.label}>Store email</Text>
        <TextInput
          style={styles.input}
          placeholder="foood@co.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={storeEmail}
          onChangeText={setStoreEmail}
        />

        {/* Operating Hours */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Operating hours
        </Text>
        {(Object.keys(hours) as Day[]).map((day, index) => (
          <View key={index} style={styles.dayRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dayText}>{day}</Text>

              {hours[day].open ? (
                <View style={styles.timeRow}>
                  <Pressable
                    style={styles.timeBox}
                    onPress={() => openTimePicker(day, "start")}
                  >
                    <Text style={styles.timeTextValue}>
                      {hours[day].start}
                    </Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 5 }}>-</Text>

                  <Pressable
                    style={styles.timeBox}
                    onPress={() => openTimePicker(day, "end")}
                  >
                    <Text style={styles.timeTextValue}>{hours[day].end}</Text>
                  </Pressable>
                </View>
              ) : (
                <Text style={styles.timeText}>Closed</Text>
              )}
            </View>

            <CustomSwitch
              value={hours[day].open}
              onValueChange={() => toggleDay(day)}
            />
          </View>
        ))}

        {/* Update Button */}
        <TouchableOpacity style={styles.updateInfoBtn}>
          <Text style={styles.updateInfoText}>Update information</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Time Picker */}
      {showPicker.day && showPicker.field && (
        <DateTimePicker
          value={pickerTime}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeTime}
        />
      )}
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
    color: "#000", // text visible
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
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  timeTextValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },
  updateInfoBtn: {
    backgroundColor: "#4A154B",
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
