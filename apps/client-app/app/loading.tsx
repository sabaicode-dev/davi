import { Ellipsis } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <Ellipsis  className="h-20 w-20 animate-ping text-primary mx-auto text-blue-700" />
        {/* <h2 className="mt-4 text-xl font-semibold text-foreground text-blue-700">
          Loading...
        </h2> */}
      </div>
    </div>
  );
}
