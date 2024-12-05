export default function CoursePage({ params }: { params: { id: string } }) {
    return (
      <div className="min-h-screen bg-background text-foreground font-ubuntu flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Challenges {params.id}</h1>
          <p className="mt-4">Welcome to Challenges {params.id}. Explore and learn!</p>
        </div>
      </div>
    );
  }
  