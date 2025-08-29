import { Ionicons } from "@expo/vector-icons";
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

export default function PersonalDetails() {
  const [fullName, setFullName] = useState("Hannah Famodimu");
  const [email, setEmail] = useState("Hannah@gmail.com");
  const [phone, setPhone] = useState("0903992034");

    const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={[
        styles.container,
        { paddingTop: Platform.select({ ios: 12, android: 40, web: 24 }) }
      ]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(main)/other/account/account')}  >
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Details</Text>
          <View style={{ width: 22 }} /> 
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('@/assets/images/profile/profileImg.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="create-outline" size={16} color="#6A1B47" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Hannah</Text>
          <Text style={styles.storeId}>Store ID: 12345</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    fontFamily:'Lato',
  },
  profileSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    color: "#121217",
    fontFamily:'Lato',
  },
  storeId: {
    fontSize: 14,
    color: "#6b6b6b",
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
  },
  inputLabel: {
    fontSize: 16,
    color: "#121217",
    marginBottom: 6,
    fontFamily:'Lato',
    fontWeight:'500',
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    color: "#92959C",
  },
  button: {
    backgroundColor: "#4A154B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    fontFamily:'Lato',
  },
  
});
