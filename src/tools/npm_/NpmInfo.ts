import { StringProperty } from '.';
import { NpmAuthor } from './NpmAuthor';
import { NpmBug } from './NpmBug';
import { NpmMaintainer } from './NpmMaintainer';
import { NpmRepository } from './NpmRepository';
import { NpmVersion } from './NpmVersion';

// tslint:disable-next-line: interface-name
export interface NpmInfo {
  _id: string;
  _rev: string;
  name: string;
  'dist-tags': StringProperty;
  versions: NpmVersion[];
  time: StringProperty;
  maintainers: NpmMaintainer[];
  description: string;
  homepage: string;
  keywords: string[];
  repository: NpmRepository;
  author: NpmAuthor;
  bugs: NpmBug;
  license: string;
  readme: string;
  readmeFilename: string;
}
