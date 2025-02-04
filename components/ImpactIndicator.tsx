const ImpactIndicator: React.FC<{ impact: number }> = ({ impact }) => {
  // Calculate the percentage for color mixing
  const percentage = ((impact - 1) / 9) * 100;

  const mixedColor = `color-mix(in srgb, #B8860B ${100 - percentage}%, #9d4edd ${percentage}%)`;
  return (
    <span
      className="absolute right-[-8px] top-0 translate-y-[-50%] rounded-full border-[3px] px-[10px] text-base leading-none text-bone-white backdrop-blur"
      style={{
        backgroundColor: `color-mix(in srgb, ${mixedColor} 30%, transparent)`,
        borderColor: mixedColor,
        color: mixedColor,
      }}
    >
      <strong>{impact}</strong>
    </span>
  );
};

export default ImpactIndicator;
