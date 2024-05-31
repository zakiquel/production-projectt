import React from 'react';
import { useTranslation } from 'react-i18next';

import FSDImage from '@/shared/assets/images/fsd.jpg';
import PipelineImage from '@/shared/assets/images/pipeline.png';
import ReduxImage from '@/shared/assets/images/redux.svg';
import StorybookImage from '@/shared/assets/images/storybook.png';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import cls from './AboutPage.module.scss';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
    <Page data-testid="AboutPage">
      <Card padding="24" border="partial" className={cls.card}>
        <Text
          title={t('Добро пожаловать на наш веб-сайт для публикации статей!')}
          size="l"
          bold
        />
        <Text
          title={t('О нас')}
          text={t(
            'Наш проект является веб-сайтом, разработанным в рамках выпускной квалификационной работы' +
              ' с использованием современных web-технологий. Мы предоставляем платформу для публикации ' +
              'и просмотра статей на различные темы.',
          )}
          bold
        />
        <Text
          title={t('Архитектура проекта')}
          text={t(
            'Мы придерживаемся методологии Feature sliced design, ' +
              'которая помогает нам структурировать код для удобного развития ' +
              'и поддержки проекта.',
          )}
          bold
        />
        <AppImage src={FSDImage} className={cls.img} />
        <Text
          title={t('Работа с данными')}
          text={t(
            'Для управления данными мы используем Redux Toolkit. Взаимодействие с сервером ' +
              'осуществляется через RTK query. Мы также используем DynamicModuleLoader для асинхронной ' +
              'подгрузки редьюсеров.',
          )}
          bold
        />
        <div className={cls.wrapper}>
          <Icon Svg={ReduxImage} className={cls.img} />
        </div>
        <Text
          title={t('Storybook')}
          text={t(
            'Мы используем Storybook для описания стори-кейсов каждого компонента нашего приложения. ' +
              'Это помогает нам визуализировать и тестировать компоненты в изоляции. Запустить Storybook' +
              ' можно командой npm run storybook.',
          )}
          bold
        />
        <AppImage src={StorybookImage} className={cls.img} />
        <Text
          title={t('CI Pipeline и Pre-commit Hooks')}
          text={t(
            'Мы интегрировали непрерывную интеграцию в наш репозиторий с помощью GitHub Actions.' +
              ' В рамках CI прогоняются все виды тестов, происходит сборка проекта и проверка линтерами.' +
              ' Мы также настроили pre-commit хуки для автоматической проверки кода перед коммитом',
          )}
          bold
        />
        <div className={cls.wrapper}>
          <AppImage
            src={PipelineImage}
            width={700}
            height={400}
            className={cls.imgPipeLine}
          />
        </div>
        <Text
          title={t('Работа с переводами')}
          text={t(
            'Для обеспечения многоязычности сайта используется библиотека i18next. ' +
              'Это позволяет легко добавлять новые языки и переводить контент.',
          )}
          bold
        />
        <Text
          title={t('Тестирование')}
          text={t(
            'Было уделено большое внимание тестированию приложения. ' +
              'Используется четыре вида тестов: unit-тесты на Jest, тесты компонентов с помощью ' +
              'React Testing Library, скриншотное тестирование с Loki, а также e2e-тестирование с ' +
              'Cypress.',
          )}
          bold
        />
        <Text
          title={t('Линтинг')}
          text={t(
            'Для поддержания чистоты и качества кода используется eslint для TypeScript кода ' +
              'и stylelint для файлов со стилями. Также был разработан собственный eslint плагин для ' +
              'строгого контроля главных архитектурных принципов.',
          )}
          bold
        />
      </Card>
    </Page>
  );
};

export default AboutPage;
