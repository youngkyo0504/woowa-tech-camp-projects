export interface IRegion {
  id: number;
  address: string;
  isPrimary: boolean;
}

export interface RegionSearchAPIResponseDto {
  ok: boolean;
  regions: IRegion[];
}
