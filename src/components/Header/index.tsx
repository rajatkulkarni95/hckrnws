import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  AskHNIcon,
  TopHNIcon,
  ShowHNIcon,
  ClockIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
} from "~/icons";
import Dropdown from "../Common/Dropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKeyPress } from "~/hooks/useKeyPress";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useKeyPress("t", () => router.push("/top/1"));
  useKeyPress("s", () => router.push("/show/1"));
  useKeyPress("n", () => router.push("/new/1"));
  useKeyPress("a", () => router.push("/ask/1"));
  useKeyPress("x", () => router.push("/star"));

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const dropdownItems = [
    {
      label: "Top",
      id: "top",
      icon: (
        <TopHNIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
      kbd: "T",
    },
    {
      label: "Show",
      id: "show",
      icon: (
        <ShowHNIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
      kbd: "S",
    },
    {
      label: "New",
      id: "new",
      icon: (
        <ClockIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
      kbd: "N",
    },
    {
      label: "Ask",
      id: "ask",
      icon: (
        <AskHNIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
      kbd: "A",
    },
    {
      label: "Starred",
      id: "star",
      icon: (
        <StarIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
      kbd: "X",
    },
  ];

  const selectedItem = dropdownItems.find((item) =>
    router.pathname.includes(item.id)
  );

  const triggerLabel = () => (
    <div className="flex items-center">
      {selectedItem?.icon}
      <span className="text-sm font-medium text-primary">
        {selectedItem?.label || "Select"}
      </span>
    </div>
  );

  const handleOnClick = (id: string) => {
    if (id === "star") {
      router.push(`/${id}`);
    } else {
      router.push(`/${id}/1`);
    }
  };

  return (
    <div className="flex justify-between py-3 flex-none">
      <Link href="/">
        <h2 className="text-xl md:text-2xl font-mono text-primary">hckrnws</h2>
      </Link>
      <div className="flex items-center">
        <Dropdown
          items={dropdownItems}
          triggerLabel={triggerLabel()}
          selectedId={selectedItem?.id}
          handleOnClick={handleOnClick}
        />
        <button
          className="p-1.5 border border-primary bg-secondary ml-2 hover:bg-tertiary duration-150 cursor-default rounded focus-visible:ring-1 focus-visible:ring-blue-500"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-4 w-4 text-icon" />
          ) : (
            <MoonIcon className="h-4 w-4 text-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
