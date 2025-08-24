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

// ✅ Use PNG/JPG instead of SVG (React Native doesn’t handle raw .svg without extra libs)
const ICONS = {
  food: require("@/assets/icons/food.png"), // replace with your PNG/JPG version of food icon
};

const OPTIONS = [
  { id: "food", label: "Food Deliveries", icon: ICONS.food },
  { id: "supermarket", label: "Supermarket (Distributors)", icon: "storefront-outline" },
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

  const [selected, setSelected] = useState<string>("supermarket"); // ✅ preselect supermarket

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
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionCard,
                  selected === opt.id && styles.optionCardSelected,
                ]}
                onPress={() => setSelected(opt.id)}
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
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                </View>

                <View style={styles.radioOuter}>
                  {selected === opt.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}

            {/* Empty card placeholder */}
            <View style={styles.optionCard} />
          </View>

          {/* ✅ Continue Button (scrolls away with content) */}
          <TouchableOpacity
            style={[styles.button, !selected && { opacity: 0.5 }]}
            onPress={() => router.push("./EnableBookingScreen")}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60, // ✅ ensures you can scroll past the button
  },
  page: {
    width: "100%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 12,
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E5F7",
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    width: "100%", // ✅ 3/3 progress
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 3,
  },
  optionsWrapper: {
    marginBottom: 40,
  },
  optionIcon: {
    width: 24,
    height: 24,
    tintColor: "#4A154B", // ✅ applies purple filter
  },
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
  optionCardSelected: {
    borderColor: "#4A154B",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: "#111827",
  },
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
