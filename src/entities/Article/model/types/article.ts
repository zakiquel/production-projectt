import { User } from 'entities/User';

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt',
}

export enum ArticleBlockType {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}
export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  CYBERSECURITY = 'CYBERSECURITY',
  DESIGN = 'DESIGN',
  HEALTHCARE = 'HEALTHCARE',
  E_COMMERCE = 'E-COMMERCE',
}

export enum ArticleView {
  LIST = 'list',
  TILE = 'tile',
}

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase{
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase{
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase{
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;
export interface Article {
  id: string;
  title: string;
  user: User;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
