import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../components/context/auth.context";
import ButtonStandard from "../../components/common/button/button.standard";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";


const ProfileScreen = () => {
  const { user, logout} = useAuth();
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("Login")
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#013EB0"]}
          tintColor="#013EB0"
        />
      }
    >
      <View style={styles.profileHeader}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <Ionicons name="person-circle" size={72} color="#fff" />
        <Text style={styles.userName}>{user?.nome}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.info}>{user?.nome}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text style={styles.info}>{user?.email}</Text>
      </View>

      <View style={styles.activityBox}>
        <Text style={styles.label}>Recent Activity</Text>
        <Text style={styles.activityValue}>37345%</Text>
        <Text style={styles.syareLabel}>Syare</Text>
        <Text style={styles.syareValue}>3,50%</Text>
      </View>

      <View style={styles.settingsBox}>
        <Text style={styles.label}>Recent Activity</Text>

        <View style={styles.settingItem}>
          <Ionicons name="notifications" size={20} color="#fff" />
          <Text style={styles.settingText}>Notification</Text>
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="language" size={20} color="#fff" />
          <Text style={styles.settingText}>Language</Text>
        </View>
      </View>

      <View style={styles.logoutButton}>
        <ButtonStandard
          text="Sair da conta"
          color="#30d158"
          width={370}
          borderRadius={10}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    flexGrow: 1,
    paddingTop: 50,
  },
  appName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  userRole: {
    color: "#aaa",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
  info: {
    color: "#fff",
    fontSize: 16,
  },
  activityBox: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  activityValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  syareLabel: {
    color: "#aaa",
    marginTop: 10,
  },
  syareValue: {
    color: "#4cd964",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsBox: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  settingText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    alignItems: "center",
  },
});

export default ProfileScreen;
