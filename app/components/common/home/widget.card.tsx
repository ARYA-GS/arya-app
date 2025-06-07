import { StyleSheet, Text, View } from "react-native";

type WidgetCardProps = {
  title: string;
  children: React.ReactNode;
  style?: object;
};

export const WidgetCard = ({ title, children, style }: WidgetCardProps) => (
  <View style={[styles.widgetCard, style]}>
    <Text style={styles.widgetTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
    widgetCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  widgetTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#9e9e9e",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
})