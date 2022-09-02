export interface InfiniteFetchFunctionDto {
  nextStartParam: number | null;
}

export type QueryKeyType = (string | number)[];

export interface Data {
  id: number;
}

export interface PagedResponseDto<T extends Data> {
  nextStartParam: number | null;
  data: T[];
}

interface IFetchFunction {
  nextStartParam: number | null;
}
