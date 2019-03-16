import { ProjectInfo } from '../app';

export enum TemplateType {
  copyOnly = '__copy__',
  merge = '__merge__',
  ejs = '__ejs__',
  projectTypeFolder = 'projectTypeFolder'
}

// export enum TemplateGroupType {
//   copyOnly = '__copy__',
//   ejs = '__ejs__'
// }

export class TemplateFileInfo{
  path: string;
  typ: TemplateType;
}

export class TemplateFiles {
  typ: TemplateType;
  files: string[] = [];
}

// export class TemplateGroup {
//   typ: TemplateGroupType;
//   templateFiles: TemplateFiles[];
// }

export class ProjectFiles {
  project: ProjectInfo;
  templateFiles: TemplateFiles[] = [];
  // templates: TemplateGroup[];
}
