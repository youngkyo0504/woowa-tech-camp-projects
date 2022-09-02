import { css, FlattenSimpleInterpolation } from 'styled-components';

type flexDirectionType = 'row' | 'column';
type flexAlignmentType = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between';
type flexWrapType = 'wrap' | 'no-wrap';

interface IFlexOptions {
  direction?: flexDirectionType;
  align?: flexAlignmentType;
  justify?: flexAlignmentType;
  wrap?: flexWrapType;
}

interface IMixin {
  flexMixin: (flexOptions: IFlexOptions) => FlattenSimpleInterpolation;
}

const mixin: IMixin = {
  flexMixin: ({
    direction = 'row',
    align = 'flex-start',
    justify = 'flex-start',
    wrap = 'no-wrap',
  }) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
    flex-wrap: ${wrap};
  `,
};

export default mixin;
