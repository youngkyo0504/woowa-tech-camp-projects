import { makeObservable } from "@core/Observer";
import { getPageFromPath } from "@utils/stringUtils";

export const pageState = makeObservable({
    page: getPageFromPath(window.location.pathname),
});
export const pageList = new Map();

const Route = {
    navigate(page) {
        if (typeof page !== "string") {
            pageState.page = getPageFromPath(window.location.pathname);
            return;
        }

        const pathName = `/${page}`;
        if (pageState.page !== page) {
            history.pushState(null, null, pathName);
            pageState.page = page;
        } else {
            history.replaceState(null, null, pathName);
        }
    },
};
window.onpopstate = () => Route.navigate();

/**
 * 컴포넌트와 경로를 받아서 라우팅합니다.
 * 컴포넌트의 경로가 맞을 때 Element를, 아닐 때 null을 반환합니다.
 * @param {{ Component: Class, path: string }} 라우팅 할 컴포넌트의 정보들
 * @returns HTMLElement | null
 */
export const Routes = ({ Component, path }) => {
    if (!Component) {
        return null;
    }
    if (`/${pageState.page}` === path) {
        return new Component();
    }
    return null;
};

export default Route;
