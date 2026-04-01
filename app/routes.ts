import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("top/:number", "routes/top.$number.tsx"),
  route("new/:number", "routes/new.$number.tsx"),
  route("ask/:number", "routes/ask.$number.tsx"),
  route("show/:number", "routes/show.$number.tsx"),
  route("best/:number", "routes/best.$number.tsx"),
  route("stories/:id", "routes/stories.$id.tsx"),
  route("item", "routes/item.tsx"),
  route("search", "routes/search.tsx"),
  route("star", "routes/star.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
