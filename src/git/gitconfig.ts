import * as path from 'path';
import * as fs from 'fs';
import * as ini from 'ini';

export interface IBranch {
  name: string;
  merge: string;
  remote: string;
}

export interface IRemote {
  name: string;
  fetch: string;
  url: string
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
  core: ICore = <ICore>{};
  remote: IRemote[] = [];
}

export namespace GitConfig {

  export function getConfig(dir: string): GitConfigContent {
    const path = getGitFile(dir)
    const content = path === undefined ? undefined : ini.parse(fs.readFileSync(path, 'utf-8'));

    // No config file. exit.
    if (content === undefined) {
      return undefined;
    }

    const branches = Object.keys(content).filter(x => x.startsWith('branch'));
    const remotes = Object.keys(content).filter(x => x.startsWith('remote'));

    const result = new GitConfigContent();
    // Branch
    result.branch = branches.map(x => {
      return {
        name: x.replace('branch', '').replace('"', '').trim(),
        merge: content[x]['merge'],
        remote: content[x]['remote']
      }
    });

    // Remote
    result.remote = remotes.map(x => {
      return {
        name: x.replace('name', '').replace('"', '').trim(),
        fetch: content[x]['fetch'],
        url: content[x]['url']
      }
    });

    // Core
    Object.keys(content.core).map(x => {
      (<any>result.core)[x] = content.core[x]
    });

    return result;
  }

  export function getGitFile(dir: string): string {
    var folder = path.resolve(dir, '.git', 'config');
    if (fs.existsSync(folder)) {
      return folder;
    } else {
      return undefined;
    }

  }
}

const p = process.cwd();
const file = GitConfig.getConfig(p);
console.log(file);
export function getConfig(dir: string, options: any) {
  // findGit(dir, options, function (config) {
  //   if (!config) return cb(new Error('no gitconfig to be found at ' + dir))
  //   fs.readFile(config, function (err, data) {
  //     if (err) return cb(err);
  //     try {
  //       var formatted = format(ini.parse(data.toString()));
  //     } catch (e) {
  //       return cb(e);
  //     }
  //     cb(false, formatted);
  //   })
  // })
}

// function format(data) {
//   var out = {};
//   Object.keys(data).forEach(function (k) {
//     if (k.indexOf('"') > -1) {
//       var parts = k.split('"');
//       var parentKey = parts.shift().trim();
//       var childKey = parts.shift().trim();
//       if (!out[parentKey]) out[parentKey] = {};
//       out[parentKey][childKey] = data[k];
//     } else {
//       out[k] = merge(out[k], data[k])
//       // cant start using these without bumping the major
//       //out[k] = {...out[k], ...data[k]};
//     }
//   });
//   return out;
// }

// function findGit(dir, options, cb) {
//   var folder = path.resolve(dir, options.gitDir || process.env.GIT_DIR || '.git', 'config');
//   fs.exists(folder, function (exists) {
//     if (exists) return cb(folder);
//     if (dir === path.resolve(dir, '..')) return cb(false);
//     findGit(path.resolve(dir, '..'), options, cb);
//   });
// }

// function merge() {
//   var a = {}
//   for (var i = arguments.length; i >= 0; --i) {
//     Object.keys(arguments[i] || {}).forEach((k) => {
//       a[k] = arguments[i][k]
//     })
//   }
//   return a;
// }