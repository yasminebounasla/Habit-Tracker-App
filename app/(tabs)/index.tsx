import { View, StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { useState, useEffect } from "react";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id ?? "")]
      );
     
      setHabits(response.documents as unknown as Habit[]);
    } catch(err) {
      console.error(err);
    }
  }

  // This will refetch habits every time you navigate back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [user?.$id])
  );

  return (
    <View style={styles.view}>
      <View>
        <Text variant="headlineSmall">
          Today's Habits
        </Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign Out
        </Button>
      </View>
      {habits.length === 0 ? (
        <View>
          <Text>No Habits Yet. Add Your First Habit!</Text>
        </View>
      ) : (
        habits.map((habit, key) => (
          <View key={key}>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <View>
              <MaterialCommunityIcons
                name="fire"
                size={18}
                color="#ff9800"
              />
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})