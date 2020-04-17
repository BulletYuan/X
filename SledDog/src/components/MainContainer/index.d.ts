
export interface ComponentAttributeItem {
  label?: string,
  type?: string,
  value?: string,
  htmlArea?: string,
}
export interface ComponentAttributeSelect {
  label?: string,
  type?: string,
  value?: ComponentAttributeItem[],
}
export interface ComponentAttributeInput {
  label?: string,
  type?: string,
  regex?: string,
}
export interface ComponentAttributeContianer {
  label?: string,
  type?: string,
  value?: [ComponentAttributeSelect | ComponentAttributeInput],
}
export interface ComponentAttributeLayout {
  label?: string,
  type?: string,
  value?: ComponentAttributeContianer[],
}

export interface ComponentEventItem {
  label?: string,
  params?: string,
  type?: string,
}

export interface ComponentContent {
  html?: string,
  components?: SledComponent[],
}

export interface SledComponent {
  label: string,
  name: string,
  element: string,
  baseHtml?: string,
  content?: ComponentContent,
  attributes?: {
    layout?: ComponentAttributeLayout,
    class?: ComponentAttributeInput,
    style?: ComponentAttributeInput,
    data?: ComponentAttributeInput,
  },
  events?: {
    click?: ComponentEventItem,
    scroll?: ComponentEventItem,
  },
}