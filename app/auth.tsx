import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev)
    }
    return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <View>
            <Text>
                {isSignUp? "Create Account" : "Welcome Back"}
            </Text>

            <TextInput 
               label="Email"
               autoCapitalize="none"
               keyboardType="email-address"
               placeholder="example@gmail.com"
               mode="outlined"
            />

            <TextInput 
               label="Password"
               autoCapitalize="none"
               keyboardType="email-address"
               mode="outlined"
            />

            {isSignUp && <TextInput 
               label="Confirm Password"
               autoCapitalize="none"
               keyboardType="email-address"
               mode="outlined"
            /> }

            <Button mode="contained">
                {isSignUp? "Sign Up" : "Sign In"}
            </Button>

            <Button mode="text" onPress={handleSwitchMode}>
                {isSignUp? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
        </View>
    </KeyboardAvoidingView>
)}