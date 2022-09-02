import { searchRegionByKeyword } from '@apis/region';
import SearchIcon from '@assets/icons/SearchIcon';
import NavigationBar from '@components/common/NavigationBar';
import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { padding } from '@constants/padding';
import { IRegion } from '@customTypes/region';
import mixin from '@style/mixin';
import { debounce } from '@utils/common';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import RegionSearchList from './RegionSearchList';

interface RegionModalProps {
  isModalOpen: boolean;
  toggleModalOpen: () => void;
  setSelectedRegion: React.Dispatch<IRegion>;
}

export default function RegionModal({
  isModalOpen,
  toggleModalOpen,
  setSelectedRegion,
}: RegionModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<IRegion[]>([]);

  const searchRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const selectRegion = (region: IRegion) => {
    setSelectedRegion(region);
    toggleModalOpen();
  };

  useEffect(() => {
    (async () => {
      const result = await searchRegionByKeyword(searchKeyword);
      setSearchResult(result);
    })();
  }, [searchKeyword]);

  useEffect(() => {
    setInputValue('');
    setSearchKeyword('');
  }, [isModalOpen]);

  const [inputValue, setInputValue] = useState('');
  return (
    <RegionModalWrapper isModalOpen={isModalOpen}>
      <NavigationBar title="동네 찾기" navigationButtonHandler={toggleModalOpen} />
      <ContentWrapper>
        <Label htmlFor="search">
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
          <input
            value={inputValue}
            onInput={(e) => {
              setInputValue(e.currentTarget.value);
            }}
            type="text"
            placeholder="동명(읍, 면)으로 검색 (ex.방이동)"
            onChange={debounce(searchRegion, 300)}
          />
        </Label>

        <RegionSearchList
          searchKeyword={searchKeyword}
          searchResult={searchResult}
          selectRegion={selectRegion}
        />
      </ContentWrapper>
    </RegionModalWrapper>
  );
}

const RegionModalWrapper = styled.div<{ isModalOpen: boolean }>`
  position: absolute;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-out;
  background-color: ${colors.offWhite};
  ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(100%);
        `};
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding: 88px ${padding.pageSide} 0 ${padding.pageSide};
  background-color: ${colors.white};
`;

const IconWrapper = styled.div`
  --icon-size: 16px;
  width: var(--icon-size);
  height: var(--icon-size);
`;

const Label = styled.label`
  ${mixin.flexMixin({ align: 'center' })};

  gap: 10px;

  input {
    font-size: ${fontSize.medium};
    width: 100%;
  }
`;
