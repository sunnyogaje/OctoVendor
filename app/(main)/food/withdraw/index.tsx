// app/(main)/withdraw.tsx
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const P = {
  purple: '#4A154B',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E0F5',
  orange: '#F7B13C',
};

type Method = 'bank' | 'wallet';

export default function WithdrawEarnings() {
  const [method, setMethod] = useState<Method>('bank');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({ ios: 8, android: 0 })}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 32, // ✅ ensures you can scroll past the CTA
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
          bounces
          alwaysBounceVertical
          contentInsetAdjustmentBehavior="automatic"
          scrollIndicatorInsets={{ bottom: insets.bottom }}
        >
          <View style={styles.page}>
            {/* Header */}
            <View style={[styles.header, { marginTop: Platform.select({ ios: 12, android: 32, web: 24 }) }]}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backBtn}
                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color={P.text} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Withdraw earnings</Text>
            </View>

            {/* Balance card */}
            <View style={styles.balanceCard}>
              <Image
                source={require('@/assets/icons/balance-mark.png')}
                style={styles.balanceImg}
                resizeMode="contain"
                fadeDuration={0}
              />
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceValue}>$1,250.00</Text>
            </View>

            {/* Withdraw to */}
            <Text style={styles.sectionTitle}>Withdraw to</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.rowBox, method === 'bank' && styles.rowBoxActive]}
              onPress={() => setMethod('bank')}
            >
              <Text style={styles.rowLabel}>Bank Account</Text>
              <View style={[styles.radioOuter, method === 'bank' && styles.radioOuterActive]}>
                {method === 'bank' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.rowBox, method === 'wallet' && styles.rowBoxActive]}
              onPress={() => setMethod('wallet')}
            >
              <Text style={styles.rowLabel}>Wallet</Text>
              <View style={[styles.radioOuter, method === 'wallet' && styles.radioOuterActive]}>
                {method === 'wallet' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            {/* Amount */}
            <Text style={styles.sectionTitle}>Amount to Withdraw</Text>
            <TextInput
              placeholder="$0.00"
              placeholderTextColor="#9CA3AF"
              style={styles.amountInput}
              keyboardType="numeric"
              returnKeyType="done"
            />

            {/* Account details */}
            <Text style={styles.sectionTitle}>Account Details</Text>
            <View style={styles.detailsCard}>
              <Text style={styles.detailsName}>Hannah Famodimu</Text>
              <Text style={styles.detailsNumber}>1006583457</Text>
              <Text style={styles.detailsBank}>Access Bank</Text>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.cta} activeOpacity={0.9}>
              <Text style={styles.ctaText}>Confirm Withdrawal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  page: { width: '100%', alignSelf: 'center' },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { marginRight: 12, padding: 6 },
  headerTitle: { fontSize: 20, fontWeight: '400', color: P.text },

  balanceCard: {
    backgroundColor: P.orange,
    borderRadius: 12,
    padding: 16,
    marginTop: 6,
    marginBottom: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  balanceImg: {
    position: 'absolute',
    right: -12,
    top: -10,
    width: 100,
    height: 100,
    opacity: 0.95,
  },
  balanceLabel: { color: '#1F2937', fontSize: 18, fontWeight: '500' },
  balanceValue: { color: '#111827', fontSize: 22, fontWeight: '500', marginTop: 15 },

  sectionTitle: { fontSize: 17, fontWeight: '500', color: P.text, marginTop: 14, marginBottom: 15 },
  rowBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  rowBoxActive: { borderColor: '#DDD5E8' },
  rowLabel: { color: P.text, fontSize: 15 },

  radioOuter: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#C7C7CC',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: P.purple },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: P.purple },

  amountInput: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: Platform.select({ ios: 16, android: 12 }),
    fontSize: 16, color: P.text, backgroundColor: '#F3EDF5', marginBottom: 16,
  },

  detailsCard: {
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 15, backgroundColor: '#fff', marginBottom: 24,
  },
  detailsName: { color: '#6B7280', fontSize: 17, marginBottom: 8 },
  detailsNumber: { color: '#60646E', fontSize: 26, fontWeight: '600', marginBottom: 6, paddingVertical: 10 },
  detailsBank: { color: '#6B7280', fontSize: 17 },

  cta: {
    backgroundColor: P.purple, paddingVertical: 16, borderRadius: 10, alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } }
      : { elevation: 2 }),
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});