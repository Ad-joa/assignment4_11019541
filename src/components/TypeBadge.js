import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  default: '#68A090',
};

export default function TypeBadge({ type, style }) {
  const typeName = typeof type === 'string' ? type.toLowerCase() : 'normal';
  const backgroundColor = TYPE_COLORS[typeName] || TYPE_COLORS.default;

  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={styles.badgeText}>
        {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
