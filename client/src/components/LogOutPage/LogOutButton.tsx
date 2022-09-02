import Button from '@components/common/Button';
import { useLogOut } from '@queries/useUser';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
  const logOut = useLogOut();
  const navigate = useNavigate();
  const handleLLogOutButtonClick = () => {
    logOut();
    navigate('/login');
  };

  return (
    <Button size="large" onClick={handleLLogOutButtonClick}>
      로그아웃
    </Button>
  );
}
