import { memo, useCallback } from 'react';

import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import { Icon } from '../Icon';

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';

import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
        <Icon
          clickable
          onClick={onCopy}
          className={cls.copyBtn}
          Svg={CopyIconNew}
        />
        <code>{text}</code>
      </pre>
    ),
    off: () => (
      <pre className={classNames(cls.Code, {}, [className])}>
        <Button
          onClick={onCopy}
          className={cls.copyBtn}
          theme={ButtonTheme.CLEAR}
        >
          <CopyIcon className={cls.copyIcon} />
        </Button>
        <code>{text}</code>
      </pre>
    ),
  });
});
