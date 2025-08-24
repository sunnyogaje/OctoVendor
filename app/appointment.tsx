import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
export default function BusinessInfoScreen() {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const router = useRouter();

  const { width } = useWindowDimensions();
	const isTablet = width >= 768;

  // Platform-tuned top spacing AFTER the safe area.
const HEADER_TOP = Platform.select({ ios: 12, android: 40, web: 24 });

	// Input height tuned per platform for consistent feel.
	const INPUT_H = Platform.select({ ios: 52, android: 50, web: 48 });

  const handleContinue = () => {
    // handle navigation or form submission
    console.log({ businessName, address, phone });
    router.push('./appoint_upload')
  };

  return (
    <SafeAreaView style={styles.container} >
      	<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
      <View style={[styles.page, { maxWidth: isTablet ? 640 : '100%' }]}>
      <View style={[styles.header,{ marginTop: HEADER_TOP }]}>
        <TouchableOpacity
							onPress={() => router.back()}
							style={styles.backBtn}
							hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
							activeOpacity={0.7}
						>
							<Ionicons name="arrow-back" size={24}  />
						</TouchableOpacity>
        <Text style={styles.headerTitle}>Business Information</Text>
      </View>

      <Text style={styles.progressText}>1/3</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.title}>Tell us about your business</Text>

      <TextInput
        style={styles.input}
        placeholder="Business name"
        placeholderTextColor="#92959C"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#92959C"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        placeholderTextColor="#92959C"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
    // padding: 20,
    backgroundColor: '#FDFDFD',
     fontFamily:'Lato',
  },

  scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingBottom: 32,
	},

  page: {
		width: '100%',
		alignSelf: 'center',
	},


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  backBtn: {
		marginRight: 12,
		padding: 6,
	},
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#111827',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E5F7',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressFill: {
    width: '30%',
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
    fontFamily:'Lato',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 13,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4A154B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '20%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
