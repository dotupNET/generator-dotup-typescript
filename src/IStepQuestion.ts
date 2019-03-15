import { Question } from 'yeoman-generator';

export interface IStepQuestion<T> extends Question {
  nextQuestion?: T;
}
