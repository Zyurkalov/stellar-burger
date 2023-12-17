function getCookie(name) {
  // было предупреждение об "лишних символах", ниже скорректированный код
  // const matches = document.cookie.match(new RegExp(
  //     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  //   ));
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, option = {}) {
  const defaultProps = {
    path: "/",
    ...option,
  };
  // далее я модифицировал setTime, чтобы можно было в объекте expires указывать значение жизненного цикла в минутах
  let { expires } = defaultProps;

  if (typeof expires === "number") {
    const d = new Date();
    d.setTime(d.getTime() + expires * (60 * 1000));
    expires = defaultProps.expires = d;
  }
  if (expires && expires.toString) {
    defaultProps.expires = expires.toString();
  }

  const propStrings = Object.entries(defaultProps).map(([key, value]) => {
    if (value === true) {
      return key;
    }
    return `${key}=${value}`;
  });

  const propString = propStrings.join("; ");
  const encodedValue = encodeURIComponent(value);
  const cookieString = `${name}=${encodedValue}; ${propString}`;
  document.cookie = cookieString;
}
function deleteCookie(name) {
  setCookie(name, "", { "max-age": -1 });
}
function queryToken() {
  const cookie = getCookie("accessToken");
  return cookie.replace("Bearer", "").trim();
}
// const cookie = getCookie('accessToken')
// const queryToken = cookie.replace('Bearer', '').trim()

export const useCookie = { getCookie, setCookie, deleteCookie, queryToken };
