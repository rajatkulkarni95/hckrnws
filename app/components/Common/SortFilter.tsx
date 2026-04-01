import { ChevronDownIcon } from "~/icons";
import { TIME_RANGE_OPTIONS, BEST_RANGE_OPTIONS, type TTimeRange, type TBestRange } from "~/lib/api";

type Props = {
  value: TTimeRange | TBestRange;
  onChange: (range: TTimeRange | TBestRange) => void;
  disabled?: boolean;
  variant?: "default" | "best";
};

export default function SortFilter({ value, onChange, disabled, variant = "default" }: Props) {
  const options = variant === "best" ? BEST_RANGE_OPTIONS : TIME_RANGE_OPTIONS;

  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value as TTimeRange | TBestRange)}
          className="appearance-none bg-bg-secondary hover:bg-bg-tertiary border border-border-primary rounded text-xs text-text-primary font-sans pl-2 pr-6 py-1.5 outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-default disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-text-icon pointer-events-none" />
      </div>
    </div>
  );
}
