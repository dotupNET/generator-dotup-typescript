"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const BaseGenerator_1 = require("../BaseGenerator");
const GitGenerator_1 = require("../git/GitGenerator");
var ProjectQuestions;
(function (ProjectQuestions) {
    ProjectQuestions["projectType"] = "projectType";
    ProjectQuestions["projectName"] = "projectName";
    ProjectQuestions["useGit"] = "useGit";
    ProjectQuestions["createFolder"] = "createFolder";
})(ProjectQuestions = exports.ProjectQuestions || (exports.ProjectQuestions = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["app"] = 0] = "app";
    ProjectType[ProjectType["library"] = 1] = "library";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
// export default!!
// tslint:disable-next-line: no-default-export
class ProjectGenerator extends BaseGenerator_1.BaseGenerator {
    constructor(args, options) {
        super(args, options);
        super.registerMethod(this, 'prompting');
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'debug') {
            this.appname = 'tmp';
            // tslint:disable-next-line: newline-per-chained-call
            if (path.basename(this.destinationPath().toLowerCase()) !== 'tmp') {
                this.destinationRoot(path.join(this.destinationPath(), 'tmp'));
            }
        }
        this.writeOptionsToAnswers(ProjectQuestions);
    }
    async initializing() {
        this.logYellow(`Project path: '${this.destinationPath()}'`);
        this.questions[ProjectQuestions.projectType] = {
            type: BaseGenerator_1.InquirerQuestionType.list,
            message: 'Project Type',
            store: true,
            nextQuestion: ProjectQuestions.projectName,
            choices: [
                {
                    name: ProjectType[ProjectType.library],
                    value: ProjectType.library
                },
                {
                    name: ProjectType[ProjectType.app],
                    value: ProjectType.app
                }
            ]
        };
        this.questions[ProjectQuestions.projectName] = {
            type: BaseGenerator_1.InquirerQuestionType.input,
            message: 'Project Name',
            // tslint:disable-next-line: no-unsafe-any
            default: this.getDefaultProjectName(this.options.projectName),
            validate: (v) => this.validateString(v),
            nextQuestion: ProjectQuestions.createFolder
        };
        this.questions[ProjectQuestions.createFolder] = {
            type: BaseGenerator_1.InquirerQuestionType.confirm,
            message: () => `Create folder '${this.answers.projectName}' ?`,
            default: 'y',
            when: () => !this.destinationIsProjectFolder(this.answers.projectName),
            nextQuestion: ProjectQuestions.useGit
        };
        this.questions[ProjectQuestions.useGit] = {
            type: BaseGenerator_1.InquirerQuestionType.confirm,
            message: 'Configure git?',
            default: this.options.useGit
        };
        this.currentStep = ProjectQuestions.projectType;
    }
    async prompting() {
        await super.prompting();
        if (this.answers.useGit) {
            // Load git generator
            this.composeWith({
                Generator: GitGenerator_1.GitGenerator,
                path: require.resolve('../git/index')
            }, {
                [GitGenerator_1.GitQuestions.rootPath]: this.destinationPath(),
                [GitGenerator_1.GitQuestions.repositoryName]: this.answers.projectName
            });
        }
    }
    async configuring() {
        // this.git = new GitTools(this.answers.username, this.answers.repositoryName);
        this.log('Method configuring.');
    }
    // tslint:disable-next-line: no-reserved-keywords
    async default() {
        this.log('Method default.');
    }
    async writing() {
        this.log('Method writing.');
    }
    async conflicts() {
        this.log('Method conflicts.');
    }
    async install() {
        this.log('Method isntall.');
    }
    async end() {
        this.log('Method end.');
    }
}
exports.default = ProjectGenerator;
//# sourceMappingURL=index.js.map