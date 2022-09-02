import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { IRegion } from '@customTypes/region';
import mixin from '@style/mixin';
import styled from 'styled-components';

interface RegionSearchListProps {
  searchKeyword: string;
  searchResult: IRegion[];
  selectRegion: (region: IRegion) => void;
}

export default function RegionSearchList({
  searchKeyword,
  searchResult,
  selectRegion,
}: RegionSearchListProps) {
  return searchResult.length ? (
    <SearchListWrapper>
      <Text weight="bolder">{`'${searchKeyword}'검색 결과`}</Text>
      <>
        {searchResult.map((region) => (
          <ResultItem
            key={region.id}
            tabIndex={0}
            type="button"
            onClick={() => selectRegion(region)}
          >
            {region.address}
          </ResultItem>
        ))}
      </>
    </SearchListWrapper>
  ) : (
    <SearchListWrapper>검색결과가 없습니다.</SearchListWrapper>
  );
}

const SearchListWrapper = styled.div`
  padding: 1rem 0;
  ${mixin.flexMixin({ direction: 'column' })}

  ${Text} {
    margin: 0.5rem 0;
    font-size: 14px;
  }
`;

const ResultItem = styled.button`
  width: 100%;
  padding: 1rem 0.25rem;
  text-align: left;
  font-size: ${fontSize.medium};
  border-bottom: 1px solid ${colors.grey2};

  :hover {
    background-color: ${colors.offWhite};
  }
`;
