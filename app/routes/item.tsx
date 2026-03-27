import { Navigate, useSearchParams } from "react-router";

export default function Item() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id) {
    return <Navigate to={`/stories/${id}`} replace />;
  }

  return <Navigate to="/" replace />;
}
