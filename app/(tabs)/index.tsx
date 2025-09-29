import { Text, View , StyleSheet} from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { useState } from "react";
import { Habit } from "@/types/database.type";

export default function Index() {
  const {signOut, user} = useAuth();

  const [habits, setHabits] = useState<Habit[]>();

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
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
