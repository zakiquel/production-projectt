import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppRouter } from './providers/router';

import { getUserInited, initAuthData } from '@/entities/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

function App() {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <div className={classNames('app_redesigned', {}, [])}>
        <Suspense fallback="">
          <MainLayout
            header={<Navbar />}
            content={<AppRouter />}
            sidebar={<Sidebar />}
            toolbar={<div />}
          />
        </Suspense>
      </div>
    ),
    off: () => (
      <div className={classNames('app', {}, [])}>
        <Suspense fallback="">
          <Navbar />
          <div className="content-page">
            <Sidebar />
            <AppRouter />
          </div>
        </Suspense>
      </div>
    ),
  });
}

export default App;
