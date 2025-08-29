// app/(main)/targets-review.tsx
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
  subtext: '#111827',
  border: '#E5E7EB',
  chipBg: '#F8F6FB',
};

export default function TargetsReview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  // Your iOS tab bar is absolute; tabBarH already includes the bottom inset.
  const footerClearance =
    Platform.OS === 'ios'
      ? Math.max(8, tabBarH - insets.bottom + 8) // avoid double-counting inset on iOS
      : Math.max(8, tabBarH + insets.bottom + 8);

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const FOOTER_H = 48;

  // mock values
  const currency = '₦';
  const targetSales = '800,000';
  const targetOrders = '100';
  const newCustomers = '100';
  const returningCustomers = '100';
  const timeframe = 'Monthly';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { marginTop: HEADER_TOP }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color={P.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter} pointerEvents="none">
            <Text style={styles.headerTitle}>Set your targets</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            // leave room for the pinned footer + whatever sits at the bottom
            paddingBottom: FOOTER_H + footerClearance,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.h1}>Review your targets</Text>
          <Text style={styles.desc}>
            You're about to set the following targets for your store. Please review and confirm.
          </Text>

          <Text style={styles.sectionTitle}>Revenue Target</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Total Sales</Text>
              <Text style={styles.subValue}>{currency}{targetSales}</Text>
            </View>
            <Text style={styles.rowValue}>{currency}{targetSales}</Text>
          </View>

          <Text style={styles.sectionTitle}>Order Target</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Total Orders</Text>
              <Text style={styles.subValue}>{targetOrders}</Text>
            </View>
            <Text style={styles.rowValue}>{targetOrders}</Text>
          </View>

          <Text style={styles.sectionTitle}>Marketing Target</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>New Customers</Text>
              <Text style={styles.subValue}>{newCustomers}</Text>
            </View>
            <Text style={styles.rowValue}>{newCustomers}</Text>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Returning Customers</Text>
              <Text style={styles.subValue}>{returningCustomers}</Text>
            </View>
            <Text style={styles.rowValue}>{returningCustomers}</Text>
          </View>

          <Text style={styles.sectionTitle}>Target Timeframe</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{timeframe}</Text>
          </View>
        </ScrollView>

        {/* Pinned footer */}
        <View style={[styles.footer, { bottom: footerClearance, height: FOOTER_H }]}>
          <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.9} onPress={() => router.back()}>
            <Text style={styles.modifyText}>Modify</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmBtn}
            activeOpacity={0.9}
            onPress={() => router.push('/target/myProgress')}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  page: { flex: 1 },

  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 16, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: P.text },

  h1: { fontSize: 24, fontWeight: '500', color: P.text, marginTop: 25, marginBottom: 20 },
  desc: { fontSize: 17, color: P.subtext, marginBottom: 18 },

  sectionTitle: { fontSize: 19, fontWeight: '600', color: P.text, marginTop: 14, marginBottom: 10 },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F3',
  },
  rowLabel: { fontSize: 17, color: P.text, marginBottom: 8 },
  subValue: { fontSize: 15, color: P.subtext },
  rowValue: { fontSize: 16, color: P.text, fontWeight: '400' },

  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8F6FB',
    borderColor: '#ECE9F3',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 4,
    marginBottom: 30,
  },
  chipText: { fontSize: 14, color: P.text, fontWeight: '500' },

  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: "45%",                 // numeric gap (RN-friendly)
  },
  modifyBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A154B',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modifyText: { color: P.text, fontSize: 16, fontWeight: '600' },
  confirmBtn: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: P.purple,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } }
      : { elevation: 2 }),
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});