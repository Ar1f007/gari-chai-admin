import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center h-[80vh]">
      <h2 className="text-9xl font-semibold text-muted-foreground">404</h2>

      <p className="xl:text-xl max-w-2xl text-center">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <Link
        href="/"
        className="bg-primary px-6 py-2 rounded-md text-white text-xl uppercase
        font-semibold leading-2 tracking-wide hover:bg-primary/75
        transition-all duration-200 ease-in-out"
      >
        Go to Home
      </Link>
    </div>
  );
}
