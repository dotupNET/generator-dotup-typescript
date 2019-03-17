
import * as path from 'path';
import { ProjectInfo } from './ProjectInfo';
import { ProjectPathAnalyser } from './ProjectPathAnalyser';

function getPath(...args: string[]): string {
  const tplPath = `C:/data/dotup/src/github/yo/generator-dotup-typescript/src/ts-app/templates`;

  return path.join(tplPath, ...args);
}

const p = new ProjectInfo();
p.language = 'ts';
p.runtime = 'node';
p.typ = 'lib';
p.sourceDirName = 'src';

const x = new ProjectPathAnalyser(getPath);
const result = x.getProjectFiles(p);
console.log(result);
