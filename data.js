let data = [];

export function getData(length) {
  do {
    if (data.length >= length) {
      return data;
    }

    const label = prompt(`${data.length + 1}번째 Enter Label :`);
    const value = +prompt("Enter value :");

    if (!isValidate(label, value)) {
      alert("유효한 값을 넣어주십시오");
      continue;
    }

    data.push({
      label,
      value,
    });
  } while (true);
}

function isValidate(label, value) {
  return label.constructor === String && isFinite(value);
}
