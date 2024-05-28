import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';

import {
  Article,
  articleApi,
  ArticleBlock,
  ArticleBlockType,
  ArticleType,
} from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useDate } from '@/shared/lib/getDate/useDate';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
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

export enum blockFields {
  IMAGE_SRC = 'src',
  TITLE = 'title',
  CODE = 'code',
  PARAGRAPHS = 'paragraphs',
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article-edit');
  const [blocksData, setBlocksData] = useState<ArticleBlock[]>([]);
  const [blocks, setBlocks] = useState<ReactNode[]>([]);
  const [addBlock, setAddBlock] = useState<string>('text');
  const { id } = useParams<{ id: string }>();
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleSubtitle, setArticleSubtitle] = useState<string>('');
  const [articleImage, setArticleImage] = useState<string>('');
  const [articleType, setArticleType] = useState<ArticleType>(
    ArticleType.ECONOMICS,
  );

  const isEdit = Boolean(id);
  const date = useDate();
  const user = useSelector(getUserAuthData);
  const [createArticle, { isLoading }] = articleApi.useCreateArticleMutation();

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

  const articleTypeOptions = useMemo<SelectOption<ArticleType>[]>(
    () => [
      {
        value: ArticleType.WEB,
        content: t('Веб'),
      },
      {
        value: ArticleType.DESIGN,
        content: t('Дизайн'),
      },
      {
        value: ArticleType.CYBERSECURITY,
        content: t('Кибербезопасность'),
      },
      {
        value: ArticleType.HEALTHCARE,
        content: t('Здоровье'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
    ],
    [t],
  );

  const handleBlockChange = useCallback(
    (blockId: string, value: string, type: blockFields) => {
      setBlocksData((prevState) => {
        const blockIndex = prevState.findIndex((block) => block.id === blockId);

        if (blockIndex !== -1) {
          const updatedBlocksData = [...prevState];

          switch (type) {
            case blockFields.CODE:
              updatedBlocksData[blockIndex] = {
                ...updatedBlocksData[blockIndex],
                // @ts-ignore
                code: value,
              };
              break;
            case blockFields.IMAGE_SRC:
              updatedBlocksData[blockIndex] = {
                ...updatedBlocksData[blockIndex],
                // @ts-ignore
                src: value,
              };
              break;
            case blockFields.PARAGRAPHS:
              updatedBlocksData[blockIndex] = {
                ...updatedBlocksData[blockIndex],
                // @ts-ignore
                paragraphs: [value],
              };
              break;
            case blockFields.TITLE:
              updatedBlocksData[blockIndex] = {
                ...updatedBlocksData[blockIndex],
                // @ts-ignore
                title: value,
              };
              break;
            default:
              return prevState;
          }
          return updatedBlocksData;
        }
        return prevState;
      });
    },
    [],
  );

  const handleAddBlock = useCallback(() => {
    const id = uuid();
    if (addBlock === 'text') {
      setBlocksData((prevState) => [
        ...prevState,
        {
          id,
          type: ArticleBlockType.TEXT,
          title: '',
          paragraphs: [],
        },
      ]);
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <VStack gap="4" max>
            <Input
              onChange={(value) =>
                handleBlockChange(id, value, blockFields.TITLE)
              }
              placeholder={t('Заголовок')}
            />
            <TextArea
              onChange={(value) =>
                handleBlockChange(id, value, blockFields.PARAGRAPHS)
              }
              placeholder={t('Блок текста')}
            />
          </VStack>
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
    if (addBlock === 'code') {
      setBlocksData((prevState) => [
        ...prevState,
        {
          id,
          type: ArticleBlockType.CODE,
          code: '',
        },
      ]);
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <TextArea
            onChange={(value) => handleBlockChange(id, value, blockFields.CODE)}
            placeholder={t('Блок кода')}
            variant="code"
          />
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
    if (addBlock === 'image') {
      setBlocksData((prevState) => [
        ...prevState,
        {
          id,
          type: ArticleBlockType.IMAGE,
          src: '',
          title: '',
        },
      ]);
      setBlocks((prevState) => [
        ...prevState,
        <HStack gap="8" max>
          <VStack gap="4" max>
            <Input
              onChange={(value) =>
                handleBlockChange(id, value, blockFields.IMAGE_SRC)
              }
              placeholder={t('Вставьте ссылку на изображение')}
            />
            <Input
              onChange={(value) =>
                handleBlockChange(id, value, blockFields.TITLE)
              }
              placeholder={t('Подпись')}
            />
          </VStack>
          <Button variant="clear">{t('X')}</Button>
        </HStack>,
      ]);
    }
  }, [addBlock, handleBlockChange, t]);

  const onTitleTextChange = useCallback((value: string) => {
    setArticleTitle(value);
  }, []);

  const onSubtitleTextChange = useCallback((value: string) => {
    setArticleSubtitle(value);
  }, []);

  const onImageChange = useCallback((value: string) => {
    setArticleImage(value);
  }, []);

  const handleSubmit = async () => {
    await createArticle({
      title: articleTitle,
      subtitle: articleSubtitle,
      img: articleImage,
      createdAt: date,
      user,
      type: [articleType],
      blocks: blocksData,
    } as Article);
    setArticleTitle('');
    setArticleSubtitle('');
    setArticleImage('');
    setArticleType(ArticleType.ECONOMICS);
    setBlocks([]);
    setBlocksData([]);
  };

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
          {isLoading ? (
            <Card className={cls.loader} max>
              <Loader />
            </Card>
          ) : (
            <form className={cls.form}>
              <VStack gap="16">
                <Input
                  id="1"
                  placeholder={t('Заголовок статьи')}
                  value={articleTitle}
                  onChange={onTitleTextChange}
                  autoComplete="off"
                />
                <Input
                  id="2"
                  placeholder={t('Подзаголовок статьи')}
                  value={articleSubtitle}
                  onChange={onSubtitleTextChange}
                  autoComplete="off"
                />
                <Input
                  id="3"
                  placeholder={t('Ссылка на изображение статьи')}
                  value={articleImage}
                  onChange={onImageChange}
                  autoComplete="off"
                />
                <ListBox
                  items={articleTypeOptions}
                  onChange={setArticleType}
                  value={articleType}
                  label={t('Тема статьи')}
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
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    variant="filled"
                  >
                    {t('Создать статью')}
                  </Button>
                </div>
              </VStack>
            </form>
          )}
        </Card>
      </VStack>
    </Page>
  );
});

export default memo(ArticleEditPage);
