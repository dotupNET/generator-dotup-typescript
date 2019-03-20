
export interface IProperty extends ITypedProperty<any> {
}

export interface ITypedProperty<T> {
  [key: string]: T;
}
