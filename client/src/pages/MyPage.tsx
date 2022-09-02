import NavigationBar from '@components/common/NavigationBar';
import MyTab from '@components/MyTab';
import TransitionPage from '@components/TransitionPage';

export default function MyPage() {
  return (
    <TransitionPage depth={1}>
      <NavigationBar shadowColor="transparent" title="메뉴" />
      <MyTab />
    </TransitionPage>
  );
}
