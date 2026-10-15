export const social = [
  { url: "mailto:xuanco941@gmail.com", name: "mail" },
  { url: "https://github.com/xuanco941", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
