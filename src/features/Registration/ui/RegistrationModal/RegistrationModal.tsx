import { Suspense } from 'react';

import { RegistrationFormAsync } from '../RegistrationForm/RegistrationForm.async';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';

interface RegistrationModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = (props: RegistrationModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <RegistrationFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
