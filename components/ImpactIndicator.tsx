import { cn } from "@/lib/utils";

const ImpactIndicator = ({
  impact,
  isStatic = false,
  insideGrid = false,
}: {
  impact: number;
  isStatic?: boolean;
  insideGrid?: boolean;
}) => {
  // Calculate the percentage for color mixing
  const percentage = ((impact - 1) / 9) * 100;

  const mixedColor = `color-mix(in srgb, #B8860B ${100 - percentage}%, #9d4edd ${percentage}%)`;
  return (
    <span
      className={cn(
        "absolute right-[16px] top-0 translate-y-[-50%] rounded-full border-[3px] px-[10px] text-base leading-none text-bone-white",
        isStatic && "static",
        insideGrid &&
          "right-[-2px] top-[4px] border-none !bg-transparent px-[4px] text-xs",
        !insideGrid && "backdrop-blur",
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${mixedColor} 20%, transparent)`,
        borderColor: mixedColor,
        color: mixedColor,
      }}
    >
      <strong>{impact}</strong>
    </span>
  );
};

export default ImpactIndicator;
