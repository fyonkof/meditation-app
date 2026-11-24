import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, type AccessibilityRole } from 'react-native';
import { colors } from '../theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const ROUND_BUTTON_SIZE = 56;

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  /** For toggles: whether the option is on. Off buttons are dimmed. */
  on?: boolean;
  role?: AccessibilityRole;
};

/** Solid black circular button used on the player screen. */
export function RoundButton({ icon, label, onPress, on, role = 'button' }: Props) {
  const isToggle = on !== undefined;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityState={isToggle && role === 'switch' ? { checked: on } : undefined}
      hitSlop={6}
      style={({ pressed }) => [
        styles.button,
        isToggle && !on && styles.off,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={28} color={colors.onControl} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: ROUND_BUTTON_SIZE,
    height: ROUND_BUTTON_SIZE,
    borderRadius: ROUND_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.control,
    // Faint rim keeps the button visible over very dark footage.
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  off: { opacity: 0.55 },
  pressed: { transform: [{ scale: 0.94 }] },
});
