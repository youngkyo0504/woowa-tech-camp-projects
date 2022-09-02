import { IProduct } from '@customTypes/product';
import CategorySelector from './CategorySelector';
import DescriptionTextArea from './DescriptionTextArea';
import ImageUploader from './ImageUploader';
import PriceInput from './PriceInput';
import TitleInput from './TitleInput';

export default function Post({ product }: { product?: IProduct }) {
  return (
    <>
      <ImageUploader thumbnails={product?.thumbnails} />
      <TitleInput name={product?.name} />
      <CategorySelector categoryId={product?.category.id} />
      <PriceInput price={product?.price} />
      <DescriptionTextArea description={product?.description} />
    </>
  );
}
