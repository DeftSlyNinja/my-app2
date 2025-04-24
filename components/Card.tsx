import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet, TouchableOpacity } from 'react-native';

type CardProps = {
    title: string,
    genre: string,
    completed: boolean;
}

export function Card(props: CardProps){

    return(
        <TouchableOpacity>
            <ThemedView style={styles.container}>
                <ThemedText style={styles.title} type="title">{props.title}</ThemedText>
                <ThemedText style={styles.genre} type="subtitle">{props.genre}</ThemedText>
                <ThemedText style={styles.status} type="subtitle"> 
                {'Status: '}
                    <ThemedText style={{ color: props.completed ? 'green' : 'red' }} type="subtitle"> 
                        {props.completed ? "Completed" : "Incomplete"}
                    </ThemedText>
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderWidth: 2,
        borderColor: 'darkblue',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    title: {
        color: 'blue',
        textAlign: 'center'
    },
    genre: {
        textAlign: 'center'
    },
    status: {
        textAlign: 'center'
    }
});