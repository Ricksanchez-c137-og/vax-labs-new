import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Companies() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6">For Companies</h2>
        <p className="text-lg max-w-4xl mx-auto mb-6">
          VaxLabs provides custom challenges and simulations tailored for corporate training to enhance cybersecurity skills among employees.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-primary text-foreground px-6 py-3 rounded-full">
            Register Now
          </Button>
          <Button className="bg-secondary text-foreground px-6 py-3 rounded-full hover:bg-primary hover:text-background transition-all">
            Login
          </Button>
        </div>
      </section>
    </div>
  );
}
