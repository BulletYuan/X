export interface SideItem {
  label: string,
  value: string,
  component: any,
  isParent?: boolean,
  isActive?: boolean,
  children?: SideItem[],
}