import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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

export default function UploadPictureScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [logo, setLogo] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [extraImages, setExtraImages] = useState<string[]>([]); // ✅ typed array of strings

  const HEADER_TOP = Platform.select({ ios: 12, android: 40, web: 24 });

  // Function to pick image
  const pickImage = async (onSelect: (uri: string) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      onSelect(uri); // ✅ now strongly typed
    }
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
            <Text style={styles.headerTitle}>Upload Picture</Text>
          </View>

          {/* Progress */}
          <Text style={styles.progressText}>2/3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Upload quality images and videos that highlights the beauty, comfort
            and professionalism of your space
          </Text>

          {/* Upload Sections */}
          <View style={styles.uploadCard}>
            {/* Logo Upload */}
            <TouchableOpacity
              style={styles.logoBox}
              onPress={() => pickImage(setLogo)}
            >
              {logo ? (
                <Image source={{ uri: logo }} style={styles.logoPreview} />
              ) : (
                <>
                  <Ionicons name="image-outline" size={20} color="#111827" />
                  <Text style={styles.logoText}>Add logo</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Main Image */}
            <TouchableOpacity
              style={styles.mainImageBox}
              onPress={() => pickImage(setMainImage)}
            >
              {mainImage ? (
                <Image
                  source={{ uri: mainImage }}
                  style={styles.mainImagePreview}
                />
              ) : (
                <>
                  <Ionicons name="image-outline" size={30} color="#111827" />
                  <Text style={styles.mainImageText}>Add image</Text>
                  <Text style={styles.subText}>(Not more than 5mb size)</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Extra Upload */}
            <View style={styles.extraRow}>
              {extraImages.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={styles.extraPreview}
                />
              ))}

              <TouchableOpacity
                style={styles.extraBox}
                onPress={() =>
                  pickImage((uri) => setExtraImages([...extraImages, uri]))
                }
              >
                <Ionicons name="image-outline" size={18} color="#111827" />
                <Text style={styles.extraText}>Add image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addMoreBtn}
                onPress={() =>
                  pickImage((uri) => setExtraImages([...extraImages, uri]))
                }
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('./sel-businesstype')}
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
    backgroundColor: "#FDFDFD",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
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
    width: "65%", // 2/3 progress
    height: "100%",
    backgroundColor: "#6366F1",
    borderRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "#111827",
    fontWeight:400,
    marginBottom: 20,
    lineHeight: 20,
  },
  uploadCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  logoBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  logoText: {
    fontSize: 12,
    marginTop: 4,
    color: "#6B7280",
  },
  logoPreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainImageBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  mainImagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainImageText: {
    fontSize: 14,
    marginTop: 8,
    color: "#111827",
  },
  subText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  extraBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  extraText: {
    fontSize: 12,
    color: "#6B7280",
  },
  addMoreBtn: {
    backgroundColor: "#4A154B",
    borderRadius: 20,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  extraPreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#4A154B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
