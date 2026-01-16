/**
 * Shared TypeScript types
 */

export type BaseType = {
  id: string;
  createdAt: Date;
};

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  graphQuota: number;
  preferences: {
    theme: 'light' | 'dark';
    connectionMode: 'drag-drop' | 'click-click';
  };
}
