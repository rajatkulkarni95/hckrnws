import { useEffect, useState } from "react";
import { useTheme } from "~/lib/theme";

import {
  AskHNIcon,
  TopHNIcon,
  ShowHNIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
  SearchIcon,
} from "~/icons";
import Dropdown from "../Common/Dropdown";
import { useNavigate, useLocation, Link } from "react-router";
import { useKeyPress } from "~/hooks/useKeyPress";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useKeyPress("t", () => navigate("/top/1"));
  useKeyPress("s", () => navigate("/show/1"));
  useKeyPress("n", () => navigate("/new/1"));
  useKeyPress("a", () => navigate("/ask/1"));
  useKeyPress("x", () => navigate("/star"));
  useKeyPress("/", () => navigate("/search"));

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const dropdownItems = [
    {
      label: "Top",
      id: "top",
      icon: (
        <TopHNIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "T",
    },
    {
      label: "Show",
      id: "show",
      icon: (
        <ShowHNIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "S",
    },
    {
      label: "New",
      id: "new",
      icon: (
        <ClockIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "N",
    },
    {
      label: "Ask",
      id: "ask",
      icon: (
        <AskHNIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "A",
    },
    {
      label: "Search",
      id: "search",
      icon: (
        <SearchIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "/",
    },
    {
      label: "Starred",
      id: "star",
      icon: (
        <StarIcon className="h-4 w-4 mr-2 text-text-icon group-hover:text-text-primary" />
      ),
      kbd: "X",
    },
  ];

  const selectedItem = dropdownItems.find((item) =>
    location.pathname.includes(item.id)
  );

  const triggerLabel = () => (
    <div className="flex items-center">
      {selectedItem?.icon}
      <span className="text-sm font-medium text-text-primary">
        {selectedItem?.label || "Select"}
      </span>
    </div>
  );

  const handleOnClick = (id: string) => {
    if (id === "star" || id === "search") {
      navigate(`/${id}`);
    } else {
      navigate(`/${id}/1`);
    }
  };

  return (
    <div className="flex justify-between py-3 flex-none">
      <Link to="/">
        <h2 className="text-xl md:text-2xl font-mono text-text-primary">hckrnws</h2>
      </Link>
      <div className="flex items-center">
        <Dropdown
          items={dropdownItems}
          triggerLabel={triggerLabel()}
          selectedId={selectedItem?.id}
          handleOnClick={handleOnClick}
        />
        <button
          className="p-1.5 border border-border-primary bg-bg-secondary ml-2 hover:bg-bg-tertiary duration-150 cursor-default rounded focus-visible:ring-1 focus-visible:ring-blue-500"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4 text-text-icon" />
          ) : (
            <MoonIcon className="h-4 w-4 text-text-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
