export function CustomInput(inputID, { format, validate, onChange }) {
  const inputControl = document.querySelector(
    '[data-input-id="' + inputID + '"]'
  );

  const inputElement = inputControl.querySelector("input");
  const checkIcon = inputControl.querySelector(".check-icon");
  const xIcon = inputControl.querySelector(".x-icon");
  const errorMsg = inputControl.nextElementSibling;

  let isValid = false;

  const toggleActiveIcon = (icon, isValid) => {
    icon.classList.toggle("active", isValid);
  };

  const toggleError = () => {
    if (!errorMsg || !errorMsg.classList.contains("error-msg")) {
      return;
    }

    toggleActiveIcon(errorMsg, !isValid);
  };

  const handleInputValue = (value) => {
    const formattedValue = format ? format(value) : value;
    inputElement.value = formattedValue;
    isValid = validate ? validate(formattedValue) : true;
    onChange && onChange(isValid);
    toggleActiveIcon(checkIcon, isValid);
    toggleActiveIcon(xIcon, inputElement.value !== 0);
    toggleError();
  };

  const a = xIcon.addEventListener("click", () => {
    inputElement.value = "";
    toggleActiveIcon(xIcon, false);
    toggleActiveIcon(checkIcon, false);
    toggleError();
    isValid = false;
    onChange && onChange(isValid);
  });

  console.log(a);

  inputElement.addEventListener("input", ({ target }) => {
    handleInputValue(target.value);
  });

  const state = {
    getIsValid: () => {
      return isValid;
    },
    setValue: (value) => {
      handleInputValue(value);
    },
    revalidate: () => {
      handleInputValue(inputElement.value);
      toggleActiveIcon(xIcon, false);
    },

    getInputValue: () => {
      return inputElement.value;
    },
  };

  state.getIsValid();
  return state;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const renderComponent = (htmlSrc, target) => {
  const component = document.createElement("div");
  component.innerHTML = htmlSrc;
  target.append(component);
  return component;
};

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

export async function postData(url = "", data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}
