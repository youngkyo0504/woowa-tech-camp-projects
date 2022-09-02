import { useEffect, useState } from 'react';
import { MenuItemOption } from '../../../types/server/menu';

export const MAX_COUNT = 20;

const useMenuOption = (option: MenuItemOption) => {
  const [count, setCount] = useState(1);
  const [isAllValidate, setIsAllValidate] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<(null | string | number | boolean)[]>(
    option.data.map(() => null)
  );

  useEffect(() => {
    if (actions.validateOption()) {
      setIsAllValidate(true);
    }
  }, [selectedOptions]);

  const actions = {
    countUp: () => {
      if (count < MAX_COUNT) {
        setCount(count + 1);
      }
    },
    countDown: () => {
      if (count === 1) {
        return;
      }
      setCount(count - 1);
    },
    selectOption: (optionIndex: number, value: string | number) => () => {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(optionIndex, 1, value);
      setSelectedOptions(newSelectedOptions);
    },
    validateOption: () => {
      return selectedOptions.every((option) => option !== null);
    },
  };

  return { count, actions, selectedOptions, isAllValidate };
};

export default useMenuOption;
