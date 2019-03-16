// tslint:disable
import * as _ from 'lodash';
import routesJson from './routes.json';

export class GithubApiJsonParser {
  categoryDescriptors: any[];
  parameterNames: string[] = [];

  parse(): void {
    const json: any = routesJson;
    const namespaces = Object.keys(routesJson);

    const result: any = namespaces.map(x => {
      return {
        name: x,
        methods: Object.keys((<any>routesJson)[x])
      };
    });

    result.forEach((n: any) => {
      if (n === undefined) {
        console.log(n);
      } else {
        n.methods.forEach((m: any, idx: number) => {
          n.methods[idx] = this.getMethodInfo(m, json[n.name][m]);
        });

      }
    })

    this.categoryDescriptors = result;
  }

  getMethodInfo(name: string, method: any): any {
    return {
      name: name,
      httpMethod: method.method,
      url: method.url,
      params: Object.keys(method.params).map(p => this.getParamInfo(p, method.params[p], method))
    };
  }

  getParamInfo(name: string, param: any, method: any): any {
    if (!(name.includes('[]') || name.includes('.'))) {
      // it's a object or array
      // let cleanName = name.replace('[]', '_');
      // cleanName = cleanName.replace('.', '__');

      if (!this.parameterNames.some(x => x === name)) {
        this.parameterNames.push(name);
      }
    }

    return {
      name: name,
      required: param.required,
      typ: param.type,
      isMethodParameter: method.url.includes(name)
    };
  }

  getUrlParameterNames(method: any): string[] {
    const cat = this.categoryDescriptors.find(x => x.name === method);
    const url: string = cat.url;

    return this.parameterNames.filter(name => {
      return url.includes(`:${name}`);
    });
  }

  generateGithubApiCategoriesEnum() {
    const enumTemplate = `#enum ='#enum'`;
    const template = `export enum GithubApiCategories{
      #enums
    }`
    const names = this.categoryDescriptors.map(m => m.name);
    const enums = names.map(value => enumTemplate.replace(/#\enum\b/g, value));
    return template.replace(/#\enums\b/, enums.join(',\n'));
  }

  generateMethodNameEnum(category: any) {
    const enumTemplate = `#enum ='#enum'`;
    let template = `export enum #categoryApiMethods{
      #enums
    }`
    template = template.replace(/#category/, _.upperFirst(category));

    const cat = this.categoryDescriptors.find(x => x.name === category);

    const names = cat.methods.map((m: any) => m.name);
    const enums = names.map((value: any) => enumTemplate.replace(/#\enum\b/g, value));
    return template.replace(/#\enums\b/, enums.join(',\n'));
  }

  generateParameterNameEnum() {
    const enumTemplate = `#enum ='#enum'`;
    let template = `export enum GithubApiParameter{
      #enums
    }`

    const enums = this.parameterNames.map((value: any) => enumTemplate.replace(/#\enum\b/g, value));
    return template.replace(/#\enums\b/, enums.join(',\n'));
  }

  generateInterface(category: any) {
    let interfaceTemplate = `export interface #categoryApi{
      #methods
    }`
    interfaceTemplate = interfaceTemplate.replace(/#category/, _.upperFirst(category));

    const cat = this.categoryDescriptors.find(x => x.name === category);

    const enums = cat.methods.map((value: any) => this.createMethodCall(value));
    return interfaceTemplate.replace(/#\methods\b/, enums.join('\n'));
  }

  createMethodCall(m: any): any {
    const methodTemplate = m.httpMethod.toUpperCase === 'GET' ? `#name (#args): Promise<any>;` : `#name (#args): Promise<void>;`;

    const segments = m.url.split('/');
    let methodParamNames = segments.filter((x: any) => x.startsWith(':'));
    methodParamNames = methodParamNames.map((name: any) => name.replace(':', ''));
    const methodParams = methodParamNames.map((paramName: any) => {
      const p = m.params.find((p: any) => p.name === paramName);
      if (p === undefined) {
        return {
          name: paramName.replace('.', '_').replace(':', '_'),
          typ: 'unknown'
        };
      } else {
        return p;
      }
    });

    // const methodTemplate = `function #name (#args){
    const argsArray = methodParams.map((p: any) => {
      if (p === undefined) {
        console.log(m);
        return undefined;
      }
      if (p.required && p.required === 'true') {
        return `${p.name}: ${p.typ}`;
      } else {
        return `${p.name}?: ${p.typ}`;
      }

    });

    let args = argsArray === undefined ? '' : argsArray.join(',');
    args = args.replace(/\binteger\b/g, 'number');
    let result = methodTemplate;
    result = result.replace(/#\bname\b/, m.name);
    result = result.replace(/#\bargs\b/, args);
    return result;
  }

}
  // const ns = `
  // export namespace #ns {
  // }
  // `;
  // export namespace df {
  //   export namespace dfd {
  //     export const url = '';
  //   }
  // }
  // async function test() {
  //   const api = new GithubApi();
  //   const ja = await api.userExists('dotupNET');
  //   console.log(`existiert: ${ja}`);
  // }

  // const namespaces = Object.keys(routesJson);
  // console.log(namespaces);
  // const result: any = namespaces.map(x => {
  //   return {
  //     name: x,
  //     methods: Object.keys((<any>routesJson)[x])
  //   };
  // });
  // const json: any = routesJson;

  // result.forEach((n: any) => {
  //   // const namesp: any = result[n];
  //   if (n === undefined) {
  //     console.log(n);
  //   } else {
  //     n.methods.forEach((m: any, idx: number) => {
  //       n.methods[idx] = getMethodInfo(m, json[n.name][m]);
  //     });

  //   }
  // })

  // const methodTemplate = `function #name (#args){

  // };`;

  // const emojis = result[1];
  // const functions = emojis.methods.map((m: any) => {
  //   const argsArray = m.params.map((p: any) => {
  //     if (p.required && p.required === 'true') {
  //       return `${p.name}: ${p.typ}`;
  //     } else {
  //       return `${p.name}?: ${p.typ}`;
  //     }

  //   });

  //   let args = argsArray === undefined ? '' : argsArray.join(',');
  //   args = args.replace(/\binteger\b/, 'number');
  //   let result = methodTemplate;
  //   result = result.replace(/#\bname\b/, m.name);
  //   result = result.replace(/#\bargs\b/, args);
  //   return result;
  // })
  // console.log(result);
