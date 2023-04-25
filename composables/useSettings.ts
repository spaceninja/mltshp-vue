const date = new Date();

export const useNSFW = () =>
  useCookie('hideNSFW', {
    default: () => true,
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });

export const useLayout = () =>
  useCookie('layout', {
    default: () => 'classic',
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });

export const useTheme = () =>
  useCookie('theme', {
    default: () => 'system',
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });
