// tslint:disable
import { GithubApiJsonParser } from './github/githubapi/GithubApiJsonParser';
import * as routesJson from './assets/git-routes.json'
import validate from 'validate-npm-package-name-typed';


let result: any;
async function githubApiSamples(): Promise<void> {
  // async function test() {
  //   const api = new GithubApi();
  //   const ja = await api.userExists('dotupNET');
  //   console.log(`existiert: ${ja}`);
  // }

  const json: any = routesJson;

  const parser = new GithubApiJsonParser();
  parser.parse();

  const x = parser.generateGithubApiCategoriesEnum();
  console.log(x);

  // async function testSwagger() {
  //   const api = new GithubApi();
  //   // api.header
  //   const result = await api.usersUsernameGet('dotupNET');
  //   console.log(result.body);
  // }

  // testSwagger().catch(x=>{
  //   console.log(x);
  // });

  // test()
  //   .then(_ => console.log('done'))
  //   .catch(e => console.log(e))
  //   ;
}


// npm install npm - conf
async function npmSamples() {
  const conf = require('npm-conf')();
  console.log(`${conf.get('init.author.name')} <${conf.get('init.author.email')}> (${conf.get('init.author.url')})`);
}

result = validate('my nice  package');
// npmSamples();

console.log(result);
