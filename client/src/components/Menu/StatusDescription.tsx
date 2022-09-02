import React from 'react';
import styled from 'styled-components';
import mixin from '../../styles/mixin';

export enum StatusFormat {
  HOT = 'HOT',
  NEW = 'NEW',
  NORMAL = 'NORMAL',
}

const statusColorMap: Record<StatusFormat, string> = {
  [StatusFormat.HOT]: 'var(--red400)',
  [StatusFormat.NEW]: 'var(--primary-2)',
  [StatusFormat.NORMAL]: 'transparent',
};

interface StatusDescriptionProps {
  status: 'NORMAL' | 'HOT' | 'NEW';
}

function StatusDescription({ status }: StatusDescriptionProps) {
  return (
    <>
      <Wrapper>
        <StatusText status={StatusFormat[status]}>{status}</StatusText>
      </Wrapper>
    </>
  );
}

const StatusText = styled.span<{ status?: StatusFormat }>`
  border-radius: var(--rounded-sm);
  height: 22px;
  padding: 2px 6px;
  font-size: var(--text-xs);
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.2px;
  color: white;
  overflow: hidden;
  background-color: ${({ status }) => (status ? statusColorMap[status] : '')};
`;

const Wrapper = styled.div`
  position: absolute;
  ${mixin.flexMixin({})}
  top: 0px;
  left: 0px;
  padding: 8px;
`;

export default StatusDescription;
