import { StyleSheet, Text, View } from "react-native";

type CrisisAlertItemProps = {
  title: string;
  area: string;
  time: string;
  level: string;
};

export const CrisisAlertItem = ({
  title,
  area,
  time,
  level,
}: CrisisAlertItemProps) => {
  let alertColors = { bg: "#e2e3e5", text: "#383d41", iconBg: "#d6d8db" };
  if (level === "red")
    alertColors = { bg: "#f8d7da", text: "#721c24", iconBg: "#f5c6cb" };
  if (level === "orange" || level === "yellow")
    alertColors = { bg: "#fff3cd", text: "#856404", iconBg: "#ffeeba" };
  if (level === "green")
    alertColors = { bg: "#d4edda", text: "#155724", iconBg: "#c3e6cb" };

  return (
    <View
      style={[
        styles.alertItem,
        { backgroundColor: alertColors.bg, borderColor: alertColors.iconBg },
      ]}
    >
      <View
        style={[
          styles.itemIconPlaceholder,
          {
            backgroundColor: alertColors.iconBg,
            width: 28,
            height: 28,
            borderRadius: 14,
          },
        ]}
      >
        <Text style={[styles.itemIconText, { color: alertColors.text }]}>
          {level[0].toUpperCase()}
        </Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={[styles.alertTitle, { color: alertColors.text }]}>
          {title}
        </Text>
        <Text style={[styles.itemDetails, { color: alertColors.text }]}>
          Área: {area} ({time})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
     alertItem: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  itemContent: {
    flex: 1,
  },
  itemDetails: {
    fontSize: 13.5,
    color: "#495057",
    marginTop: 3,
    lineHeight: 18,
  },
  itemIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
  },
  itemIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
})