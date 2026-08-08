import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/ui/theme';

export default function CaseSelectScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Shipaton Detective</Text>
      <Text style={styles.blurb}>Case select lands here in Task 14.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space.lg,
  },
  title: { ...theme.type.title, color: theme.color.text },
  blurb: { ...theme.type.body, color: theme.color.textDim, marginTop: theme.space.sm },
});
