import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { Page } from '@/widgets/Page';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleSubtitle, setArticleSubtitle] = useState<string>('');
  const [blocks, setBlocks] = useState<ReactNode[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [addBlock, setAddBlock] = useState<string>('text');

  const onTitleTextChange = useCallback((value: string) => {
    setArticleTitle(value);
  }, []);

  const onSubtitleTextChange = useCallback((value: string) => {
    setArticleSubtitle(value);
  }, []);

  const handleAddBlock = useCallback(() => {
    if (addBlock === 'text') {
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <TextArea placeholder={t('Блок текста')} />
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
    if (addBlock === 'code') {
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <TextArea placeholder={t('Блок кода')} variant="code" />
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
    if (addBlock === 'image') {
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <Input
            placeholder={t('Вставьте ссылку на изображение')}
            value={articleTitle}
            onChange={onTitleTextChange}
          />
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
  }, [addBlock, articleTitle, onTitleTextChange, t]);

  const addOptions = useMemo<SelectOption<string>[]>(
    () => [
      {
        value: 'text',
        content: t('Текст'),
      },
      {
        value: 'code',
        content: t('Код'),
      },
      {
        value: 'image',
        content: t('Изображение'),
      },
    ],
    [t],
  );

  const isEdit = Boolean(id);
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <VStack gap="16" max>
        <Card padding="16" border="partial" max>
          {isEdit ? (
            <Text title={t('Редактирование статьи с ID = ') + id} />
          ) : (
            <Text title={t('Создание статьи')} />
          )}
        </Card>
        <Card padding="16" border="partial" max>
          <form className={cls.form}>
            <VStack gap="16">
              <Input
                id="1"
                placeholder={t('Заголовок статьи')}
                value={articleTitle}
                onChange={onTitleTextChange}
              />
              <Input
                id="2"
                placeholder={t('Подзаголовок статьи')}
                value={articleSubtitle}
                onChange={onSubtitleTextChange}
              />
              {blocks}
              <HStack gap="8">
                <ListBox
                  items={addOptions}
                  onChange={setAddBlock}
                  value={addBlock}
                />
                <Button variant="clear" onClick={handleAddBlock}>
                  {t('Добавить поле')}
                </Button>
              </HStack>
              <div className={cls.createBtn}>
                <Button variant="filled">{t('Создать статью')}</Button>
              </div>
            </VStack>
          </form>
        </Card>
      </VStack>
    </Page>
  );
});

export default memo(ArticleEditPage);
