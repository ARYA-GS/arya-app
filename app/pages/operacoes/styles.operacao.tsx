import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingTop: 70,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subGreeting: {
    fontSize: 15,
  },
  droneSection: {
    marginBottom: 15,
    position: "relative",
  },
  droneImage: {
    width: "100%",
    height: 220,
  },
  droneStatusOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  droneModel: {
    fontSize: 17,
    fontWeight: "bold",
  },
  droneStatus: {
    fontSize: 14,
  },
  widgetsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 5,
  },
  widgetCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  widgetFullWidth: {
    width: "100%",
  },
  widgetHalfWidth: {
    width: "48.5%",
  },
  widgetIconInternal: {
    marginRight: 8,
  },
  widgetText: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  widgetTextBold: {
    fontSize: 14.5,
    marginBottom: 6,
    fontWeight: "600",
  },
  widgetTextSmall: {
    fontSize: 13,
    marginBottom: 4,
  },
  widgetSubTitle: {
    fontSize: 13.5,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 5,
  },
  weatherLocation: {
    fontSize: 15,
    fontWeight: "600",
  },
  weatherTemp: {
    fontSize: 14,
    marginBottom: 5,
  },
  weatherDetails: {
    fontSize: 13.5,
    marginBottom: 5,
  },
  weatherAlert: {
    fontSize: 13.5,
    fontWeight: "500",
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  itemIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemIconTextWhite: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  quickAccessSection: {
    paddingHorizontal: 12,
    marginTop: 15,
  },
  quickAccessButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  quickAccessButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
  },
  quickAccessButtonText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});