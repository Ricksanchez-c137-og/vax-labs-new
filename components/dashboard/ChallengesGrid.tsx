import Link from "next/link";

export default function ChallengesGrid() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Upcoming Challenges</h2>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Link href="/challenges" key={i}>
            <div className="aspect-square bg-[#2A2A2A] rounded-2xl hover:bg-[#333333] transition-colors cursor-pointer flex items-center justify-center">
              <span className="text-gray-400">Challenge {i}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 