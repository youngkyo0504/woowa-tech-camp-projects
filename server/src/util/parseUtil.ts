import { UserRegion } from 'src/region/entities/userRegion.entity';

export default function extractRegionsFromUserRegions(
  userRegions: Partial<UserRegion>[],
) {
  const regions = userRegions.map((userRegion) => ({
    id: userRegion.region.id,
    address: userRegion.region.address,
    isPrimary: userRegion.isPrimary,
  }));

  return regions;
}
