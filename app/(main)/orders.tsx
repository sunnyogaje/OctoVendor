// app/(main)/orders.tsx
import React, { useMemo, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
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
  chipIdleBorder: '#C7B6C7',
  chipIdleBg: '#FFFFFF',
};

type StatusKey =
  | 'new'
  | 'processing'
  | 'awaiting'
  | 'in_transit'
  | 'canceled'
  | 'delivered';

const STATUS_LABEL: Record<StatusKey, string> = {
  new: 'New order',
  processing: 'Processing',
  awaiting: 'Awaiting Pickup',
  in_transit: 'In transit',
  canceled: 'Canceled',
  delivered: 'Delivered',
};

const STATUS_STYLE: Record<
  StatusKey,
  { bg: string; fg: string }
> = {
  new: { bg: 'rgba(138,43,226,0.12)', fg: '#8A2BE2' },
  processing: { bg: 'rgba(99,102,241,0.12)', fg: '#6366F1' },
  awaiting: { bg: 'rgba(156,163,175,0.18)', fg: '#6B7280' },
  in_transit: { bg: 'rgba(245,158,11,0.18)', fg: '#F59E0B' },
  canceled: { bg: 'rgba(239,68,68,0.18)', fg: '#EF4444' },
  delivered: { bg: 'rgba(16,185,129,0.18)', fg: '#10B981' },
};

type Order = {
  id: string;
  customer: string;
  code: string;
  when: string;
  status: StatusKey;
};

const SAMPLE: Order[] = [
  { id: '1', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'new' },
  { id: '2', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'processing' },
  { id: '3', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'awaiting' },
  { id: '4', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'in_transit' },
  { id: '5', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'canceled' },
  { id: '6', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'delivered' },
  { id: '7', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'processing' },
  { id: '8', customer: 'Hannah Famodimu', code: '#010102', when: 'Today | 9:00 am', status: 'awaiting' },
];

const FILTERS = ['all', 'new', 'processing', 'awaiting'] as const;
type FilterKey = typeof FILTERS[number];

export default function OrdersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabH = useBottomTabBarHeight?.() ?? 0;

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });
  const CHIP_SPACING = 10;

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE.filter((o) => {
      const matchQ =
        !q ||
        o.customer.toLowerCase().includes(q) ||
        o.code.toLowerCase().includes(q);
      const matchF =
        filter === 'all'
          ? true
          : filter === 'awaiting'
          ? o.status === 'awaiting'
          : o.status === (filter as StatusKey);
      return matchQ && matchF;
    });
  }, [query, filter]);

  const renderOrder = ({ item }: { item: Order }) => {
    const pill = STATUS_STYLE[item.status];
    return (
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.customer} numberOfLines={1}>
            {item.customer}
          </Text>
          <Text style={styles.subLine}>Order ID {item.code}</Text>
          <Text style={[styles.subLine, { marginTop: 4 }]}>{item.when}</Text>
        </View>

        <View
          style={[
            styles.pill,
            { backgroundColor: pill.bg, borderColor: pill.bg.replace('0.18', '0.24') },
          ]}
        >
          <Text style={[styles.pillText, { color: pill.fg }]}>
            {STATUS_LABEL[item.status]}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderOrder}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: tabH + insets.bottom + 12,
        }}
        ListHeaderComponent={
          <View>
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
              <Text style={styles.headerTitle}>Orders</Text>
            </View>

            {/* Search */}
            <View style={styles.searchBox}>
              <Ionicons name="search" size={30} color={P.purple} />
              <TextInput
                placeholder="Search for order"
                placeholderTextColor="#9CA3AF"
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                returnKeyType="search"
              />
            </View>

            {/* Chips — perfectly aligned with search (no hidden padding) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterRow}
            >
              {FILTERS.map((key, i) => {
                const active = filter === key;
                const label = key === 'all' ? 'All' : STATUS_LABEL[key as Exclude<FilterKey,'all'>];
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setFilter(key)}
                    activeOpacity={0.8}
                    style={[
                      styles.chip,
                      active ? styles.chipActive : styles.chipIdle,
                      { marginRight: i === FILTERS.length - 1 ? 0 : CHIP_SPACING },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        active ? styles.chipTextActive : styles.chipTextIdle,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { paddingRight: 8, paddingVertical: 6, marginRight: 4 },
  headerTitle: { fontSize: 22, fontWeight: '400', color: P.text },

  searchBox: {
    height: 50,
    borderWidth: 1,
    borderColor: P.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: P.text,
    paddingVertical: Platform.select({ ios: 10, android: 6 }),
  },

  filterRow: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  chip: {
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipIdle: { backgroundColor: P.chipIdleBg, borderColor: P.chipIdleBorder },
  chipActive: { backgroundColor: P.purple, borderColor: P.purple },
  chipText: { fontSize: 16, fontWeight: '400', lineHeight: 16 },
  chipTextIdle: { color: P.text },
  chipTextActive: { color: '#fff' },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 18,
  },
  customer: { fontSize: 16, color: P.text, marginBottom: 6 },
  subLine: { fontSize: 13, color: P.subtext },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignSelf: 'center',
  },
  pillText: { fontSize: 12, fontWeight: '600' },

  separator: { height: 1, backgroundColor: '#F1F5F9' },
});
