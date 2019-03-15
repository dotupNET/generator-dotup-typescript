
// tslint:disable: no-submodule-imports
import { BasicCredentialHandler } from 'typed-rest-client/Handlers';
import { HttpClient } from 'typed-rest-client/HttpClient';
import { IRepository } from './GithubApiInterface.js';
import routesJson from './routes.json';

export interface IDocumentationLink {
  documentation_url: string;
  message: string;
}

export class RestResponse<T> {
  data: T;
  error?: Error;
  message?: IDocumentationLink;
}

declare interface IObjectKey {
  // tslint:disable-next-line: no-any
  [key: string]: any;
}

// tslint:disable-next-line: no-empty-interface

export class GithubApiClient {

  apiUrl: string = 'https://api.github.com/';
  username: string;
  password: string;

  constructor(username?: string, password?: string) {
    this.username = username;
    this.password = password;
  }

  private getGitClient(): HttpClient {
    let client: HttpClient;

    if (this.username === undefined) {
      client = new HttpClient('dotup-ts-github-api/1.0.0');
    } else {
      const bh = new BasicCredentialHandler(this.username, this.password);
      client = new HttpClient('dotup-ts-github-api/1.0.0', [bh]);
    }

    return client;
  }

  private async getResponse<T>(url: string): Promise<RestResponse<T>> {
    const client = this.getGitClient();
    const response = await client.get(url);
    const body = await response.readBody();
    const data = <IDocumentationLink>JSON.parse(body);

    const result = new RestResponse<T>();
    if (data.message && data.documentation_url) {
      result.message = data;
      // tslint:disable-next-line: no-object-literal-type-assertion
      result.data = <T>{};
    } else {
      // tslint:disable-next-line: no-any
      result.data = <any>data;
    }

    return result;
  }

  async ownRepositoryExists(repositoryName: string): Promise<boolean> {
    try {
      const url = this.prepareUrl(
        routesJson.repos.get.url,
        {
          owner: this.username,
          repo: repositoryName
        }
      );

      const result = await this.getResponse<IRepository>(url);

      return result.data.name === repositoryName;
      // ReposApiMethods.get
    } catch (error) {
      throw error;
    }
  }

  prepareUrl(url: string, urlReplacement?: IObjectKey): string {
    let fullUrl = url;

    if (urlReplacement !== undefined) {
      const pops = Object.keys(urlReplacement);
      pops.forEach(key => {
        const ereg = new RegExp(`:\\b${key}\\b`, 'g');
        // tslint:disable-next-line: no-unsafe-any
        fullUrl = fullUrl.replace(ereg, urlReplacement[key]);
      });
    }

    return this.getApiUrl() + fullUrl;
  }

  async repositoryExists(username: string, repositoryName: string): Promise<boolean> {
    // this.git = new GitTools(this.answers.username, this.answers.repositoryName);
    const client = new HttpClient('dotup/1.0.0');
    const request = await client.get(this.getRepositoryUrl(username, repositoryName));

    return request.message.statusCode !== 404;
  }

  // getApi(url: string): string {
  //   const key = 'username';
  //   const ereg = new RegExp(`.+\\b:${key}\\b`, 'g');

  //   return url.replace(ereg, key);
  // }

  // async userExists(username: string): Promise<boolean> {
  //   // this.git = new GitTools(this.answers.userna  me, this.answers.repositoryName);
  //   try {
  //     const api = this.getGitClient();
  //     const response = await api.usersUsernameGet(username);
  //     const userInfo = response.body;

  //     return userInfo.name !== undefined;
  //   } catch (error) {
  //     throw error;
  //   }

  //   return false;
  // }

  getRepositoryUrl(username: string, repositoryName: string): string {
    if (username === undefined) {
      throw new Error('Missing github username');
    }
    if (repositoryName === undefined) {
      throw new Error('Missing repository name');
    }

    return `https://github.com/${username}/${repositoryName}`;
  }

  getApiUrl(username?: string, repositoryName: string = ''): string {
    if (username === undefined) {
      return `https://api.github.com`;
    } else if (repositoryName === '') {
      return `https://api.github.com/users/${username}`;
    } else {
      return `https://api.github.com/${username}/${repositoryName}`;
    }
  }

  getGitUrl(username: string, repositoryName: string): string {
    return `${this.getRepositoryUrl(username, repositoryName)}.git`;
  }

}
