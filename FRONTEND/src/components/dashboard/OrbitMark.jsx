

export default function OrbitMark({ size = 36, tone = "brand" }) {
  const colors =
    tone === "mono"
      ? { a: "rgba(255,255,255,0.35)", b: "rgba(255,255,255,0.18)" }
      : { a: "#0F9D6B", b: "#6E62E5" };

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle
        cx="18"
        cy="18"
        r="15.5"
        stroke={colors.a}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="62 35"
        transform="rotate(-40 18 18)"
      />
      <circle
        cx="18"
        cy="18"
        r="10"
        stroke={colors.b}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="38 25"
        transform="rotate(120 18 18)"
      />
      <circle cx="18" cy="18" r="2.5" fill={colors.a} />
    </svg>
  );
}