import { StyleSheet, TextInput, View } from "react-native";

interface InputAreaProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  borderRadius?: number;
  secureTextEntry?: boolean; 
  width?: number;
  color?: string;
}

const InputArea = ({
  placeholder = "",
  value,
  onChangeText,
  borderRadius = 40,
  secureTextEntry = false, 
  color = "#FFFFFF",
  width = 260,
}: InputAreaProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputArea, { borderRadius }]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry} 
          style={[styles.textInput, { backgroundColor: color, width }]}
          textAlign="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  inputArea: {
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: 3,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    color: "#333333",
    fontSize: 16,
    fontStyle: "italic",
    width: "100%",
  },
});

export default InputArea;