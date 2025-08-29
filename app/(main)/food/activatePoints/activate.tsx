// app/(main)/loyalty-activate.tsx
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E7EB',
};

type Plan = '10' | '5' | 'custom';

export default function LoyaltyActivate() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_PAD = Math.max(24, tabBarH + insets.bottom + 12);

  const [plan, setPlan] = useState<Plan>('custom'); // select whatever you want as default
  const [customPct, setCustomPct] = useState('');

  const canActivate = plan !== 'custom' || customPct.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: BOTTOM_PAD }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { marginTop: HEADER_TOP }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={P.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter} pointerEvents="none">
            <Text style={styles.headerTitle}>Loyalty Points</Text>
          </View>
        </View>

        {/* Title + blurb */}
        <Text style={styles.h1}>Activate your loyalty program</Text>
        <Text style={styles.blurb}>
          Select a program that best suits your business and customer base. Each option
          offers a unique way to reward your loyal customers.
        </Text>

        {/* Options */}
        {/* 10% */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPlan('10')}
          style={[styles.optionRow, { borderTopWidth: 0 }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>10% (Recommended)</Text>
            <Text style={styles.optionSub}>Customers earn 10 points for every ₦100 spent.</Text>
          </View>
          <View style={[styles.radioOuter, plan === '10' && styles.radioOuterActive]}>
            {plan === '10' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* 5% */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPlan('5')}
          style={styles.optionRow}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>5%</Text>
            <Text style={styles.optionSub}>Customers earn 5 points for every ₦100 spent.</Text>
          </View>
          <View style={[styles.radioOuter, plan === '5' && styles.radioOuterActive]}>
            {plan === '5' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Custom */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setPlan('custom')}
          style={[styles.optionRow, { borderBottomWidth: 0 }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Custom</Text>
            <Text style={styles.optionSub}>Set a custom percentage for customer rewards.</Text>
          </View>
          <View style={[styles.radioOuter, plan === 'custom' && styles.radioOuterActive]}>
            {plan === 'custom' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* Custom input ONLY when Custom selected */}
        {plan === 'custom' && (
          <TextInput
            value={customPct}
            onChangeText={setCustomPct}
            placeholder="Enter  custom percentage"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            returnKeyType="done"
            style={styles.input}
          />
        )}

        {/* Activate button */}
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={!canActivate}
          style={[styles.cta, !canActivate && { opacity: 0.5 }]}
           onPress={() => router.push("/activatePoints")}
        >
          <Text style={styles.ctaText}>Activate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16 },

  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '500', color: P.text },

  h1: { fontSize: 22, fontWeight: '600', color: P.text, marginTop: 16, marginBottom: 10 },
  blurb: { fontSize: 15, color: P.subtext, lineHeight: 22, marginBottom: 14 },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: P.border,
    backgroundColor: '#fff',
  },
  optionTitle: { fontSize: 18, fontWeight: '500', color: P.text, marginBottom: 6 },
  optionSub: { fontSize: 14, color: P.subtext },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioOuterActive: { borderColor: P.purple },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: P.purple,
  },

  input: {
    borderWidth: 1,
    borderColor: P.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12 }),
    fontSize: 16,
    color: P.text,
    backgroundColor: '#fff',
    marginTop: 8,
  },

  cta: {
    backgroundColor: P.purple,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }
      : { elevation: 2 }),
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});