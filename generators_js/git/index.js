'use strict';
const Generator = require('yeoman-generator');
// const originUrl = require('git-remote-origin-url');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });

    this.option('repositoryName', {
      type: String,
      required: true,
      desc: 'Name of the GitHub repository'
    });

    this.option('destinationRoot', {
      type: String,
      required: true,
      desc: 'Destination path'
    });

  }

  initializing() {
    this.props = {};
    if (this.options.destinationRoot) {
      this._destinationRoot = this.options.destinationRoot;
    }
    if (this.options.githubAccount) {
      this.props.githubAccount = this.options.githubAccount;
    }
    if (this.options.destinationRoot) {
      this.props.repositoryName = this.options.repositoryName;
    }
  }

  async prompting() {
    // Initialize default values

    const prompts = [
      {
        type: String,
        name: 'githubAccount',
        required: true,
        defaults: this.props.githubAccount,
        desc: 'GitHub username or organization'
      },
      {
        type: String,
        name: 'repositoryName',
        required: true,
        defaults: this.props.repositoryName,
        desc: 'Name of the GitHub repository'
      }
    ];

    this.props = await this.prompt(prompts);
  }

  async default() {
    if (this.props.githubAccount && this.props.githubAccount.length > 0) {
      this.props.originUrl = `https://github.com/${this.props.githubAccount}/${this.props.repositoryName}.git`;
    }
  }

  _readPkg() {
    return this.fs.readJSON(
      this.destinationPath('package.json'),
      {}
    );
  }

  writing() {
    const pkg = this._readPkg();

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    let pkgRepository;
    if (this.props.originUrl) {
      pkgRepository = this.props.originUrl;
    } else if (this.props.githubAccount && this.props.repositoryName) {
      pkgRepository = this.props.githubAccount + '/' + this.props.repositoryName;
    }

    pkg.repository = pkgRepository;

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      pkg
    );
  }

  end() {
    const pkg = this._readPkg();

    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath()
    });

    if (this.props.originUrl && this.props.originUrl.length > 0) {
      this.spawnCommandSync('git', ['remote', 'add', 'origin', this.props.originUrl], {
        cwd: this.destinationPath()
      });
    }
  }
};