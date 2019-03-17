import { ProjectInfo } from './ProjectInfo';
import { TemplateFileInfo } from './TemplateFileInfo';

// export class TemplateGroup {
//   typ: TemplateGroupType;
//   templateFiles: TemplateFiles[];
// }

export class ProjectFiles {
  readonly project: ProjectInfo;
  templateFiles: TemplateFileInfo[] = [];
  // templates: TemplateGroup[];

  constructor(project: ProjectInfo) {
    this.project = project;
  }
}
