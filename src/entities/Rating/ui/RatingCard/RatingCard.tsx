/* eslint-disable react/prop-types */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { toggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
  Button as ButtonDeprecated,
  ButtonSize,
} from '@/shared/ui/deprecated/Button/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Text } from '@/shared/ui/redesigned/Text';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo(
  ({
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    className,
    onAccept,
    rate = 0,
  }: RatingCardProps) => {
    const { t } = useTranslation();
    const isDeviceMobile = useDevice();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (
        <>
          <Text title={feedbackTitle} />
          <Input
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
            data-testid="RatingCard.Input"
          />
        </>
      ),
      off: () => (
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
            data-testid="RatingCard.Input"
          />
        </>
      ),
    });

    const content = (
      <>
        <VStack align="center" gap="8" max>
          {toggleFeatures({
            name: 'isAppRedesigned',
            on: () => (
              <Text title={starsCount ? t('Спасибо за оценку!') : title} />
            ),
            off: () => (
              <TextDeprecated
                title={starsCount ? t('Спасибо за оценку!') : title}
              />
            ),
          })}
          <StarRating
            selectedStars={starsCount}
            size={40}
            onSelect={onSelectStars}
          />
        </VStack>
        {isDeviceMobile ? (
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
            <VStack gap="32" max>
              {modalContent}
              {toggleFeatures({
                name: 'isAppRedesigned',
                on: () => (
                  <Button onClick={acceptHandle} fullWidth size="l">
                    {t('Отправить')}
                  </Button>
                ),
                off: () => (
                  <ButtonDeprecated
                    onClick={acceptHandle}
                    fullWidth
                    size={ButtonSize.L}
                  >
                    {t('Отправить')}
                  </ButtonDeprecated>
                ),
              })}
            </VStack>
          </Drawer>
        ) : (
          <Modal isOpen={isModalOpen} lazy>
            <VStack max gap="32">
              {modalContent}
              {toggleFeatures({
                name: 'isAppRedesigned',
                on: () => (
                  <HStack gap="16" max justify="end">
                    <>
                      <Button
                        data-testid="RatingCard.Close"
                        onClick={cancelHandle}
                      >
                        {t('Закрыть')}
                      </Button>
                      <Button
                        data-testid="RatingCard.Send"
                        onClick={acceptHandle}
                      >
                        {t('Отправить')}
                      </Button>
                    </>
                  </HStack>
                ),
                off: () => (
                  <HStack gap="16" max justify="end">
                    <>
                      <ButtonDeprecated
                        data-testid="RatingCard.Close"
                        onClick={cancelHandle}
                      >
                        {t('Закрыть')}
                      </ButtonDeprecated>
                      <ButtonDeprecated
                        data-testid="RatingCard.Send"
                        onClick={acceptHandle}
                      >
                        {t('Отправить')}
                      </ButtonDeprecated>
                    </>
                  </HStack>
                ),
              })}
            </VStack>
          </Modal>
        )}
      </>
    );

    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (
        <Card max border="round" padding="24">
          {content}
        </Card>
      ),
      off: () => (
        <CardDeprecated data-testid="RatingCard" className={className} max>
          {content}
        </CardDeprecated>
      ),
    });
  },
);
