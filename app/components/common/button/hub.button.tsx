import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
type HubButtonProps = {
    title: string;
    bairro: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
};

const HubButton = ({ title, bairro, onPress, style, textStyle }: HubButtonProps)  => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
            <View>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            <Text style={[styles.textBairro, textStyle]}>Região: {bairro}</Text>

            </View>
            <Ionicons name="chevron-forward" size={20} color="#000" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textBairro: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'semibold',
    },
});

export default HubButton;
