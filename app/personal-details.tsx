import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E0F5',
};

export default function PersonalDetails() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Platform-tuned top spacing AFTER the safe area.
  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });

  // Input height tuned per platform for consistent feel.
  const INPUT_H = Platform.select({ ios: 52, android: 50, web: 48 });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.page, { maxWidth: isTablet ? 640 : '100%' }]}>
          {/* Header with Back button */}
          <View style={[styles.header, { marginTop: HEADER_TOP }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={P.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: isTablet ? 28 : 24 }]}>
              Personal Details
            </Text>
          </View>

          {/* Input fields */}
          <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter your first name"
              style={[styles.input, { height: INPUT_H }]}
              placeholderTextColor={P.subtext}
              textAlignVertical="center"
            />

            <Text style={styles.label}>Last name</Text>
            <TextInput
              placeholder="Enter your last name"
              style={[styles.input, { height: INPUT_H }]}
              placeholderTextColor={P.subtext}
              textAlignVertical="center"
            />

            <Text style={styles.label}>Contact Address</Text>
            <TextInput
              placeholder="Your address"
              style={[styles.input, { height: INPUT_H }]}
              placeholderTextColor={P.subtext}
              textAlignVertical="center"
            />

            <Text style={styles.label}>Referral code (Optional)</Text>
            <TextInput
              placeholder="Your referral code"
              style={[styles.input, { height: INPUT_H }]}
              placeholderTextColor={P.subtext}
              textAlignVertical="center"
            />

            <Text style={styles.label}>Your Birthday</Text>
            <TextInput
              placeholder="DD/MM/YY"
              style={[styles.input, { height: INPUT_H }]}
              placeholderTextColor={P.subtext}
              textAlignVertical="center"
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.cta}
            onPress={() => router.push('./EnableBookingScreen')}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  // Always 16 horizontal padding (as requested) and enough bottom space for the CTA.
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Center the “page” on tablets/web for better readability.
  page: {
    width: '100%',
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backBtn: {
    marginRight: 12,
    padding: 6,
  },
  headerTitle: {
    fontWeight: '600',
    color: P.text,
  },

  form: { marginBottom: 24, marginTop: 4 },

  label: {
    fontSize: 15,
    fontWeight: '500',
    color: P.text,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: P.border,
    borderRadius: 10,
    paddingHorizontal: 14, // keep roomy text padding
    // no paddingVertical—height controls vertical rhythm consistently
    fontSize: 15,
    marginBottom: 16,
    color: P.text,
  },

  cta: {
    backgroundColor: P.purple,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        }
      : { elevation: 2 }),
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});