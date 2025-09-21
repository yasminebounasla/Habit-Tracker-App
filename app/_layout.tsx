import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function RouteGuard({children} :{ children : React.ReactNode }) {
  const router = useRouter();
  const {user, isLoadingUser} = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isAuthGroup = segments[0] === "auth";

      if (!user && !isAuthGroup && !isLoadingUser) {
        router.replace("/auth");
      } else if(user && isAuthGroup && !isLoadingUser) {
        router.replace("/");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="auth" options={{title : "Auth"}}/>
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}