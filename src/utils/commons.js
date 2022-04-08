export const STATUS_TYPES = {
  new: "NEW",
  live: "LIVE",
  offline: "OFFLINE",
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: "CREDIT CARD",
  BANK_TRANSFER: "BANK TRANSFER",
  PAYPAL: "PAYPAL",
};

export const filterFunction = (data, { searchText, status, paymentModes }) => {
  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) => (status ? item.status === status : true))
    .filter((item) =>
      paymentModes.every((paymentMode) =>
        item.paymentModes.includes(paymentMode)
      )
    );
  return filteredData;
};
