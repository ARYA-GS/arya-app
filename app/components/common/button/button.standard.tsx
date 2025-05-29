import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonStandardProps {
  text: string;
  textColor?: string;
  color?: string;
  width?: number;
  borderRadius?: number;
  marginVertical?: number;
  onPress?: () => void;
}

const ButtonStandard = ({
  text = "buttonText",
  color = "#013E",
  textColor = "#fff",
  width = 150,
  borderRadius = 50,
  marginVertical = 20,
  onPress,
}: ButtonStandardProps) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, width, marginVertical, borderRadius }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ButtonStandard;
