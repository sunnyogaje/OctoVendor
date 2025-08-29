// app/(main)/wallet.tsx
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
import Svg, { Path } from 'react-native-svg';

/* SVG ICONS — replace paths if your filenames differ */
import BankIcon from '@/assets/icons/bank.svg';
import CashInIcon from '@/assets/icons/cash-in.svg';
import CashOutIcon from '@/assets/icons/cash-out.svg';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E7EB',
  cardLav: '#ECE7F2',
  cardPeach: '#FFF3E6',
  green: '#00C084',
  orange: '#F59E0B',
};

/* ---------------- Donut ---------------- */
function DonutChart({
  orders,
  onSite,
  size = 200,
  thickness = 44,
  startAtTop = true,
}: {
  orders: number;
  onSite: number;
  size?: number;
  thickness?: number;
  startAtTop?: boolean;
}) {
  const total = Math.max(1, orders + onSite);
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2;
  const r = R - thickness;
  const startAngle = startAtTop ? -Math.PI / 2 : 0;

  const arc = (RR: number, a0: number, a1_: number) => {
    const x0 = cx + RR * Math.cos(a0);
    const y0 = cy + RR * Math.sin(a0);
    const x1 = cx + RR * Math.cos(a1_);
    const y1 = cy + RR * Math.sin(a1_);
    const large = a1_ - a0 > Math.PI ? 1 : 0;
    return { x0, y0, x1, y1, large };
  };

  const ringSlicePath = (a0: number, a1_: number) => {
    const outer = arc(R, a0, a1_);
    const inner = arc(r, a1_, a0);
    return `
      M ${outer.x0} ${outer.y0}
      A ${R} ${R} 0 ${outer.large} 1 ${outer.x1} ${outer.y1}
      L ${inner.x0} ${inner.y0}
      A ${r} ${r} 0 ${inner.large} 0 ${inner.x1} ${inner.y1}
      Z
    `;
  };

  const a1 = (onSite / total) * Math.PI * 2; // purple
  const a2 = (orders / total) * Math.PI * 2; // orange

  const a0 = startAngle;
  const aMid = a0 + a1;
  const aEnd = aMid + a2;

  return (
    <Svg width={size} height={size}>
      <Path d={ringSlicePath(a0, aMid)} fill={P.orange} />
      <Path d={ringSlicePath(aMid, aEnd)} fill={P.purple} />
    </Svg>
  );
}

function DonutWithLegend({
  orders,
  onSite,
  size = 200,
  thickness = 48,
}: {
  orders: number;
  onSite: number;
  size?: number;
  thickness?: number;
}) {
  return (
    <View style={{ width: size, alignSelf: 'center', marginTop: 6, position: 'relative' }}>
      <DonutChart orders={orders} onSite={onSite} size={size} thickness={thickness} />
      <Text style={[styles.legendText, { position: 'absolute', right: -50, top: size / 2 - 50 }]}>
        Orders
      </Text>
      <Text style={[styles.legendText, { position: 'absolute', left: -90, bottom: 50 }]}>
        On-Site Sales
      </Text>
    </View>
  );
}

/* ---------------- Screen ---------------- */
export default function Wallet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const BOTTOM_PAD = Math.max(24, tabBarH + insets.bottom + 12);

  const txns = [
    {
      id: 't1',
      type: 'received' as const,
      title: 'Payment Received',
      subtitle: 'Order #67890',
      amount: 50,
    },
    {
      id: 't2',
      type: 'received' as const,
      title: 'Payment Received',
      subtitle: 'Order #54321',
      amount: 50,
    },
    {
      id: 't3',
      type: 'withdrawal' as const,
      title: 'Withdrawal',
      subtitle: 'You sent money to 100769395',
      amount: -50,
    },
    {
      id: 't4',
      type: 'received' as const,
      title: 'Payment Received',
      subtitle: 'Order #98765',
      amount: 50,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: BOTTOM_PAD }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[styles.header, { marginTop: HEADER_TOP }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="arrow-back" size={24} color={P.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter} pointerEvents="none">
            <Text style={styles.headerTitle}>Wallet</Text>
          </View>
        </View>

        {/* Stat cards */}
        <View style={styles.cardsRow}>
          <View style={[styles.statCard, { backgroundColor: P.cardLav }]}>
            <Text style={styles.statLabel}>Available Balance</Text>
            <Text style={styles.statValue}>₦800,000</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: P.cardPeach }]}>
            <Text style={styles.statLabel}>Pending Withdrawals</Text>
            <Text style={styles.statValue}>₦0.00</Text>
          </View>
        </View>

        {/* Account details row */}
        <View style={styles.accountRow}>
          <View style={styles.bankIcon}>
            {/* SVG instead of Ionicons (same size/color intent) */}
            <BankIcon width={25} height={25} color={P.purple} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.accTitle}>Account Details</Text>
            <Text style={styles.accSub}>10007556376 AccessBank</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.unlink}>Unlink</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings Breakdown card */}
        <View style={styles.breakdownCard}>
          <TouchableOpacity onPress={() => router.push("./withdraw/")} activeOpacity={0.9} style={styles.withdrawPill}>
            <Text style={styles.withdrawPillText}>Withdraw Funds</Text>
          </TouchableOpacity>

          <Text style={styles.breakdownTitle}>Earnings Breakdown</Text>
          <Text style={styles.totalAmount}>₦800,000</Text>
          <Text style={styles.totalLabel}>Total</Text>

          <DonutWithLegend orders={400000} onSite={400000} size={200} thickness={50} />
        </View>

        {/* -------- Transaction History -------- */}
        <Text style={styles.historyH1}>Transaction History</Text>

        <View style={styles.historyCard}>
          {txns.map((t, idx) => {
            const isLast = idx === txns.length - 1;
            const isIn = t.amount >= 0;
            const iconBG = t.type === 'received' ? '#EAFDF5' : '#FFECEC';
            const iconColor = t.type === 'received' ? P.green : '#FF5A5F';

            return (
              <View key={t.id} style={[styles.txnRow, !isLast && styles.txnDivider]}>
                {/* Left icon (SVG) */}
                <View style={[styles.txnIconWrap, { backgroundColor: iconBG }]}>
                  {t.type === 'received' ? (
                    <CashInIcon width={22} height={22} fill={iconColor} color={iconColor} />
                  ) : (
                    <CashOutIcon width={22} height={22} fill={iconColor} color={iconColor} />
                  )}
                </View>

                {/* Middle text */}
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.txnTitle}>{t.title}</Text>
                  <Text style={styles.txnSub}>{t.subtitle}</Text>
                </View>

                {/* Amount */}
                <Text style={[styles.txnAmount, { color: isIn ? '#111827' : '#111827' }]}>
                  {isIn ? '+' : '-'}₦{Math.abs(t.amount).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16 },

  header: { minHeight: 44, justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, padding: 6 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', color: P.text },

  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 16 },
  statCard: { width: '48%', borderRadius: 14, padding: 16, paddingVertical: 35 },
  statLabel: { fontSize: 16, color: '#1a1a1aff', marginBottom: 25 },
  statValue: { fontSize: 24, fontWeight: '600', color: '#374151' },

  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: P.border,
    marginBottom: 20,
  },
  bankIcon: {
    width: 50, height: 50, borderRadius: 5,
    backgroundColor: '#F2EAF7',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  accTitle: { fontSize: 17, color: P.text, marginBottom: 2 },
  accSub: { fontSize: 15, color: '#6B7280' },
  unlink: { color: P.purple, fontWeight: '500', fontSize: 15 },

  breakdownCard: { borderRadius: 14, backgroundColor: '#FFFFFF' },
  withdrawPill: {
    alignSelf: 'flex-end',
    backgroundColor: P.purple,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 20,
    marginBottom: 8,
  },
  withdrawPillText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  breakdownTitle: { fontSize: 17, color: P.text, fontWeight: '500', marginTop: 30, marginBottom: 15 },
  totalAmount: { fontSize: 25, fontWeight: '600', color: '#374151', marginBottom: 12 },
  totalLabel: { fontSize: 16, color: '#6B7280', marginBottom: 2 },

  legendText: { fontSize: 14, color: '#374151' },

  /* History */
  historyH1: { fontSize: 23, fontWeight: '700', color: P.text, marginTop: 55, marginBottom: 10 },
  historyCard: {
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txnDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFF1',
  },
  txnIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txnTitle: { fontSize: 16, fontWeight: '500', color: P.text },
  txnSub: { fontSize: 15, color: '#8A8FA3', marginTop: 4 },
  txnAmount: { fontSize: 17, fontWeight: '400' },
});