export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="ambient-orb absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, hsl(265 90% 60% / 0.55), transparent 70%)",
          animation: "float-slow 22s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-orb absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, hsl(188 92% 55% / 0.55), transparent 70%)",
          animation: "float-slower 28s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-orb absolute bottom-[-200px] left-1/3 h-[480px] w-[480px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, hsl(165 80% 55% / 0.5), transparent 70%)",
          animation: "float-slow 32s ease-in-out infinite",
        }}
      />
    </div>
  );
}