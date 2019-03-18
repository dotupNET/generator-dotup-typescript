import { Question } from 'yeoman-generator';

export interface IStepQuestion<T> extends Question {
  isRequired?: boolean;
  isOption?: boolean;
  description?: string;
  optionType?: BooleanConstructor | StringConstructor | NumberConstructor;
  nextQuestion?: T;
  // tslint:disable-next-line: no-any
  acceptAnswer?(answer?: string | boolean | number): string | boolean | number | Promise<string | boolean | number>;
}
