import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Companies() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <SignedIn>
          <h2 className="text-5xl font-bold text-primary mb-6">For Companies</h2>
          <p className="text-lg max-w-4xl mx-auto mb-6">
            Welcome back! Discover tailored training challenges for your team.
          </p>
          <Button className="bg-primary text-foreground px-6 py-3 rounded-full">
            Explore Corporate Challenges
          </Button>
        </SignedIn>

        <SignedOut>
          <h2 className="text-5xl font-bold text-primary mb-6">Sign In to Access Corporate Features</h2>
          <p className="text-lg max-w-4xl mx-auto mb-6">
            VaxLabs provides tailored corporate training challenges. Sign in to get started.
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
