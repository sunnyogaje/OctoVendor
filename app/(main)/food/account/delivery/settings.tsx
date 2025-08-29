import { Feather as Icon, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
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

// ✅ Custom Checkbox
type CustomCheckboxProps = {
  value: boolean;
  onValueChange: (val: boolean) => void;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  value,
  onValueChange,
}) => (
  <Pressable
    onPress={() => onValueChange(!value)}
    style={[
      styles.checkbox,
      {
        borderColor: value ? "#4A154B" : "#999",
        backgroundColor: value ? "#4A154B" : "#fff",
      },
    ]}
  >
    {value && <Icon name="check" size={14} color="#fff" />}
  </Pressable>
);

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

export default function DeliverySettingsScreen() {
  const [pickup, setPickup] = useState(true);
  const [door, setDoor] = useState(true);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const states = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
    "Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina",
    "Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau",
    "Rivers","Sokoto","Taraba","Yobe","Zamfara"
  ];

  const filtered = states.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(main)/food/account/account')}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Delivery Type */}
        <Text style={styles.sectionTitle}>Delivery Type</Text>
        <View style={styles.cardRow}>
          <View style={styles.iconBox}>
            <Icon name="shopping-bag" size={16} color="#5A2D82" />
          </View>
          <Text style={styles.text}>Pick up</Text>
          <CustomSwitch value={pickup} onValueChange={() => setPickup(!pickup)} />
        </View>
        <View style={styles.cardRow}>
          <View style={styles.iconBox}>
            <Icon name="home" size={16} color="#5A2D82" />
          </View>
          <Text style={styles.text}>Door delivery</Text>
          <CustomSwitch value={door} onValueChange={() => setDoor(!door)} />
        </View>

        {/* Delivery Area */}
        <Text style={styles.sectionTitle}>Delivery Area</Text>
        <View style={styles.cardRow}>
          <View style={styles.iconBox}>
            <Icon name="map-pin" size={16} color="#5A2D82" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textBold}>Current Address</Text>
            <Text style={styles.metaText}>Abuja</Text>
          </View>
        </View>

        {/* Delivery Time */}
        <Text style={styles.sectionTitle}>Delivery Time</Text>
        <View style={styles.cardRow}>
          <View style={styles.iconBox}>
            <Icon name="clock" size={16} color="#5A2D82" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textBold}>Estimated Delivery Time</Text>
            <Text style={styles.metaText}>30-45 minutes</Text>
          </View>
          <Text style={styles.link}>Interstate</Text>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.iconBox}>
            <Icon name="clock" size={16} color="#5A2D82" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textBold}>Estimated Delivery Time</Text>
            <Text style={styles.metaText}>3-5 days</Text>
          </View>
          <Text style={styles.link}>Outside</Text>
        </View>

        {/* Delivery States */}
        <Text style={styles.sectionTitle}>Delivery States</Text>
        <Pressable style={styles.searchBox} onPress={() => setModalVisible(true)}>
          <Icon name="search" size={16} color="#666" style={{ marginRight: 6 }} />
          <Text style={styles.searchInput}>Select or search location</Text>
        </Pressable>

        {/* Save button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Modal for States */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          {/* Search */}
          <View style={styles.searchBox}>
            <Icon name="search" size={16} color="#666" style={{ marginRight: 6 }} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search location"
              style={{ flex: 1, fontSize: 14 }}
            />
          </View>

          {/* States List */}
          <ScrollView>
            {filtered.map((name) => (
              <View key={name} style={styles.stateRow}>
                <Text style={styles.text}>{name}</Text>
                <CustomCheckbox
                  value={!!checked[name]}
                  onValueChange={(val) =>
                    setChecked((prev) => ({ ...prev, [name]: val }))
                  }
                />
              </View>
            ))}
          </ScrollView>

          {/* Close */}
          <TouchableOpacity
            style={[styles.button, { margin: 20 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  content: { padding: 15, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#121217",
    marginHorizontal: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F2F0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  text: { fontSize: 14, color: "#111", flex: 1 },
  textBold: { fontSize: 14, fontWeight: "600", color: "#111" },
  metaText: { fontSize: 12, color: "#666" },
  link: { fontSize: 12, color: "#33ACE2", fontWeight: "500" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#666" },
  stateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#4A154B",
    padding: 16,
    borderRadius: 12,
    margin: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
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
  modalContainer: { flex: 1, backgroundColor: "#fff", padding: 15 },
});
