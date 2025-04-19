
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

interface TelegramWebAppInitData {
  query_id?: string;
  user?: TelegramUser;
  auth_date: string;
  hash: string;
}

interface TelegramWebAppInfo {
  version: string;
  platform: string;
  theme_params: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramWebAppInitData;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  ready(): void;
  expand(): void;
  close(): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;
  showAlert(message: string, callback?: () => void): void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive: boolean): void;
    hideProgress(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  openLink(url: string): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: 'paid' | 'failed' | 'pending' | 'cancelled') => void): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: {
      text: string;
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
    }[];
  }, callback?: (buttonId: string) => void): void;
  showScanQrPopup(params: {
    text?: string;
  }, callback?: (text: string) => void): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback: (text: string) => void): void;
  setHeaderColor(color: 'bg_color' | 'secondary_bg_color' | string): void;
  setBackgroundColor(color: 'bg_color' | 'secondary_bg_color' | string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  sendData(data: string): void;
  CloudStorage: {
    setItem(key: string, value: string, callback?: (error: Error | null, stored: boolean) => void): void;
    getItem(key: string, callback: (error: Error | null, value: string | null) => void): void;
    getItems(keys: string[], callback: (error: Error | null, values: { [key: string]: string | null }) => void): void;
    removeItem(key: string, callback?: (error: Error | null, removed: boolean) => void): void;
    removeItems(keys: string[], callback?: (error: Error | null, removed: boolean) => void): void;
    getKeys(callback: (error: Error | null, keys: string[]) => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
  isVersionAtLeast(version: string): boolean;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}
