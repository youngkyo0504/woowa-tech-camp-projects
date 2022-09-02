export function getLastAddress(address: string) {
  return address.split(' ').pop();
}

export function getPriceString(price: number) {
  return `${price.toLocaleString()}원`;
}
