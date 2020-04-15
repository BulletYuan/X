export interface SideItem {
  label: string,
  value: number,
  component: any,
  isParent?: boolean,
  isActive?: boolean,
  children?: SideItem[],
}