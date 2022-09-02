export const PROXY_SYMBOL = Symbol("Proxy");

export const { makeObservable, subscribe } = (function () {
    const observerMap = new Map();

    function makeObservable(state) {
        return new Proxy(state, {
            get(_, property) {
                if (property === "prototype") {
                    return PROXY_SYMBOL;
                }
                return Reflect.get(...arguments);
            },
            set(target, property, value, receiver) {
                const handlerSet = observerMap.get(receiver);
                const isChange = target[property] !== value;

                if (!isChange) {
                    return true;
                }

                Reflect.set(...arguments);
                if (handlerSet) {
                    handlerSet.forEach((handler) => {
                        const isSuccess = handler();
                        if (!isSuccess) {
                            handlerSet.delete(handler);
                        }
                    });
                }
                return true;
            },
        });
    }

    function subscribe(state, handler) {
        const handlerSet = observerMap.get(state);

        if (handlerSet) {
            handlerSet.add(handler);
        } else {
            observerMap.set(state, new Set([handler]));
        }
    }

    return { makeObservable, subscribe };
})();
