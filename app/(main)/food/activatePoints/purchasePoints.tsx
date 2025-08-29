// app/(main)/points-buy.tsx
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
};

const PRICE_PER_POINT = 100; // ₦100 / point

const PACKS = [
  { id: 'p500', points: 500, price: 500 * PRICE_PER_POINT },
  { id: 'p1000', points: 1000, price: 1000 * PRICE_PER_POINT },
  { id: 'p2000', points: 2000, price: 2000 * PRICE_PER_POINT },
];

function formatNGN(n: number) {
  try {
    return new Intl.NumberFormat('en-NG').format(n);
  } catch {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export default function PointsBuy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_PAD = Math.max(24, tabBarH + insets.bottom + 12);

  const [customPts, setCustomPts] = useState<string>('');

  const total = useMemo(() => {
    const pts = parseInt(customPts.replace(/[^\d]/g, ''), 10);
    if (Number.isNaN(pts)) return 0;
    return pts * PRICE_PER_POINT;
  }, [customPts]);

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

        {/* Page title + blurb */}
        <Text style={styles.h1}>Buy Points</Text>
        <Text style={styles.blurb}>
          Boost your loyalty program’s appeal by offering more points to your customers.
          Purchase points in bulk and distribute them as rewards.
        </Text>

        {/* Packs */}
        {PACKS.map(p => (
          <View key={p.id} style={styles.packCard}>
            <Text style={styles.packPoints}>
              {p.points.toLocaleString()} Points
            </Text>
            <Text style={styles.packPrice}>₦{formatNGN(p.price)}</Text>

            <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
              <Text style={styles.buyBtnText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Custom purchase */}
        <Text style={styles.sectionLabel}>Custom Purchase</Text>
        <TextInput
          value={customPts}
          onChangeText={setCustomPts}
          placeholder="Enter number of points"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          returnKeyType="done"
          style={styles.input}
        />

        <Text style={styles.totalText}>
          Total Cost: <Text style={styles.totalStrong}>₦{formatNGN(total)}</Text>
        </Text>
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
  headerTitle: { fontSize: 20, fontWeight: '600', color: P.text },

  h1: { fontSize: 20, fontWeight: '600', color: P.text, marginTop: 16, marginBottom: 8 },
  blurb: { fontSize: 15, color: P.subtext, lineHeight: 20, marginBottom: 30 },

  packCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: P.border,
    padding: 16,
    paddingVertical: 30,
    marginBottom: 14,
  },
  packPoints: { fontSize: 16, fontWeight: '700', color: P.text, marginBottom: 6 },
  packPrice: { fontSize: 35, fontWeight: '600', color: '#111', marginBottom: 14 },

  buyBtn: {
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F2F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: { color: '#2C2C2C', fontSize: 15, fontWeight: '600' },

  sectionLabel: { fontSize: 14, fontWeight: '600', color: P.text, marginTop: 10, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: P.border,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 15,
    color: P.text,
    backgroundColor: '#fff',
    marginBottom: 12,
  },

  totalText: { fontSize: 14, color: P.text, marginTop: 4 },
  totalStrong: { fontWeight: '700' },
});