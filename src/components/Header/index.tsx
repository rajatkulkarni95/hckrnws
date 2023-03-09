import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { AskHNIcon, TopHNIcon, ShowHNIcon, ClockIcon } from "~/icons";
import Dropdown from "../Common/Dropdown";
import { useRouter } from "next/router";
import Link from "next/link";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
    },
    {
      label: "Show",
      id: "show",
      icon: (
        <ShowHNIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
    },
    {
      label: "New",
      id: "new",
      icon: (
        <ClockIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
    },
    {
      label: "Ask",
      id: "ask",
      icon: (
        <AskHNIcon className="h-4 w-4 mr-2 text-icon group-hover:text-primary" />
      ),
    },
  ];

  const selectedItem = dropdownItems.find((item) =>
    router.pathname.includes(item.id)
  );

  const triggerLabel = () => (
    <div className="flex items-center">
      {selectedItem?.icon}
      <span className="text-sm font-bold text-primary">
        {selectedItem?.label || "None"}
      </span>
    </div>
  );

  return (
    <div className="flex justify-between py-3">
      <Link href="/">
        <h1 className="text-xl md:text-2xl font-mono font-bold text-primary">
          hckrnws
        </h1>
      </Link>
      <Dropdown
        items={dropdownItems}
        triggerLabel={triggerLabel()}
        selectedId={selectedItem?.id}
        handleOnClick={(id) => router.push(`/${id}/1`)}
      />
    </div>
  );
};

export default Header;
