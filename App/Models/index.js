// @flow

export type Navigator = {
  goBack: (key?: string) => void,
  navigate: (routeName: string, params?: any, action?: any, key?: string) => void,
  pop: (key?: string) => void,
  setParams: (params: any, key?: string) => void,
  replace: (key: string, newKey?: string, routeName?: string, params?: any) => void
}

export type Task = {
  id: string;
  title: string;
  done: boolean;
}


