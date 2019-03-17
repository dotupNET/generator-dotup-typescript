import { ProjectInfo } from './ProjectInfo';
import { TemplateFiles } from './TemplateFiles';

// export class TemplateGroup {
//   typ: TemplateGroupType;
//   templateFiles: TemplateFiles[];
// }

export class ProjectFiles {
  project: ProjectInfo;
  templateFiles: TemplateFiles[] = [];
  // templates: TemplateGroup[];
}
