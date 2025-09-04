import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ReactNode } from 'react';

interface SpiritualCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export function SpiritualCard({ children, onPress, style }: SpiritualCardProps) {
  const Card = onPress ? TouchableOpacity : View;
  
  return (
    <Card 
      style={[styles.card, style]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Card>
  );
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ progress, size = 60, strokeWidth = 6 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={styles.progressRing}>
        <View 
          style={[
            styles.progressBackground,
            { 
              width: size, 
              height: size, 
              borderRadius: size / 2,
              borderWidth: strokeWidth 
            }
          ]} 
        />
        <View 
          style={[
            styles.progressForeground,
            { 
              width: size, 
              height: size, 
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              transform: [{ rotate: '-90deg' }]
            }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.warmWhite,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: Colors.warmBrown,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.lightGold,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
  },
  progressBackground: {
    borderColor: Colors.lightGold,
    position: 'absolute',
  },
  progressForeground: {
    borderColor: Colors.softGold,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  progressText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.primary,
  },
});