import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DangerLocationItemProps = {
  name: string;
  dangerType: string;
  aryaStatus: string;
  criticality?: string;
  iconName?: string;
};

export const DangerLocationItem = ({
  name,
  dangerType,
  aryaStatus,
  criticality,
  iconName,
}: DangerLocationItemProps) => (
  <TouchableOpacity
    style={[styles.dangerItem, { borderLeftColor: criticality || "#ccc" }]}
  >
    <View
      style={[
        styles.itemIconPlaceholder,
        { backgroundColor: criticality || "#e0e0e0" },
      ]}
    >
      <Text style={styles.itemIconText}>
        {iconName ? iconName[0].toUpperCase() : "!"}
      </Text>
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDetails}>Perigo: {dangerType}</Text>
      <Text style={styles.itemDetails}>Status ARYA: {aryaStatus}</Text>
    </View>

    <View style={styles.chevronPlaceholder}>
      <Text>&gt;</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    dangerItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6,
  },
  itemIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
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
  chevronPlaceholder: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
})