import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatBar({ label, value, max = 150 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getBarColor = (val) => {
    if (val >= 90) return '#10B981'; // Green
    if (val >= 60) return '#3B82F6'; // Blue
    if (val >= 40) return '#F59E0B'; // Yellow/Amber
    return '#EF4444'; // Red
  };

  const barColor = getBarColor(value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 90,
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  value: {
    width: 36,
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'right',
    marginRight: 12,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
