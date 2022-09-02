import { Data, PagedResponseDto } from '@customTypes/common';
import { useUser } from '@queries/useUser';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  queryKey: (string | number | undefined)[];
  fetchFunction: (pageParam?: number) => Promise<T>;
}

export default function useInfiniteScroll<T extends Data>({
  queryKey,
  fetchFunction,
}: UseInfiniteScrollProps<PagedResponseDto<T>>) {
  const { user } = useUser();
  const queryClinet = useQueryClient();

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam = undefined }) => fetchFunction(pageParam),
    {
      enabled: user.id > 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextStartParam || undefined,
      onSuccess: ({ pages }) => spreadPageDataOnEachKey('product', pages.at(-1)),
    },
  );

  const spreadPageDataOnEachKey = (queryPrefix: string, page?: PagedResponseDto<T>) => {
    if (!page) return;
    page.data.forEach((dataItem) => {
      queryClinet.setQueryData([queryPrefix, dataItem.id], dataItem);
    });
  };

  const observerRef = useRef<IntersectionObserver>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        fetchNextPage();
      }
    });
  };

  function Trigger() {
    return (
      <div
        ref={triggerRef}
        style={{
          visibility: isLoading ? 'visible' : 'hidden',
          display: hasNextPage ? 'block' : 'none',
        }}
      >
        로딩중
      </div>
    );
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }
  }, [data]);

  return { data, triggerRef, isLoading, Trigger };
}
