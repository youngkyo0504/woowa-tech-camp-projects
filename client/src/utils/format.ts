export const getNumber = (price: string) => price.replace(/[^0-9]/g, '');

export const formatPrice = (price: string) => {
  const unit = '₩';
  return Number(price) !== 0 ? `${unit} ${Number(price).toLocaleString('kr')}` : '';
};
