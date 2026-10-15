export const LOCALES = {
  vi: {
    iso: "vi-VN",
    name: "Tiếng Việt",
  },
  en: {
    iso: "en-US",
    name: "English",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    iso: string;
  }
>;

export const LOCALE_DEFAULT: keyof typeof LOCALES = "vi";
