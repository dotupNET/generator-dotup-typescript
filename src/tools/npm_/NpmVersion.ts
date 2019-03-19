import { StringProperty } from '.';
import { _npmOperationalInternal } from './_npmOperationalInternal';
import { _npmUser } from './_npmUser';
import { NpmAuthor } from './NpmAuthor';
import { NpmBug } from './NpmBug';
import { NpmDist } from './NpmDist';
import { NpmMaintainer } from './NpmMaintainer';
import { NpmRepository } from './NpmRepository';

export interface NpmVersion {
  name: string;
  version: string;
  description: string;
  main: string;
  types: string;
  scripts: StringProperty;
  repository: NpmRepository;
  keywords: string[];
  author: NpmAuthor;
  license: string;
  bugs: NpmBug;
  homepage: string;
  dependencies: StringProperty;
  devDependencies: StringProperty;
  gitHead: string;
  _id: string;
  _nodeVersion: string;
  _npmVersion: string;
  dist: NpmDist;
  maintainers: NpmMaintainer[];
  _npmUser: _npmUser;
  directories: Object;
  _npmOperationalInternal: _npmOperationalInternal;
  _hasShrinkwrap: boolean;
}
