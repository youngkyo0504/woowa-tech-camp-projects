import { requestChangePrimaryRegion, requestDeleteRegion } from '@apis/user';
import { IRegion } from '@customTypes/region';
import { useUser } from '@queries/useUser';
import React from 'react';

export default function useUserRegion() {
  const { user, refetchUser } = useUser();
  const regions = user?.regions || [];

  const deleteRegion = (region: IRegion) => (e: React.MouseEvent) => {
    e.stopPropagation();

    requestDeleteRegion(region).then(() => {
      refetchUser();
    });
  };

  const updateRegionPrimary = (region: IRegion) => (e: React.MouseEvent) => {
    requestChangePrimaryRegion(region).then(() => {
      refetchUser();
    });
  };

  return { regions, deleteRegion, updateRegionPrimary };
}
