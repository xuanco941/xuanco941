import { ref } from "vue";
import type { Locale } from "./types";
import viCommon from "./messages/namespaces/common/vi.json";

export const locale = ref<Locale>("vi");
export const translations = ref<Record<string, string>>(viCommon as Record<string, string>);
