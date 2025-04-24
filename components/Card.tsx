import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from 'react-native';

type CardProps = {
    title: string,
    genre: string,
    completed: boolean;
}

export function Card(props: CardProps){

    return(
        <ThemedView style={styles.container}>
            <ThemedText type="title">{props.title}</ThemedText>
            <ThemedText type="subtitle">{props.genre}</ThemedText>
            <ThemedText type="subtitle">Status: {props.completed ? "Completed" : "Incomplete"}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 5,
    }
});