import * as fs from 'fs';
import * as ini from 'ini';
import * as path from 'path';

export interface IBranch {
  name: string;
  merge: string;
  remote: string;
}

export interface IRemote {
  name: string;
  fetch: string;
  url: string;
}

export interface ICore {
  repositoryformatversion: string;
  filemode: boolean;
  bare: boolean;
  logallrefupdates: boolean;
  symlinks: boolean;
  ignorecase: boolean;
}
export class GitConfigContent {
  branch: IBranch[] = [];
  // tslint:disable-next-line: no-object-literal-type-assertion
  core: ICore = <ICore>{};
  remote: IRemote[] = [];
}

export namespace GitConfig {

  // tslint:disable: no-unsafe-any
  export function getConfig(dir: string): GitConfigContent {
    const p = getGitFile(dir);
    const content = p === undefined ? undefined : ini.parse(fs.readFileSync(p, 'utf-8'));

    // No config file. exit.
    if (content === undefined) {
      return undefined;
    }

    const branches = Object
      .keys(content)
      .filter(x => x.startsWith('branch'));

    const remotes = Object
      .keys(content)
      .filter(x => x.startsWith('remote'));

    const result = new GitConfigContent();
    // Branch
    result.branch = branches.map(x => {
      return {
        name: x
          .replace('branch', '')
          .replace('"', '')
          .trim(),
        merge: content[x]['merge'],
        remote: content[x]['remote']
      };
    });

    // Remote
    result.remote = remotes.map(x => {
      return {
        name: x
          .replace('name', '')
          .replace('"', '')
          .trim(),
        fetch: content[x]['fetch'],
        url: content[x]['url']
      };
    });

    // Core
    Object
      .keys(content.core)
      .map(x => {
        // tslint:disable-next-line: no-any
        (<any>result.core)[x] = content.core[x];
      });

    return result;
  }

  export function getGitFile(dir: string): string {
    const folder = path.resolve(dir, '.git', 'config');
    if (fs.existsSync(folder)) {
      return folder;
    } else {
      return undefined;
    }
  }

}
