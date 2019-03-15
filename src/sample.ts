// tslint:disable
import routesJson from './githubapi/routes.json';
import { GithubApiJsonParser } from './githubapi/GithubApiJsonParser';

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
