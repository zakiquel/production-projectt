import { DropdownDirection } from '../../../types/ui';

import popupCls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': popupCls.optionsBottomLeft,
  'bottom right': popupCls.optionsBottomRight,
  'top left': popupCls.optionsTopLeft,
  'top right': popupCls.optionsTopRight,
};
