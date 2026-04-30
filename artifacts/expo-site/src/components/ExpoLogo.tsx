export function ExpoLogo({ variant = "default" }: { variant?: "default" | "white" | "dark" }) {
  return (
    <div className="flex items-center">
      <img
        src={`${import.meta.env.BASE_URL}expo-logo.png`}
        alt="معرض الابتكارات الهندسية والتقنية"
        className="h-14 w-auto object-contain"
        style={
          variant === "white"
            ? {}
            : { filter: "invert(1)" }
        }
      />
    </div>
  );
}
