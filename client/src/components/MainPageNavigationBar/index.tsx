import colors from '@constants/colors';
import styled from 'styled-components';
import mixin from '@style/mixin';
import CategoryIcon from '@assets/icons/CategoryIcon';
import MenuIcon from '@assets/icons/MenuIcon';
import UserIcon from '@assets/icons/UserIcon';
import { useNavigate } from 'react-router-dom';
import MainNavTitle from './MainNavTitle';

export default function MainPageNavigationBar() {
  const navigate = useNavigate();

  return (
    <Container>
      <IconButton left="1rem" onClick={() => navigate('/category/list')}>
        <CategoryIcon />
      </IconButton>
      <MainNavTitle />
      <IconButton right="3.5rem" onClick={() => navigate('/logout')}>
        <UserIcon />
      </IconButton>
      <IconButton right="1rem" onClick={() => navigate('/my')}>
        <MenuIcon />
      </IconButton>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  ${mixin.flexMixin({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 3.5rem;
  padding: 1rem 1.5rem;
  background-color: ${colors.primary};
  border-radius: 0 0rem 1rem 1rem;
  z-index: 10;
`;

const IconButton = styled.button<{ left?: string; right?: string }>`
  position: absolute;
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  svg {
    stroke: white;
  }
`;
