import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SSOCallback() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <p>Redirecting...</p>
    </div>
  );
}
