"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col gap-5 justify-center items-center">
      <h2 className="text-2xl xl:text-4xl">Something went wrong!</h2>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
