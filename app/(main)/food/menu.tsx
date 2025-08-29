// app/(main)/products.tsx
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const P = {
  purple: "#4A154B",
  text: "#111827",
  subtext: "#6B7280",
  border: "#E5E7EB",
  green: "#00C084",
};

type Product = {
  id: string;
  name: string;
  variant: string;
  price: string;
  image: any; // local require(...)
  published: boolean;
};

const { width: W } = Dimensions.get("window");
const H_PAD = 16;
const GAP = 16;
const CARD_W = (W - H_PAD * 2 - GAP) / 2;

type FilterTab = "All" | "Published" | "Unpublished";
type BottomTab = "Products" | "Menus";

/* ---------- Pill Switch ---------- */
function PillSwitch({
  value,
  onToggle,
  accessibilityLabel,
}: {
  value: boolean;
  onToggle: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.9}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.pill,
        {
          backgroundColor: value ? P.green : "#E5E7EB",
          alignItems: value ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View style={styles.pillKnob} />
    </TouchableOpacity>
  );
}

export default function ProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_GUTTER = Math.max(24, tabBarH + insets.bottom + 70);

  const [q, setQ] = useState("");
  const [tab, setTab] = useState<FilterTab>("All");
  const [bottomTab, setBottomTab] = useState<BottomTab>("Products");
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  // 🖼️ Products
  const data: Product[] = useMemo(
    () => [
      {
        id: "1",
        name: "Suya Burger",
        variant: "Large",
        price: "7,500",
        image: require("@/assets/images/menu/burger1.jpg"),
        published: true,
      },
      {
        id: "2",
        name: "Suya Burger",
        variant: "Medium",
        price: "7,500",
        image: require("@/assets/images/menu/burger2.jpg"),
        published: false,
      },
      {
        id: "3",
        name: "Salmon Bowl",
        variant: "Large",
        price: "7,500",
        image: require("@/assets/images/menu/bowl.jpg"),
        published: true,
      },
      {
        id: "4",
        name: "Pepperoni Pizza",
        variant: "Large",
        price: "7,500",
        image: require("@/assets/images/menu/pizza.jpg"),
        published: true,
      },
    ],
    []
  );

  // 🖼️ Categories
  const categories = [
    {
      id: "1",
      title: "Main dishes",
      items: "12 items",
      image:
        require("@/assets/images/menu/burger1.jpg"),
    },
    {
      id: "2",
      title: "Appetizer",
      items: "12 items",
      image:
        require("@/assets/images/menu/burger1.jpg"),
    },
    {
      id: "3",
      title: "Breakfast",
      items: "12 items",
      image:
       require("@/assets/images/menu/burger1.jpg"),
    },
  ];

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    return data
      .filter((p) => {
        const isOn = toggles[p.id] ?? p.published;
        if (tab === "Published") return isOn;
        if (tab === "Unpublished") return !isOn;
        return true;
      })
      .filter((p) => {
        if (!qlc) return true;
        return (
          p.name.toLowerCase().includes(qlc) ||
          p.variant.toLowerCase().includes(qlc) ||
          p.price.toLowerCase().includes(qlc)
        );
      });
  }, [data, q, tab, toggles]);

  const onToggle = (id: string, defaultVal: boolean) =>
    setToggles((prev) => ({ ...prev, [id]: !(prev[id] ?? defaultVal) }));

  const renderCard = ({ item }: { item: Product }) => {
    const isOn = toggles[item.id] ?? item.published;

    return (
      <View key={item.id} style={styles.card}>
        <Image source={item.image} style={styles.img} />
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.variant}>{item.variant}</Text>
            <PillSwitch
              value={isOn}
              onToggle={() => onToggle(item.id, item.published)}
              accessibilityLabel={`Toggle publish for ${item.name}`}
            />
          </View>

          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: BOTTOM_GUTTER },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { marginTop: HEADER_TOP }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={P.text} />
          </TouchableOpacity>

          <View style={styles.headerCenter} pointerEvents="none">
            <Text style={styles.headerTitle}>{bottomTab}</Text>
          </View>

          {bottomTab === "Products" && (
            <TouchableOpacity
              onPress={() => router.push("/food/products/new")}
              style={styles.addBtn}
              activeOpacity={0.85}
            >
              
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search (only for products) */}
        {bottomTab === "Products" && (
          <View style={styles.searchWrap}>
            <Ionicons
              name="search"
              size={22}
              color={P.purple}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search for order"
              placeholderTextColor="#9CA3AF"
              value={q}
              onChangeText={setQ}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
        )}

        {/* Filter pills (only for products) */}
        {bottomTab === "Products" && (
          <View style={styles.tabsRow}>
            {(["All", "Published", "Unpublished"] as FilterTab[]).map((t) => {
              const active = t === tab;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t)}
                  activeOpacity={0.9}
                  style={[styles.tab, active && styles.tabActive]}
                >
                  <Text
                    style={[styles.tabText, active && styles.tabTextActive]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Products or Categories */}
        {bottomTab === "Products" ? (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            renderItem={renderCard}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: GAP }} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: GAP,
            }}
            contentContainerStyle={{ paddingBottom: 0 }}
            scrollEnabled={false}
          />
        ) : (
          <View style={{ marginTop: 20 }}>
            {categories.map((cat) => (
              <TouchableOpacity  key={cat.id}    onPress={() => router.push(`/(main)/food/menus/${cat.title}`)}>
                <View key={cat.id} style={styles.catRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.catLabel}>Menu</Text>
                    <Text style={styles.catTitle}>{cat.title}</Text>
                    <Text style={styles.catItems}>{cat.items}</Text>
                  </View>
                  <Image source={cat.image} style={styles.catImage} />
                </View>
              </TouchableOpacity>
            ))}

            {/* Add Menu button */}
            <View style={styles.addMenuWrapper}>
              <TouchableOpacity style={styles.addMenuButton} onPress={() => router.push('/(main)/food/menus/add')}>
                <Ionicons name="add" size={20} color={P.purple} />
                <Text style={styles.addMenuText}>Add Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom selector (Products / Categories) */}
      <View
        style={[
          styles.bottomSwitcher,
          { bottom: insets.bottom + tabBarH + 10 },
        ]}
      >
        <TouchableOpacity
          style={[styles.seg, bottomTab === "Products" && styles.segActive]}
          activeOpacity={0.9}
          onPress={() => setBottomTab("Products")}
        >
          <Text
            style={[
              styles.segText,
              bottomTab === "Products" && styles.segTextActive,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.seg, bottomTab === "Menus" && styles.segActive]}
          activeOpacity={0.9}
          onPress={() => setBottomTab("Menus")}
        >
          <Text
            style={[
              styles.segText,
              bottomTab === "Menus" && styles.segTextActive,
            ]}
          >
            Menus
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1, paddingHorizontal: H_PAD },

  header: { minHeight: 44, justifyContent: "center" },
  backBtn: { position: "absolute", left: 0, padding: 6 },
  headerCenter: { marginLeft: 40 },
  headerTitle: { fontSize: 19, fontWeight: "400", color: P.text },
  addBtn: {
    position: "absolute",
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: P.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  searchWrap: {
    position: "relative",
    width: "100%",
    borderWidth: 1,
    borderColor: P.border,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 30,
    backgroundColor: "#F7F7FB",
  },
  searchIcon: { position: "absolute", left: 12, top: 10 },
  searchInput: {
    paddingLeft: 42,
    paddingRight: 14,
    height: 42,
    fontSize: 15,
    color: P.text,
  },

  // Filter pills
  tabsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
    flexWrap: "wrap",
  },
  tab: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E6E1EC",
    backgroundColor: "#FFFFFF",
  },
  tabActive: { backgroundColor: P.purple, borderColor: P.purple },
  tabText: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  tabTextActive: { color: "#FFFFFF" },

  // Product Cards
  card: {
    width: CARD_W,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 5,
    overflow: "hidden",
  },
  img: { width: "100%", height: 170, resizeMode: "cover" },
  cardName: { fontSize: 15, color: P.text, marginBottom: 6 },
  variant: { fontSize: 13, color: "#6B7280" },
  price: { marginTop: 8, fontSize: 15, fontWeight: "600", color: P.text },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* pill switch */
  pill: {
    width: 35,
    height: 25,
    borderRadius: 999,
    padding: 4,
    justifyContent: "center",
  },
  pillKnob: {
    width: 17,
    height: 17,
    borderRadius: 11,
    backgroundColor: "#fff",
  },

  // --- Categories ---
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  catLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 2,
  },
  catTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  catItems: {
    fontSize: 13,
    color: "#666",
  },
  catImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
    marginLeft: 15,
  },
  addMenuWrapper: {
    alignItems: "flex-end",
    marginTop: 30,
    marginBottom: 40,
  },
  addMenuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE8ED",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  addMenuText: {
    color: P.purple,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Bottom switcher
  bottomSwitcher: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ECEFF3",
    borderRadius: 18,
    padding: 6,
    ...(Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
        }
      : { elevation: 3 }),
  },
  seg: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segActive: { backgroundColor: P.purple },
  segText: { fontSize: 14, fontWeight: "700", color: P.text },
  segTextActive: { color: "#fff" },
});
