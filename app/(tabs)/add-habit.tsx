import { Label } from "@react-navigation/elements";
import { View, Text, StyleSheet } from "react-native";
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { SegmentedButtons, TextInput, Button, useTheme } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];
const {user} = useAuth();
const router = useRouter();
const theme = useTheme();

const [title, setTitle] = useState<String>("");
const [description, setDescription] = useState<String>("");
const [frequency, setFrequency] = useState<Frequency>("daily");
const [error, setError] = useState<String>("");


const handleSubmit = async () => {
    if(!user) return;

    try {
        await databases.createDocument(
            DATABASE_ID, 
            HABITS_COLLECTION_ID, 
            ID.unique(),
            {
                user_id : user.$id,
                title,
                description,
                frequency,
                streak_count: 0,
                last_completed: new Date().toISOString(),
                $createdAt: new Date().toISOString()   
            }
        );

        router.back() 
    } catch(err) {
        if(err instanceof Error) {
            setError(err.message);
            return;
        } 

        setError("There was an error creating the habit");
    }
}

export default function AddHabitScreen() {
    return (
        <View style={styles.container}>
            <TextInput 
               label="Title" 
               mode="outlined" 
               style={styles.input}
               onChangeText={setTitle}
            />
            <TextInput 
               label="Description" 
               mode="outlined" 
               style={styles.input}
               onChangeText={setDescription}
            />
            <View style={styles.frequencyContainer}>
                <SegmentedButtons 
                    value={frequency}
                    onValueChange={(value) => setFrequency(value as Frequency)}
                    buttons={FREQUENCIES.map((freq) => ({
                        value: freq,
                        label: freq.charAt(0).toUpperCase() + freq.slice(1),
                    }))}
                />
            </View>  
            <Button 
               mode="contained"
               disabled={!title || !description}
               onPress={handleSubmit}
            >
                Add Habit
            </Button>
            {error && <Text style={{ color: theme.colors.error }}> {error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding : 16,
        backgroundColor : "#f5f5f5",
        justifyContent : "center"
    },

    input : {
        marginBottom : 16
    },

    frequencyContainer : {
        marginBottom : 24
    }
})