export type MenuItemOption = {
  data: { name: string; content: string[] }[];
};

export interface MenuItem {
  id: number;

  name: string;

  price: number;

  option: MenuItemOption;

  thumbnail: string;

  menuId: number;

  status: StatusFormat;
}

export enum StatusFormat {
  HOT = 'HOT',
  NEW = 'NEW',
  NORMAL = 'NORMAL',
}

export interface Menu {
  id: number;

  name: string;

  menuItem: MenuItem[];
}
