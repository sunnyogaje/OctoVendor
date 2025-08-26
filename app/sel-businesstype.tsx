import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const ICONS = {
  food: require("@/assets/icons/food.png"),
};

const OPTIONS = [
  { id: "food", label: "Food Deliveries", icon: ICONS.food },
  {
    id: "supermarket",
    label: "Supermarket",
    icon: "storefront-outline",
    children: [
      { id: "distributor", label: "Distributor" },
      { id: "sub-distributor", label: "Sub- Distributor" },
      { id: "wholesaler", label: "Wholesaler" },
      { id: "retailer", label: "Retailer" },
    ],
  },
  { id: "buka", label: "Buka", icon: "storefront-outline" },
  { id: "kiosk", label: "Kiosk", icon: "storefront-outline" },
  { id: "restaurants", label: "Restaurants", icon: "storefront-outline" },
  { id: "thrift", label: "Thrift", icon: "storefront-outline" },
  { id: "local", label: "Local Markets", icon: "storefront-outline" },
  { id: "lounge", label: "Lounge", icon: "storefront-outline" },
];

export default function BusinessTypeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const HEADER_TOP = Platform.select({ ios: 12, android: 40, web: 24 });

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // helper to show label with bracket if sub is selected
  const getOptionLabel = (opt: any) => {
    if (opt.id === selectedParent && selected) {
      const child = opt.children?.find((c: any) => c.id === selected);
      if (child) {
        return `${opt.label} (${child.label})`;
      }
    }
    return opt.label;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.page, { maxWidth: isTablet ? 640 : "100%" }]}>
          {/* Header */}
          <View style={[styles.header, { marginTop: HEADER_TOP }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Business Type</Text>
          </View>

          {/* Progress */}
          <Text style={styles.progressText}>3/3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          {/* Options */}
          <View style={styles.optionsWrapper}>
            {OPTIONS.map((opt) => (
              <View key={opt.id}>
                <TouchableOpacity
                  style={[
                    styles.optionCard,
                    (selected === opt.id || selectedParent === opt.id) &&
                      styles.optionCardSelected,
                  ]}
                  onPress={() => {
                    if (opt.children) {
                      setExpanded(expanded === opt.id ? null : opt.id);
                    } else {
                      setSelected(opt.id);
                      setSelectedParent(null);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.optionLeft}>
                    {typeof opt.icon === "string" ? (
                      <MaterialCommunityIcons
                        name={opt.icon as any}
                        size={24}
                        color="#4A154B"
                      />
                    ) : (
                      <Image
                        source={opt.icon}
                        style={styles.optionIcon}
                        resizeMode="contain"
                      />
                    )}
                    <Text style={styles.optionLabel}>{getOptionLabel(opt)}</Text>
                  </View>

                  <View style={styles.radioOuter}>
                    {(selected === opt.id || selectedParent === opt.id) && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Sub-options */}
                {opt.children && expanded === opt.id && (
                  <View style={{ marginLeft: 20, marginTop: 8 }}>
                    {opt.children.map((child) => (
                      <TouchableOpacity
                        key={child.id}
                        style={[
                          styles.optionCard,
                          selected === child.id && styles.optionCardSelected,
                        ]}
                        onPress={() => {
                          setSelected(child.id);
                          setSelectedParent(opt.id);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.optionLabel}>{child.label}</Text>
                        <View style={styles.radioOuter}>
                          {selected === child.id && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.button, !selected && { opacity: 0.5 }]}
            onPress={() =>
              router.push('./EnableBookingScreen')
            }
            disabled={!selected}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  page: { width: "100%", alignSelf: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  backBtn: { marginRight: 12, padding: 6 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#111827" },
  progressText: { fontSize: 16, marginBottom: 8, color: "#111827" },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E5F7",
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 3,
  },
  optionsWrapper: { marginBottom: 40 },
  optionIcon: { width: 24, height: 24, tintColor: "#4A154B" },
  optionCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 56,
  },
  optionCardSelected: { borderColor: "#4A154B" },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  optionLabel: { fontSize: 16, color: "#111827" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#4A154B",
  },
  button: {
    backgroundColor: "#4A154B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
