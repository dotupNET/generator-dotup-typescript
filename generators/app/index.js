"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = require("../BaseGenerator");
const GitQuestions_1 = require("../git/GitQuestions");
// export default!!
class GitGenerator extends BaseGenerator_1.BaseGenerator {
    constructor(args, options) {
        super(args, options);
    }
    async initializing() {
        this.questions = {};
        this.answers = {};
        this.questions[GitQuestions_1.GitQuestions.username] = {
            // name: GitQuestions.username,
            type: 'input',
            message: 'Enter your github user name',
            default: this.options.username,
            store: true,
            nextQuestion: GitQuestions_1.GitQuestions.repositoryName //,
            // validate: this.validate
            // when: (answer: Answers) => { return true; }
        };
        this.questions[GitQuestions_1.GitQuestions.repositoryName] = {
            // name: GitQuestions.username,
            type: 'input',
            message: 'Enter repository name',
            default: this.options.repositoryName,
            store: true //,
            // validate: this.validate
            // when: (answer: Answers) => { return true; }
        };
        this.currentStep = GitQuestions_1.GitQuestions.username;
    }
    async prompting() {
        let done = false;
        do {
            this.questions[this.currentStep].name = this.currentStep;
            const answer = await this.prompt(this.questions[this.currentStep]);
            this.answers[this.currentStep] = answer[this.currentStep];
            this.currentStep = this.questions[this.currentStep].nextQuestion;
            // switch (this.currentStep) {
            //   case GitQuestions.username:
            //     this.currentStep = GitQuestions.repositoryName;
            //     break;
            //   case GitQuestions.repositoryName:
            //     this.answers[this.currentStep] = answer['value'];
            //     break;
            // }
        } while (this.currentStep !== undefined);
        console.log(this.answers);
    }
    async configuring() {
        // this.git = new GitTools(this.answers.username, this.answers.repositoryName);
        this.log('Method not implemented.');
    }
    async default() {
        this.log('Method not implemented.');
    }
    async writing() {
        this.log('Method not implemented.');
    }
    async conflicts() {
        this.log('Method not implemented.');
    }
    async install() {
        this.log('Method not implemented.');
    }
    async end() {
        this.log('Method not implemented.');
    }
}
exports.default = GitGenerator;
//# sourceMappingURL=index.js.map