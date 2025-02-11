import Image from "next/image";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-white">Welcome {username}</h1>
      <div className="flex items-center space-x-6">
        <button className="relative">
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          <div className="text-gray-400 hover:text-white transition-colors">
            <Image src="/bell-icon.png" alt="Notifications" width={24} height={24} />
          </div>
        </button>
        <div className="px-4 py-1 bg-gray-800 rounded-full text-sm">
          Points #
        </div>
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
      </div>
    </header>
  );
} 