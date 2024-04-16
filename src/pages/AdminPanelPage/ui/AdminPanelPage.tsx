import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

export interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
  const { className } = props;
  const { t } = useTranslation('admin');

  return <Page data-testid="AdminPanelPage">{t('Панель администратора')}</Page>;
};

export default memo(AdminPanelPage);
