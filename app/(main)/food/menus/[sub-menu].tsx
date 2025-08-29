import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import EditIcon from '@/components/icons/AddrsbookEdit';
import TrashIcon from '@/components/icons/AddrsbookTrash';
import { useLocalSearchParams } from "expo-router";


const MENU_TABS = ["Swallow", "Appetizer", "Deserts", "Drinks"];

// Define item type
type MenuItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

const ITEMS: MenuItem[] = [
  {
    id: "1",
    title: "Fried Calamari",
    description: "Crispy fried calamari with marinara sauce",
    image: require("@/assets/images/menu/burger1.jpg"),
  },
  {
    id: "2",
    title: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, basil, balsamic glaze",
    image: require("@/assets/images/menu/burger2.jpg"),
  },
  {
    id: "3",
    title: "Tomato Soup",
    description: "Creamy tomato soup with grilled cheese croutons",
    image: require("@/assets/images/menu/bowl.jpg"),
  },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState<string>("Swallow");
 const { "sub-menu": subMenu } = useLocalSearchParams();
   const router = useRouter();
  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity  onPress={() => router.push('/(main)/food/menu')}>
             <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{subMenu}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="gray" />
        <TextInput
          placeholder="Search for product"
          style={styles.searchInput}
        />
      </View>

      <View >
        <Text style={styles.titles}>Menus</Text>
      </View>

      {/* Tabs (straight line, horizontally scrollable if overflow) */}
      <FlatList
        data={MENU_TABS}
        keyExtractor={(tab) => tab}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        renderItem={({ item: tab }) => (
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        )}
      />
        <View >
          <Text style={styles.titles}>Items</Text>
        </View>
    </>
  );


  const renderItem = ({ item }: { item: MenuItem }) => (
    
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn}>
            <TrashIcon size={20} />
          {/* <Ionicons name="trash-outline" size={20} color="red" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
              <EditIcon size={20} />
          {/* <Ionicons name="pencil-outline" size={20} color="skyblue" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{
          padding: 16,
          paddingTop: Platform.select({ ios: 15, android: 45, web: 24 }),
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  headerText: { fontSize: 20, fontWeight: "600", marginLeft: 10 },
  titles: { fontSize: 18, fontWeight: "700", marginLeft: 10,fontFamily:'Lato', marginBottom:'2%', },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  searchInput: { flex: 1, marginLeft: 6 },
  tabs: { paddingVertical: 4, marginBottom: 10 },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F7F8F9",
    marginRight: 8,
  },
  activeTab: { backgroundColor: "#4A154B" },
  tabText: { fontSize: 14, color: "#555" },
  activeTabText: { color: "white", fontWeight: "600" },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
  },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  itemTitle: { fontSize: 16, fontWeight: "500",color:'#141217',fontFamily:'Lato', },
  itemDesc: { fontSize: 13, fontWeight: "400", color: "#92959C", marginTop: 2,fontFamily:'Lato', },
  actions: { flexDirection: "row", marginLeft: 8 },
  iconBtn: { marginLeft: 10 },
});
