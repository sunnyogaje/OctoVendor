import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

/* ---------------- Sparkline ---------------- */
function Sparkline() {
  const values = [0.55, 0.35, 0.5, 0.6, 0.15, 0.8, 0.65];
  const W = 320;
  const H = 120;
  const PADDING = 6;

  const stepX = (W - PADDING * 2) / (values.length - 1);
  const points = values.map((v, i) => {
    const x = PADDING + i * stepX;
    const y = PADDING + (1 - v) * (H - PADDING * 2);
    return { x, y };
  });

  const t = 0.2;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return (
    <Svg width="100%" height={H}>
      <Path d={d} stroke="#10B981" strokeWidth={3} fill="none" />
    </Svg>
  );
}

/* ---------------- Theme & Data ---------------- */
const P = {
  text: '#111827',
  subtext: '#6B7280',
  purple: '#4A154B',
  border: '#E5E0F5',
  orange: '#F59E0B',
};

type RecentOrder = { id: string; customer: string; date: string };
const RECENT_ORDERS: RecentOrder[] = [
  { id: '12345', customer: 'Hannah Famodimu', date: 'Oct 26' },
  { id: '12346', customer: 'Hannah Famodimu', date: 'Oct 25' },
  { id: '12347', customer: 'Hannah Famodimu', date: 'Oct 24' },
  { id: '12348', customer: 'Noah Thompson', date: 'Oct 23' },
];

type Metric = 'Revenue' | 'Orders';

/* ---------------- Screen ---------------- */
export default function DashboardHeaderOnly() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const insets = useSafeAreaInsets();
  const H_PADDING = Platform.select<number>({ ios: 32, default: 16 });
  const HEADER_TOP = Platform.select<number>({ ios: 12, android: 16, web: 24 });

  const [online, setOnline] = useState(false);
  const [metric, setMetric] = useState<Metric>('Revenue');

  // Bottom sheet state
  const [sheetVisible, setSheetVisible] = useState(false);
  const translateY = useRef(new Animated.Value(320)).current; // start off-screen

  const openSheet = () => {
    setSheetVisible(true);
    requestAnimationFrame(() => {
      translateY.setValue(320);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 320,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setSheetVisible(false);
    });
  };

  const chooseMetric = (m: Metric) => {
    setMetric(m);
    closeSheet();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: H_PADDING,
          paddingTop: HEADER_TOP,
          paddingBottom: insets.bottom + 100,
        }}
      >
        <View style={[styles.page, { maxWidth: isTablet ? 680 : '100%' }]}>
          {/* HEADER */}
          <View style={styles.headerRow}>

           <TouchableOpacity onPress={() => router.push('./account/account')} >
                     
            <View style={styles.avatar}>
              <Image
                source={require('@/assets/images/profile/profileImg.png')}
                style={styles.avatarImg}
                resizeMode="cover"
              />
            </View>
           </TouchableOpacity>

            <View style={styles.centerOverlay} pointerEvents="none">
              <Text style={styles.title}>Dashboard</Text>
            </View>

            <View style={styles.rightActions}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={P.text}
                style={{ marginRight: 12 }}
              />
              <Switch
                value={online}
                onValueChange={setOnline}
                ios_backgroundColor="#E5E7EB"
                trackColor={{ false: '#E5E7EB', true: '#10B981' }}
                thumbColor="#ffffff"
                style={{ transform: [{ scale: 0.9 }] }}
              />
            </View>
          </View>

          {/* Overview */}
          <Text style={styles.sectionTitle}>Overview</Text>

          <View style={styles.cardsRow}>
            <View style={[styles.card, styles.cardLeft]}>
              <Text style={styles.cardTitle}>{"Today's\nRevenue"}</Text>
              <Text style={[styles.amount, styles.amountGreen]}>₦0.00</Text>
            </View>

            <View style={[styles.card, styles.cardRight]}>
              <Text style={styles.cardTitle}>{"Upcoming\nOrders"}</Text>
              <Text style={[styles.amount, styles.amountBlue]}>0</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.actionBtn, styles.actionPurple]} onPress={() => router.push("./requestPayment/")}>
              <Text style={styles.actionTextLight}>Request for payment</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={[styles.actionBtn, styles.actionOrange]} onPress={() => router.push("./withdraw/")}>
              <Text style={styles.actionTextDark}>Withdraw earnings</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <Text style={styles.quickTitle}>Quick Actions</Text>

          <View style={styles.quickRow}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.quickPill, styles.pillPurple]}>
              <Ionicons name="bag-outline" size={24} color={P.purple} style={{ marginRight: 8 }} />
              <Text style={styles.quickText}>Record sales</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={[styles.quickPill, styles.pillOrange]}>
              <Ionicons name="download-outline" size={24} color={P.orange} style={{ marginRight: 8 }} />
              <Text style={styles.quickText}>Download report</Text>
            </TouchableOpacity>
          </View>

          {/* Analytics */}
          <View style={styles.analyticsCard}>
            <View style={styles.analyticsTopRow}>
              <Text style={styles.analyticsTitle}>Analytics</Text>

              <TouchableOpacity activeOpacity={0.9} style={styles.targetChip} onPress={() => router.push("./target/")}>
                <View style={styles.targetIconDot} />
                <Text style={styles.targetChipText}>Set Target</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.analyticsSub}>Revenue Trend</Text>
            <Text style={styles.analyticAmount}>₦0.00</Text>

            <View style={styles.analyticsMetaRow}>
              <Text style={styles.lastDays}>
                Last 7 Days <Text style={styles.positive}>+0%</Text>
              </Text>

              {/* Revenue filter pill -> opens sheet */}
              <TouchableOpacity onPress={openSheet} activeOpacity={0.8} style={styles.filterPill}>
                <Text style={styles.filterPillText}>{metric}</Text>
                <Ionicons name="chevron-down" size={14} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.chartWrap}>
              <Sparkline />
              <View style={styles.xLabels}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <Text key={d} style={styles.xLabel}>{d}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Recent Orders */}
          <Text style={styles.ordersTitle}>Recent Orders</Text>

          <FlatList
            data={RECENT_ORDERS}
            keyExtractor={(it) => it.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            renderItem={({ item }) => (
              <View style={styles.orderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderCustomer}>Customer: {item.customer}</Text>
                  <Text style={styles.orderId}>ID: {item.id}</Text>
                </View>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* ---------- Bottom Sheet Modal ---------- */}
      <Modal
        visible={sheetVisible}
        onRequestClose={closeSheet}
        transparent
        statusBarTranslucent
        animationType="none"
      >
        <Pressable style={styles.backdrop} onPress={closeSheet} />

        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom + 16,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.grabber} />
          <Text style={styles.sheetTitle}>Select metric</Text>

          {/* Option: Revenue */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.optionRow, metric === 'Revenue' && styles.optionRowSelected]}
            onPress={() => chooseMetric('Revenue')}
          >
            <Text style={[styles.optionText, metric === 'Revenue' && styles.optionTextSelected]}>
              Revenue
            </Text>
            <View style={[styles.radioOuter, metric === 'Revenue' && styles.radioOuterActive]}>
              {metric === 'Revenue' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          {/* Option: Orders */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.optionRow, metric === 'Orders' && styles.optionRowSelected]}
            onPress={() => chooseMetric('Orders')}
          >
            <Text style={[styles.optionText, metric === 'Orders' && styles.optionTextSelected]}>
              Orders
            </Text>
            <View style={[styles.radioOuter, metric === 'Orders' && styles.radioOuterActive]}>
              {metric === 'Orders' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const AVATAR = 45;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  page: { width: '100%', alignSelf: 'center' },

  headerRow: { position: 'relative', flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  centerOverlay: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  title: { color: P.text, fontSize: 27, lineHeight: 28, fontWeight: '600' },
  rightActions: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' },
  avatar: { width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2, overflow: 'hidden', backgroundColor: '#F1F5F9' },
  avatarImg: { width: '100%', height: '100%' },

  sectionTitle: { fontSize: 27, paddingVertical: 35, fontWeight: '600', color: P.text },

  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '48%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, paddingHorizontal: 23, paddingVertical: 35, position: 'relative' },
  cardLeft: { backgroundColor: '#ECFDF5', borderColor: '#D1FAE5' },
  cardRight: { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE', overflow: 'hidden' },
  cardTitle: { color: P.subtext, fontSize: 17, lineHeight: 25, marginBottom: 8 },
  amount: { fontSize: 26, fontWeight: '600' },
  amountGreen: { color: '#10B981' },
  amountBlue: { color: '#3B82F6' },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  actionBtn: { width: '48%', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  actionPurple: { backgroundColor: P.purple },
  actionOrange: { backgroundColor: P.orange },
  actionTextLight: { color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
  actionTextDark: { color: '#111827', fontSize: 14, fontWeight: '600' },

  quickTitle: { fontSize: 24, paddingVertical: 25, fontWeight: '700', color: P.text },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  quickPill: { width: '48%', height: 56, borderRadius: 28, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  pillPurple: { backgroundColor: '#EEE8F4' },
  pillOrange: { backgroundColor: '#FFF4E6' },
  quickText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },

  analyticsCard: { marginTop: 20, paddingVertical: 8 },
  analyticsTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  analyticsTitle: { flex: 1, fontSize: 24, lineHeight: 28, fontWeight: '600', color: P.text },
  targetChip: { flexDirection: 'row', alignItems: 'center', height: 35, paddingHorizontal: 15, borderRadius: 16, backgroundColor: '#EFF0FE' },
  targetIconDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#6366F1', marginRight: 6 },
  targetChipText: { fontSize: 12, fontWeight: '600', color: '#6366F1' },
  analyticsSub: { fontSize: 16, color: '#313131ff', marginBottom: 15 },
  analyticAmount: { fontSize: 28, fontWeight: '500', color: '#3e3e3eff', marginBottom: 15 },
  analyticsMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  lastDays: { fontSize: 17, color: '#6B7280' },
  positive: { color: '#10B981', fontWeight: '500' },

  filterPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E7F8F2', borderRadius: 14, paddingHorizontal: 10, height: 28 },
  filterPillText: { marginRight: 6, fontSize: 12, fontWeight: '600', color: '#10B981' },

  chartWrap: { marginTop: 6 },
  xLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  xLabel: { fontSize: 14, color: '#181818ff', fontWeight: '600', marginBottom: 20 },

  ordersTitle: { fontSize: 23, lineHeight: 35, fontWeight: '500', color: P.text, marginTop: 20, marginBottom: 20 },
  orderRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  orderCustomer: { color: P.text, fontSize: 17, fontWeight: '400', lineHeight: 20 },
  orderId: { color: '#9CA3AF', fontSize: 15, lineHeight: 16, marginTop: 7 },
  orderDate: { color: P.text, fontSize: 17, marginLeft: 12 },

  /* Bottom sheet */
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    position: 'absolute',
    // left: 16,
    // right: 16,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingTop: 8,
    paddingHorizontal: 20,
    // shadow
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
    width: "100%",
  },
  grabber: { alignSelf: 'center', width: 42, height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', marginBottom: 10 },
  sheetTitle: { fontSize: 14, color: '#6B7280', marginBottom: 8, paddingHorizontal: 6 },

  optionRow: {
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionRowSelected: { backgroundColor: '#E6CAF7' },
  optionText: { fontSize: 15, color: '#111827' },
  optionTextSelected: { fontWeight: '400' },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: { borderColor: P.purple },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: P.purple },
});