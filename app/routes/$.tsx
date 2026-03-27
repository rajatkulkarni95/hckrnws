import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl md:text-2xl mt-8 font-semibold text-center">
        Not all those who wander are lost, but you are.
      </p>
      <button className="py-1.5 px-3 border mt-4 text-sm border-border-primary bg-bg-secondary ml-2 hover:bg-bg-tertiary rounded focus-visible:ring-1 focus-visible:ring-blue-500">
        <Link to="/">Go back to home</Link>
      </button>
    </div>
  );
}
