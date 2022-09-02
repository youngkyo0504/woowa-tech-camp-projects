import styled from 'styled-components';
import Slider from 'react-slick';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  return (
    <Container>
      <Slider dots infinite={false} speed={500} slidesToShow={1} slidesToScroll={1}>
        {images.map((image) => (
          <ImageContainer key={image}>
            <img key={image} src={image} alt="상품이미지" />
          </ImageContainer>
        ))}
      </Slider>
    </Container>
  );
}

const Container = styled.div`
  width: 26rem;
  height: 26rem;

  .slick-dots {
    position: absolute;
    bottom: 5%;
  }
`;

const ImageContainer = styled.div`
  width: 26rem;
  height: 26rem;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0) 16.52%,
    rgba(0, 0, 0, 0) 87.36%,
    rgba(0, 0, 0, 0.24) 100%
  );

  & img {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
