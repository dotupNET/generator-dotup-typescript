import { Question } from 'yeoman-generator';

export interface IStepQuestion<T> extends Question {
  nextQuestion?: T;
}

export interface QuestionWithAnswer<T> extends Question {
  answer: T;
}
