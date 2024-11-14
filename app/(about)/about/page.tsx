import Navbar from "@/app/components/Navbar";

export default function About() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6">About VaxLabs</h2>
        <p className="text-lg max-w-4xl mx-auto">
          VaxLabs is a cybersecurity training platform that offers hands-on experience in real-world scenarios...
        </p>
      </section>
    </div>
  );
}
