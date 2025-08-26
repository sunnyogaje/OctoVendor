import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
/**
 * Responsive helpers
 */
const useScale = () => {
  const { width } = useWindowDimensions();
  // 390 is iPhone 16/15 baseline width in the mock
  const r = Math.min(Math.max(width / 390, 0.85), 1.25);
  const s = (n: number) => Math.round(n * r);
  return { s, width };
};

export default function AccountScreen() {
  const { s } = useScale();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingHorizontal: s(16), paddingTop: Platform.select({ ios: s(20), android: s(44) }) },
        ]}
        bounces
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
           onPress={() => router.back()} 
          style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={s(22)} color="#111827" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontSize: s(18) }]}>Account</Text>
          <View style={{ width: s(22) }} />
        </View>

        {/* Profile Card */}
        <View style={[styles.profileRow, { padding: s(12), borderRadius: s(14) }]}>
          <View style={styles.profileLeft}>
            <View style={[styles.avatarWrap, { width: s(56), height: s(56), borderRadius: s(28) }]}>
              <Image  source={require('@/assets/images/profile/profileImg.png')}
                 style={{ width: "100%", height: "100%", borderRadius: s(28) }} />
            </View>

            <View style={styles.profileMeta}>
              <Text style={[styles.name, { fontSize: s(16) }]}>Tomade cakes’n’ Event</Text>
              
              {/* Vendor ID and Share on same line */}
              <View style={styles.vendorRow}>
                <Text style={[styles.vendorId, { fontSize: s(12) }]}>Vendor ID: 123456789</Text>
                <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
                  <Image
                        source={require("@/assets/icons/send-square.png")} 
                        style={{ width: s(18), height: s(18), resizeMode: "contain" }}
                    />
                </TouchableOpacity>
              </View>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={s(14)} color="#F59E0B" />
                <Text style={[styles.ratingText, { fontSize: s(12) }]}>5.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Link */}
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={{ marginTop: s(6), marginBottom: s(12) }}
        //   onPress={() => router.push("/progress")}
        >
          <Text style={[styles.progressLink, { fontSize: s(13) }]}>Check target progress</Text>
        </TouchableOpacity>
        
        <CardRow 
          iconBg 
          size={s} 
          icon={<Ionicons name="person-outline" size={s(20)} color="#111827" />} 
          label="Personal Information" 
          onPress={() => router.push("/account/profile/profile")}
        />
         {/* Section: Store */}
        <Text style={[styles.sectionTitle, { fontSize: s(14), marginTop: s(8), marginBottom: s(10) }]}>
          Store
        </Text>

        <CardRow 
          iconBg 
          size={s} 
          icon={<MaterialCommunityIcons name="storefront-outline" size={s(20)} color="#111827" />} 
          label="Store Information" 
          onPress={() => router.push("/account/store/store-info")}
        />
        <CardRow
          iconBg
          size={s}
          icon={<MaterialCommunityIcons name="view-list-outline" size={s(20)} color="#111827" />}
          label="Inventory Management"
          rightBadge={
            <View style={[styles.badge, { width: s(28), height: s(28), borderRadius: s(14) }]}>
              <MaterialCommunityIcons name="crown-outline" size={s(16)} color="#F59E0B" />
            </View>
          }
        //   onPress={() => router.push("/inventory")}
        />
        <CardRow 
          iconBg 
          size={s} 
          icon={<MaterialCommunityIcons name="truck-delivery-outline" size={s(20)} color="#111827" />} 
          label="Delivery" 
          onPress={() => router.push("/account/delivery/settings")}
        />
        <CardRow 
          iconBg 
          size={s} 
          icon={<Ionicons name="sparkles-outline" size={s(20)} color="#111827" />} 
          label="Menu" 
          onPress={() => router.push("/menu")}
        />
        <CardRow 
          iconBg 
          size={s} 
          icon={<MaterialCommunityIcons name="store-outline" size={s(20)} color="#111827" />} 
          label="Visit marketplace" 
        //   onPress={() => router.push("/marketplace")}
        />
        <CardRow 
          iconBg 
          size={s} 
          icon={<Ionicons name="book-outline" size={s(20)} color="#111827" />} 
          label="KYC" 
        //   onPress={() => router.push(null)}
        />

        {/* Section: App Preferences */}
        <Text style={[styles.sectionTitle, { fontSize: s(14), marginTop: s(18), marginBottom: s(10) }]}>
          App Preferences
        </Text>
        <CardRow 
          iconBg 
          size={s} 
          icon={<Ionicons name="notifications-outline" size={s(20)} color="#111827" />} 
          label="Notifications" 
        //   onPress={() => router.push("/notifications")}
        />

        {/* Section: Support */}
        <Text style={[styles.sectionTitle, { fontSize: s(14), marginTop: s(20), marginBottom: s(10) }]}>
          Support
        </Text>
        <SupportRow size={s} label="Help Center" />
        <SupportRow size={s} label="Contact Us" />
        <SupportRow size={s} label="Terms of Service"  />
        <SupportRow size={s} label="Privacy Policy"  />

        <View style={{ height: s(28) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Reusable components
 */
function CardRow({
  icon,
  label,
  rightBadge,
  iconBg = true,
  size,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  rightBadge?: React.ReactNode;
  iconBg?: boolean;
  size: (n: number) => number;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.cardRow,
        {
          padding: size(12),
          borderRadius: size(12),
          minHeight: size(60),
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.cardLeft}>
        <View
          style={[
            styles.leadIconWrap,
            iconBg && { backgroundColor: "#F2F5F2" },
            { width: size(40), height: size(40), borderRadius: size(10) },
          ]}
        >
          {icon}
        </View>
        <Text style={[styles.cardLabel, { fontSize: size(15) }]} numberOfLines={1}>
          {label}
        </Text>
      </View>

      <View style={styles.cardRight}>
        {rightBadge ? rightBadge : null}
      </View>
    </TouchableOpacity>
  );
}

function SupportRow({ label, size, onPress }: { label: string; size: (n: number) => number; onPress?: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.supportRow,
        {
          paddingVertical: size(14),
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.supportLabel, { fontSize: size(15) }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={size(18)} color="#111827" />
    </TouchableOpacity>
  );
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingBottom: 28,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    color: "#111827",
    fontWeight: "600",
  },

  /* Profile */
  profileRow: {},
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  profileMeta: {
    flex: 1,
  },
  name: {
    color: "#111827",
    fontWeight: "500",
    fontFamily:'Lato',
  },
  vendorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vendorId: {
    color: "#6B7280",
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  ratingText: {
    color: "#111827",
  },
  shareBtn: {
    padding: 8,
  },

  progressLink: {
    color: "#F59E0B",
    fontWeight: "600",
    fontSize:16,
  },

  /* Sections */
  sectionTitle: {
    color: "#111827",
    fontWeight: "700",
  },

  /* Card Rows */
  cardRow: {
    backgroundColor: "#EDE8ED", // soft lilac like the mock
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  leadIconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    color: "#121712",
    fontWeight: "500",
    fontFamily:'Lato',
    flexShrink: 1,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: "#FFF7ED", // soft amber tint
    alignItems: "center",
    justifyContent: "center",
  },

  /* Support Rows */
  supportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  supportLabel: {
    color: "#141217",
    fontFamily:'Lato',
    fontWeight:'500',
  },
});
