export const setCookie = (name: string, value: any) => {
  const cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  document.cookie = cookieText;
};

export const getCookie = (name: string) => {
  const cookieName = `${encodeURIComponent(name)}`;
  const cookie = document.cookie;

  const startIndex = cookie.indexOf(cookieName);
  let value = null;
  if (startIndex > -1) {
    let endIndex = cookie.indexOf(";", startIndex);
    if (endIndex == -1) {
      endIndex = cookie.length;
    }
    value = decodeURIComponent(
      cookie.substring(startIndex + name.length + 1, endIndex),
    );
  }
  return value;
};

export const removeCookie = (name: string) => {
  setCookie(name, "");
};
