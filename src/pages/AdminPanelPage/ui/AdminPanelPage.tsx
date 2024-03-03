import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';

export interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
  const { className } = props;
  const { t } = useTranslation('admin');

  return (
    <Page>
      {t('Панель администратора')}
    </Page>
  );
};

export default memo(AdminPanelPage);
