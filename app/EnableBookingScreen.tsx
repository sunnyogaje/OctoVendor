import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: W } = Dimensions.get("window");
const baseW = 375;
const scale = (s: number) => Math.round((W / baseW) * s);

const TEXT = "#111827";
const SUBTEXT = "#2a2a2aff";

export default function EnableBookingHeader() {
  // square art size that matches the mock and stays responsive
  const tileSize = Math.min(W - scale(48), scale(334));

  return (
    <SafeAreaView style={styles.safe}>
      {/* Content wrapper with horizontal padding */}
      <View style={styles.content}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Text style={styles.chevron}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Enable online booking on Octomarket
          </Text>
        </View>

        {/* Body copy */}
        <Text style={styles.copy}>
          By enabling online bookings with us, your venue will be listed on your
          marketplace and you will be discoverable by potential clients
        </Text>

        {/* ---- Artwork section (single image + bottom fade) ---- */}
        <View style={[styles.artWrap, { width: tileSize, height: tileSize }]}>
          <Image
            // ⬇️ Replace with your local composite image (gradient + phone + pill)
            source={require("@/assets/images/booking-phone.png")}
            style={styles.artImage}
          />

          {/* White fade overlay at the bottom */}
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.1)", "#fff"]}
            start={{ x: 0.5, y: 0.6 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.fadeBottom}
          />
        </View>
        {/* ---- /Artwork section ---- */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(15),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
  },
  chevron: {
    fontSize: scale(28),
    color: TEXT,
    marginRight: scale(12),
    lineHeight: scale(28),
  },
  headerTitle: {
    flex: 1,
    fontSize: scale(18),
    lineHeight: scale(24),
    fontWeight: "400",
    color: TEXT,
  },
  copy: {
    fontSize: scale(12),
    lineHeight: scale(20),
    color: SUBTEXT,
  },

  // --- Artwork styles ---
  artWrap: {
    alignSelf: "center",
    borderRadius: scale(22),
    overflow: "hidden", // ensures image corners round + fade clips
    marginTop: scale(18),
  },
  artImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // image already includes the gradient background
  },
  fadeBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: "40%", // adjust if you want more/less fade
  },
});