export const getFormattedPhoneNumber = (phone: string) => {
  const firstSymbol = phone[0] === "7" && "+7";
  let formattedNumber = firstSymbol + " (" + phone.substring(1, 4);
  formattedNumber += ") " + phone.substring(4, 7);
  formattedNumber += "-" + phone.substring(7, 9);
  formattedNumber += "-" + phone.substring(9, 11);

  return formattedNumber;
};
