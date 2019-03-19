// tslint:disable: no-implicit-dependencies
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import { ProjectGenerator, ProjectQuestions, ProjectType } from '../src/app/ProjectGenerator';

describe('generator-dotup-typescript:app', () => {

  before(() => {
    const answers = {
      [ProjectQuestions.useGit]: false,
      [ProjectQuestions.userEmail]: 'email',
      [ProjectQuestions.userName]: 'name',
      [ProjectQuestions.projectType]: ProjectType.ts_app_node,
      [ProjectQuestions.createFolder]: false
    };

    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers);

  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });

});
