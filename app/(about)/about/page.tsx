{/*disable eslint*/ }

import Navbar from "@/components/home/Navbar";

export default function About() {
  return (
    <div className="bg-background min-h-screen text-foreground font-ubuntu">
      <Navbar />
      <section className="p-12 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6">About VaxLabs</h2>
        <p className="text-lg max-w-4xl mx-auto mb-4">
          VaxLabs is a pioneering cybersecurity training platform designed to bridge the gap between theoretical learning and practical expertise. Our mission is to empower the next generation of cybersecurity professionals in the UAE by providing immersive, hands-on training that mirrors real-world challenges.
        </p>
        <p className="text-lg max-w-4xl mx-auto mb-4">
          Our platform is equipped with state-of-the-art features such as red teaming simulations, pentesting challenges, and custom learning portals. We cater to individuals, university students, and enterprise employees by delivering tailored courses and learning paths that emphasize practical application.
        </p>
        <p className="text-lg max-w-4xl mx-auto mb-4">
          VaxLabs sets itself apart with its unique focus on UAE-specific cybersecurity issues and partnerships with local educational institutions. We also feature a nationwide leaderboard to foster a competitive spirit, portfolio management tools for users to showcase their achievements, and a centralized hub for cybersecurity events.
        </p>
        <p className="text-lg max-w-4xl mx-auto mb-4">
          By addressing the shortage of skilled cybersecurity professionals, VaxLabs aims to contribute to a more secure digital landscape in critical sectors such as finance, energy, and government. Our platform not only helps users build essential skills but also connects them with opportunities for professional growth.
        </p>
        <p className="text-lg max-w-4xl mx-auto">
          Join VaxLabs today and take your cybersecurity expertise to the next level with practical, gamified learning that prepares you for real-world scenarios.
        </p>
      </section>
    </div>
  );
}
