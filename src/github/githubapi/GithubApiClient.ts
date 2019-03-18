
// tslint:disable: no-submodule-imports
import { BasicCredentialHandler } from 'typed-rest-client/Handlers';
import { HttpClient } from 'typed-rest-client/HttpClient';
import { IHttpClientResponse } from 'typed-rest-client/Interfaces';
// tslint:disable-next-line: import-name
import routesJson from '../../assets/git-routes.json';
import { RepositoryDescriptor } from './GithubApiClasses.js';
import { IRepository } from './GithubApiInterface.js';

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

  async getOwnRepository(repositoryName: string): Promise<IRepository> {
    try {
      const url = this.prepareUrl(
        routesJson.repos.get.url,
        {
          owner: this.username,
          repo: repositoryName
        }
      );

      const result = await this.getResponse<IRepository>(url);

      return result.data;
      // ReposApiMethods.get
    } catch (error) {
      throw error;
    }
  }

  async ownRepositoryExists(repositoryName: string): Promise<boolean> {
    const repo = await this.getOwnRepository(repositoryName);

    return repo.name === repositoryName;
  }

  async createRepository(repo: RepositoryDescriptor): Promise<IHttpClientResponse> {
    const url = this.prepareUrl(routesJson.repos.createForAuthenticatedUser.url);

    return this.post(url, repo);
  }

  async repositoryExists(username: string, repositoryName: string): Promise<boolean> {
    const client = new HttpClient('dotup/1.0.0');
    const request = await client.get(this.getRepositoryUrl(repositoryName));

    return request.message.statusCode !== 404;
  }

  getRepositoryUrl(repositoryName: string): string {
    if (repositoryName === undefined) {
      throw new Error('Missing repository name');
    }

    return `https://github.com/${this.username}/${repositoryName}`;
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
    return `${this.getRepositoryUrl(repositoryName)}.git`;
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

  private async post<T>(url: string, data: T): Promise<IHttpClientResponse> {
    const client = this.getGitClient();

    return client.post(url, JSON.stringify(data));
  }

}
