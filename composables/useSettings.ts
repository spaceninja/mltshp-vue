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

export const useThemeCookie = () => {
  const themeCookie = useCookie<string>('theme', {
    expires: new Date(date.setMonth(date.getMonth() + 1)),
  });
  return themeCookie;
};

export const useTheme = () => {
  const themeCookie = useThemeCookie();
  const themeState = useState<string>(
    'theme',
    () => themeCookie.value || 'system'
  );
  return themeState;
};
