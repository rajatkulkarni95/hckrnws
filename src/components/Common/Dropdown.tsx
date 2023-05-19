import React from "react";
// @ts-ignore
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface IDropdown {
  triggerLabel?: React.ReactNode;
  items?: {
    label: string;
    id: string;
    icon?: React.ReactNode;
    kbd?: string;
  }[];
  selectedId?: string;
  handleOnClick: (id: string) => void;
}

const Dropdown = ({
  triggerLabel,
  items,
  selectedId,
  handleOnClick,
}: IDropdown) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="py-1 px-2 border max-w-[156px] focus-visible:ring-1 focus-visible:ring-blue-500 outline-none rounded border-primary bg-secondary hover:bg-tertiary duration-150 font-sans cursor-default text-sm">
          {triggerLabel}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="shadow-sm bg-primary border border-primary rounded-md p-0.5 w-32"
          sideOffset={4}
          align="end"
        >
          {items?.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              className={`px-2 hover:bg-secondary flex items-center cursor-default py-1.5 mb-0.5 outline-none rounded group ring-0 text-sm hover:text-primary ${
                selectedId === item.id
                  ? "text-primary bg-secondary"
                  : "text-secondary bg-transparent"
              }`}
              onClick={() => handleOnClick(item.id)}
            >
              {item.icon}
              {item.label}{" "}
              <span className="text-xs text-tertiary font-normal ml-auto">
                {item.kbd}
              </span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
