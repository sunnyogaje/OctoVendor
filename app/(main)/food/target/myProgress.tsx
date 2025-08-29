// app/(main)/my-progress.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E0F5',
};

export default function MyProgress() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_GUTTER = Math.max(24, tabBarHeight + insets.bottom + 12);

  const orders = { current: 20, total: 100 };
  const revenue = { current: 1000, total: 800_000 };
  const newCustomers = { current: 10, total: 100 };
  const returningCustomers = { current: 10, total: 100 };
  const pct = (c: number, t: number) => Math.max(0, Math.min(1, t === 0 ? 0 : c / t));

  const rewards = [
    { id: 'rising', title: "Unlock the 'Rising Star' Badge", description: 'Reach 50 total orders target to earn this badge and boost your visibility.', locked: true },
    { id: 'pro', title: "Unlock the 'Pro' Badge", description: 'Reach 150 total orders target to earn this badge and boost your visibility.', locked: true },
    { id: 'elite', title: "Unlock the 'Elite' Badge", description: 'Reach 500 total orders target to earn this badge and boost your visibility.', locked: true },
    { id: 'legend', title: "Unlock the 'Legend' Badge", description: 'Reach 1,000 total orders target to earn this badge and boost your visibility.', locked: true },
  ];

  /* ---------- Bottom-sheet modal ---------- */
  // Make it about 55% of the screen height (bounded for small/large phones)
  const SHEET_H = Math.min(560, Math.max(380, height * 0.55));

  const [sheetVisible, setSheetVisible] = useState(false);
  const translateY = useRef(new Animated.Value(SHEET_H)).current;

  const openCongrats = () => {
    setSheetVisible(true);
    requestAnimationFrame(() => {
      translateY.setValue(SHEET_H);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  const closeCongrats = () => {
    Animated.timing(translateY, {
      toValue: SHEET_H,
      duration: 240,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setSheetVisible(false);
    });
  };

  const reachedAny =
    orders.current >= orders.total ||
    revenue.current >= revenue.total ||
    newCustomers.current >= newCustomers.total ||
    returningCustomers.current >= returningCustomers.total;

  useEffect(() => {
    if (reachedAny) openCongrats();
  }, [reachedAny]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: BOTTOM_GUTTER }]}
      >
        <View style={[styles.page, { maxWidth: isTablet ? 640 : '100%' }]}>
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
              <Text style={[styles.headerTitle, { fontSize: isTablet ? 24 : 20 }]}>My Progress</Text>
            </View>

            <TouchableOpacity onPress={openCongrats} style={styles.headerRight} hitSlop={10}>
              <Ionicons name="trophy-outline" size={22} color={P.text} />
            </TouchableOpacity>
          </View>

          {/* Current Targets */}
          <Text style={styles.sectionH11}>Current Targets</Text>

          {[
            {
              label: 'Orders', cur: orders.current, tot: orders.total,
              desc: `You're ${Math.round(pct(orders.current, orders.total) * 100)}% of the way to your target of ${orders.total} orders this month.`,
            },
            {
              label: 'Revenue', cur: revenue.current, tot: revenue.total,
              desc: `You've earned ₦${revenue.current.toLocaleString()} towards your ₦${revenue.total.toLocaleString()} revenue goal.`,
            },
            {
              label: 'New Customers', cur: newCustomers.current, tot: newCustomers.total,
              desc: `You got ${newCustomers.current} new customers towards your  ${newCustomers.total} customer goals.`,
            },
            {
              label: 'Returning Customers', cur: returningCustomers.current, tot: returningCustomers.total,
              desc: `${returningCustomers.current} customers returned to you out of your ${returningCustomers.total} returning customers goals`,
            },
          ].map((m) => (
            <View key={m.label} style={styles.metricBlock}>
              <View style={styles.metricRow}>
                <Text style={styles.metricTitle}>{m.label}</Text>
                <Text style={styles.metricRight}>
                  {m.label === 'Revenue' ? m.cur : `${m.cur}`}
                  {m.label === 'Orders' ? `/${m.tot}` : m.label === 'Revenue' ? '' : ''}
                </Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct(m.cur, m.tot) * 100}%` }]} />
              </View>
              <Text style={styles.metricDesc}>{m.desc}</Text>
            </View>
          ))}

          {/* Rewards */}
          <Text style={[styles.sectionH12, { marginTop: 18 }]}>Rewards</Text>

          {rewards.map((r) => (
            <View key={r.id} style={styles.rewardRow}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.rewardTitle}>{r.title}</Text>
                <Text style={styles.rewardDesc} numberOfLines={2}>
                  {r.description}
                </Text>
              </View>
              <View style={styles.badgeTile}>
                <View style={styles.badgeInner}>
                  <Ionicons name={r.locked ? 'lock-closed' : 'ribbon'} size={28} color="#fff" />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ---------- Bottom-sheet Modal ---------- */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeCongrats}
      >
        <Pressable style={styles.backdrop} onPress={closeCongrats} />

        <Animated.View
          style={[
            styles.sheet,
            {
              minHeight: SHEET_H,
              paddingBottom: insets.bottom + 20,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Close */}
          <TouchableOpacity onPress={closeCongrats} style={styles.sheetClose} hitSlop={10}>
            <Ionicons name="close" size={30} color="#111827" />
          </TouchableOpacity>

          {/* PNG icon — replace path with your asset */}

          <Text style={styles.sheetTitle}>Target Reached</Text>
          <Image
            source={require('@/assets/images/celebrate.png')}
            style={styles.sheetImage}
            resizeMode="contain"
          />
          <Text style={styles.sheetMsg}>
            You've reached your target for the week! Keep up the great work.
          </Text>
          <Text style={styles.sheetCongrats}>Congratulations, Hannah!</Text>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16 },
  page: { width: '100%', alignSelf: 'center' },

  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerRight: { position: 'absolute', right: 0, padding: 6 },
  headerTitle: { fontWeight: '600', color: P.text },

  sectionH11: { fontSize: 24, lineHeight: 50, fontWeight: '600', color: P.text, marginTop: 12, marginBottom: 30 },
  sectionH12: { fontSize: 24, lineHeight: 50, fontWeight: '600', color: P.text, marginTop: 12 },

  metricBlock: { marginBottom: 18 },
  metricRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  metricTitle: { fontSize: 18, fontWeight: '500', color: P.text, marginBottom: 10 },
  metricRight: { fontSize: 15, color: P.text },
  track: { height: 8, borderRadius: 6, backgroundColor: '#EEE8F4', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: P.purple, borderRadius: 6 },
  metricDesc: { marginTop: 12, color: P.subtext, fontSize: 15, lineHeight: 20 },

  rewardRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rewardTitle: { fontSize: 16, fontWeight: '700', color: P.text, marginBottom: 6 },
  rewardDesc: { fontSize: 14, color: P.subtext, lineHeight: 20 },
  badgeTile: { width: 96, height: 96, borderRadius: 16, backgroundColor: '#2F3A3D', alignItems: 'center', justifyContent: 'center' },
  badgeInner: { width: 64, height: 64, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },

  /* Bottom sheet */
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: '#F6F8F9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
    // shadow
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 14,
  },
  sheetClose: { position: 'absolute', top: 15, left: 15, padding: 6 },
  sheetImage: { width: 120, height: 120, marginTop: 12, marginBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: '400', color: '#111827', marginTop: '20%' },
  sheetMsg: { fontSize: 18, color: '#4B5563', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  sheetCongrats: { fontSize: 25, fontWeight: '700', color: '#111827', marginTop: 25, marginBottom: 8 },
});