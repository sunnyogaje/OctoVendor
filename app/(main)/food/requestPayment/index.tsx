import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E0F5',
};

export default function RequestForPayment() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const HEADER_TOP = Platform.select({ ios: 12, android: 32, web: 24 });

  // form state
  const [buyerId, setBuyerId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'loyalty'>('loyalty');

  // very simple “points equivalent” calc (feel free to change the rule)
  const points = useMemo(() => {
    const n = parseFloat(amount.replace(/[^\d.]/g, ''));
    if (isNaN(n)) return 0;
    return Math.max(0, Math.floor(n)); // 1 point per ₦ (example)
  }, [amount]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
            <Text style={[styles.headerTitle, { fontSize: isTablet ? 24 : 20 }]}>
              Request for Payment
            </Text>
          </View>

          {/* Inputs */}
          <TextInput
            value={buyerId}
            onChangeText={setBuyerId}
            placeholder="Enter  Buyer ID"
            placeholderTextColor="#9CA3AF"
            style={styles.inputSoft}
            returnKeyType="next"
          />

          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter  Amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            style={styles.inputSoft}
          />

          {/* Point equivalent (read-only look) */}
          <View style={styles.equivRow}>
            <Text style={styles.equivLabel}>Point equivalent</Text>
            <Text style={styles.equivValue}>{String(points).padStart(2, '0')}</Text>
          </View>

          {/* Payment Method */}
          <Text style={styles.sectionLabel}>Payment Method</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMethod('loyalty')}
            style={styles.methodRow}
          >
            <Text style={styles.methodText}>Loyalty Points</Text>
            <View style={[styles.radioOuter, method === 'loyalty' && styles.radioOuterActive]}>
              {method === 'loyalty' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity style={styles.cta} activeOpacity={0.9}>
            <Text style={styles.ctaText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
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
  backBtn: {
    marginRight: 12,
    padding: 6,
  },
  headerTitle: {
    fontWeight: '400',
    color: P.text,
  },

  /* Soft filled inputs like the mock */
  inputSoft: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: '#EEE8F4', // soft lavender fill
    color: P.text,
    fontSize: 15,
  },

  /* Point equivalent row (outlined) */
  equivRow: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  equivLabel: {
    color: P.text,
    fontSize: 15,
  },
  equivValue: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '600',
  },

  sectionLabel: {
    color: P.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 4,
  },

  methodRow: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 28,
  },
  methodText: { color: '#6B7280', fontSize: 15 },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#0B1220' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0B1220',
  },

  /* CTA */
  cta: {
    backgroundColor: P.purple,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
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
    fontSize: 16,
    fontWeight: '600',
  },
});