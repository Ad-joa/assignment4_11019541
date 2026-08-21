import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

export default function PokemonCard({
  name,
  image,
  number,
  isFavorite,
  onToggleFavorite,
  onPress,
}) {
  const formattedNumber =
    typeof number === 'number'
      ? `#${String(number).padStart(3, '0')}`
      : String(number).startsWith('#')
      ? number
      : `#${number}`;

  const formattedName =
    name && typeof name === 'string'
      ? name.charAt(0).toUpperCase() + name.slice(1)
      : 'Unknown';

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.topRow}>
        <Text style={styles.numberText}>{formattedNumber}</Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          style={styles.favoriteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={isFavorite ? '#EF4444' : '#94A3B8'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {formattedName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 5,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  numberText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  favoriteButton: {
    padding: 4,
  },
  imageWrapper: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
});
