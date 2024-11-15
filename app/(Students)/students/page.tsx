import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Students() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6">For Students</h2>
        <p className="text-lg max-w-4xl mx-auto mb-6">
          VaxLabs offers challenges that help students develop essential cybersecurity skills through hands-on experience.
        </p>
        <SignUpButton mode="redirect">
            <Button className="bg-primary text-foreground px-6 py-3 rounded-full">
              Register Now
            </Button>
          </SignUpButton>

          {/* Login button that redirects to the sign-in page */}
          <SignInButton mode="redirect">
            <Button className="bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-primary hover:text-background transition-all">
              Login
            </Button>
          </SignInButton>
      </section>
    </div>
  );
}
