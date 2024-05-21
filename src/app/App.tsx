import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppRouter } from './providers/router';

import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
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
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return toggleFeatures({
      name: 'isAppRedesigned',
      on: () => (
        <div id="app" className={classNames('app_redesigned', {}, [])}>
          <AppLoaderLayout />
        </div>
      ),
      off: () => <PageLoader />,
    });
  }

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <div id="app" className={classNames('app_redesigned', {}, [])}>
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
      <div id="app" className={classNames('app', {}, [])}>
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
