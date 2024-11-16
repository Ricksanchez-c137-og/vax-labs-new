import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Students() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <SignedIn>
          <h2 className="text-5xl font-bold text-primary mb-6">For Students</h2>
          <p className="text-lg max-w-4xl mx-auto mb-6">
            Welcome back! Explore challenges that help you develop essential cybersecurity skills through hands-on experience.
          </p>
          <Button className="bg-primary text-foreground px-6 py-3 rounded-full">
            Access Challenges
          </Button>
        </SignedIn>

        <SignedOut>
          <h2 className="text-5xl font-bold text-primary mb-6">Sign In to Access Student Features</h2>
          <p className="text-lg max-w-4xl mx-auto mb-6">
            VaxLabs offers challenges that help students develop essential cybersecurity skills through hands-on experience. Sign in to get started.
          </p>
          <SignInButton>
            <Button className="bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-primary hover:text-background transition-all">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </section>
    </div>
  );
}
