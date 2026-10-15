const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export const withBase = (targetPath: string) => {
  if (
    !basePath ||
    targetPath.startsWith("http://") ||
    targetPath.startsWith("https://") ||
    targetPath.startsWith("mailto:") ||
    targetPath.startsWith("tel:") ||
    targetPath.startsWith("#")
  ) {
    return targetPath;
  }
  const clean = targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
  if (clean === basePath || clean.startsWith(`${basePath}/`)) {
    return clean;
  }
  return `${basePath}${clean}`;
};

export const useRouter = () => {
  const push = (targetPath: string) => {
    if (typeof window !== "undefined") {
      const fullPath = withBase(targetPath);
      window.history.pushState(null, "", fullPath);
    }
  };

  const replace = (targetPath: string) => {
    if (typeof window !== "undefined") {
      const fullPath = withBase(targetPath);
      window.history.replaceState(null, "", fullPath);
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history?.back?.();
    }
  };

  return {
    push,
    replace,
    back,
  };
};
