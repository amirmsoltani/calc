export type CreateOperatorType = {
  title: string;
  firstValue?: number;
  secondValue?: number;
  value?: number;
}

export type OperatorType = CreateOperatorType & { id: number; }
