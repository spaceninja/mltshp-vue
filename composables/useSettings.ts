const date = new Date();

export const useNSFW = () =>
  useCookie('hideNSFW', {
    default: () => true,
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });

export const useLayoutCookie = () =>
  useCookie('layout', {
    default: () => 'classic',
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });

export const useLayout = () => {
  const layoutCookie = useLayoutCookie();
  const layoutState = useState<string>(
    'layout',
    () => layoutCookie.value || 'system'
  );
  return layoutState;
};

export const useThemeCookie = () =>
  useCookie<string>('theme', {
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });

export const useTheme = () => {
  const themeCookie = useThemeCookie();
  const themeState = useState<string>(
    'theme',
    () => themeCookie.value || 'system'
  );
  return themeState;
};
