// app/(main)/loyalty-points.tsx
import React, { useMemo, useState } from 'react';
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
  green: '#00C084',
  blue: '#3B82F6',
};

type TabKey = 'Issued' | 'Pending';

export default function LoyaltyPoints() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_PAD = Math.max(24, tabBarH + insets.bottom + 12);

  const [tab, setTab] = useState<TabKey>('Issued');
  const [q, setQ] = useState('');

  const issued = useMemo(
    () => [
      { id: '1', title: 'Issued 250 Points', order: '#12345', when: '2 days ago' },
      { id: '2', title: 'Issued 500 Points', order: '#67890', when: '1 week ago' },
      { id: '3', title: 'Issued 500 Points', order: '#11223', when: '2 weeks ago' },
      { id: '4', title: 'Issued 500 Points', order: '#44122', when: '2 weeks ago' },
    ].filter(i => i.title.toLowerCase().includes(q.toLowerCase()) || i.order.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const pending = useMemo(
    () => [
      { id: 'p1', title: 'Pending 300 Points', order: '#77881', when: '3 days ago' },
      { id: 'p2', title: 'Pending 150 Points', order: '#99101', when: '1 week ago' },
    ].filter(i => i.title.toLowerCase().includes(q.toLowerCase()) || i.order.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  const list = tab === 'Issued' ? issued : pending;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: BOTTOM_PAD }]}
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

        {/* Profile block */}
        <View style={styles.profileWrap}>
          <View style={styles.avatar}>
            <View style={styles.avatarInner}>
              <Ionicons name="person" size={26} color="#000" />
            </View>
          </View>

          <Text style={styles.name}>Hannah Famodimu</Text>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>1,250 Points</Text>

          <View style={styles.storeIdChip}>
            <Text style={styles.storeIdText}>Store ID: 1023U2O</Text>
          </View>

          <View style={styles.ctaRow}>
            <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: P.green }]} activeOpacity={0.9} onPress={() => router.push("/requestPayment")}>
              <Text style={styles.ctaBtnText}>Issue Point</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: P.blue }]} activeOpacity={0.9} onPress={() => router.push("/activatePoints/purchasePoints")}>
              <Text style={styles.ctaBtnText}>Purchase point</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History */}
        <Text style={styles.h1}>Points History</Text>

        {/* Tabs – rounded top container, labels at extremes, short underlines */}
        <View style={styles.tabsShell}>
          {(['Issued', 'Pending'] as TabKey[]).map((t, i) => {
            const active = tab === t;
            const isLeft = i === 0;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(t)}
                activeOpacity={0.85}
                style={[styles.tabHalf, isLeft ? styles.tabLeft : styles.tabRight]}
              >
                <Text
                  style={[
                    styles.tabLbl,
                    active ? styles.tabLblActive : styles.tabLblInactive,
                    isLeft ? styles.tabLblLeft : styles.tabLblRight,
                  ]}
                >
                  {t}
                </Text>
                <View
                  style={[
                    styles.underline,
                    active ? styles.underlineActive : styles.underlineInactive,
                    isLeft ? styles.underlineLeft : styles.underlineRight,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={25} color={P.purple} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            value={q}
            onChangeText={setQ}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        {/* Empty state */}
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>
            Activate your loyalty program to start{'\n'}Issuing points
          </Text>

          <TouchableOpacity style={styles.activateBtn} activeOpacity={0.9} onPress={() => router.push("/activatePoints/activate")}>
            <Text style={styles.activateText}>Activate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16 },

  // Header
  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 25, fontWeight: '600', color: P.text },

  // Profile
  profileWrap: { alignItems: 'center', marginTop: 30 },
  avatar: {
    width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center',
  },
  avatarInner: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#F43F5E', alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 24, fontWeight: '600', color: P.text, marginTop: 0 },
  balanceLabel: { fontSize: 16, color: '#9CA3AF', marginTop: 6 },
  balanceValue: { fontSize: 17, color: '#6B7280', marginBottom: 10 },

  storeIdChip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 3,
    backgroundColor: P.purple, marginTop: 2, marginBottom: 14,
  },
  storeIdText: { color: '#fff', fontWeight: '500' },

  ctaRow: { flexDirection: 'row', gap: '16%', marginTop: 20, marginBottom: 50 },
  ctaBtn: { minWidth: 150, borderRadius: 15, paddingVertical: 12, paddingHorizontal: 10, alignItems: 'center' },
  ctaBtnText: { color: '#fff', fontWeight: '600' },

  // History section
  h1: { fontSize: 18, fontWeight: '600', color: P.text, alignSelf: 'flex-start', marginBottom: 10 },

  /* ---- Tabs (new) ---- */
  tabsShell: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderColor: '#ECEFF3',
    borderWidth: 1,
    borderBottomWidth: 0,           // only top border
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 12,
  },
  tabHalf: { flex: 1 },
  tabLeft: { alignItems: 'flex-start' },
  tabRight: { alignItems: 'flex-end' },

  tabLbl: { fontSize: 16, fontWeight: '600' },
  tabLblActive: { color: P.text },
  tabLblInactive: { color: '#A3A8B4' },
  tabLblLeft: { textAlign: 'left' },
  tabLblRight: { textAlign: 'right' },

  underline: {
    height: 2,
    borderRadius: 2,
    width: 72,                     // short underline
    marginTop: 6,
  },
  underlineActive: { backgroundColor: P.purple },
  underlineInactive: { backgroundColor: '#D3D7DF' },
  underlineLeft: { alignSelf: 'flex-start' },
  underlineRight: { alignSelf: 'flex-end' },

  // Search
  searchWrap: {
    position: 'relative',
    width: '100%',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
    marginBottom: 12, marginTop: 10, backgroundColor: '#F7F7FB',
  },
  searchIcon: { position: 'absolute', left: 12, top: 10 },
  searchInput: { paddingLeft: 50, paddingRight: 14, height: 44, fontSize: 15, color: P.text },
  // Empty state
  emptyWrap: { alignItems: 'center', paddingTop: 24, paddingBottom: 28, paddingHorizontal: 16 },
  emptyTitle: { fontSize: 19, lineHeight: 24, color: P.text, textAlign: 'center', fontWeight: '600', marginBottom: 22 },

  activateBtn: {
    backgroundColor: P.purple,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }
      : { elevation: 2 }),
  },
  activateText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});