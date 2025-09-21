import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth-context";

function RouteGuard({children} :{ children : React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuth) {
        router.replace("/auth");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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