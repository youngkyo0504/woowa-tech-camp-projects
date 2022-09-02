import React, { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isModalOpen);
  };

  return { isModalOpen, toggleModal };
};

export default useModal;
