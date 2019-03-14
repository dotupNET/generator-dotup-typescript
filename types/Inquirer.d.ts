import { Answers } from 'yeoman-generator';
import { ChoiceType } from 'inquirer';

export declare namespace inquirer {
  enum InquirerQuestionType {
    input = 'input',
    number = 'number',
    confirm = 'confirm',
    list = 'list',
    rawlist = 'rawlist',
    password = 'password'
  }

  interface Question<T = Answers> {
    /**
     * Type of the prompt.
     * Possible values:
     * <ul>
     *      <li>input</li>
   *      <li>number</li>
     *      <li>confirm</li>
     *      <li>list</li>
     *      <li>rawlist</li>
     *      <li>password</li>
     * </ul>
     * @defaults: 'input'
     */
    type?: InquirerQuestionType;
    /**
     * The name to use when storing the answer in the anwers hash.
     */
    name?: string;
    /**
     * The question to print. If defined as a function,
     * the first parameter will be the current inquirer session answers.
     */
    message?: string | ((answers: T) => string);
    /**
     * Default value(s) to use if nothing is entered, or a function that returns the default value(s).
     * If defined as a function, the first parameter will be the current inquirer session answers.
     */
    default?: any | ((answers: T) => any) | ((answers: T) => Promise<any>);
    /**
     * Choices array or a function returning a choices array. If defined as a function,
     * the first parameter will be the current inquirer session answers.
     * Array values can be simple strings, or objects containing a name (to display) and a value properties
     * (to save in the answers hash). Values can also be a Separator.
     */
    choices?:
    | ReadonlyArray<ChoiceType>
    | ((answers: T) => ReadonlyArray<ChoiceType>)
    | ((answers: T) => Promise<ReadonlyArray<ChoiceType>>);
    /**
     * Receive the user input and should return true if the value is valid, and an error message (String)
     * otherwise. If false is returned, a default error message is provided.
     */
    validate?(input: any, answers?: T): boolean | string | Promise<boolean | string>;
    /**
     * Receive the user input and return the filtered value to be used inside the program.
     * The value returned will be added to the Answers hash.
     */
    filter?(input: string): any;
    /**
     * Receive the user input and return the transformed value to be displayed to the user. The
     * transformation only impacts what is shown while editing. It does not impact the answers
     * hash.
     */
    transformer?(input: string): string;
    /**
     * Receive the current user answers hash and should return true or false depending on whether or
     * not this question should be asked. The value can also be a simple boolean.
     */
    when?: boolean | ((answers: T) => boolean) | ((answers: T) => Promise<boolean>);
    paginated?: boolean;
    /**
     * Change the number of lines that will be rendered when using list, rawList, expand or checkbox.
     */
    pageSize?: number;
    /**
     * Add a mask when password will entered
     */
    mask?: string;
    /**
     * Change the default prefix message.
     */
    prefix?: string;
    /**
     * Change the default suffix message.
     */
    suffix?: string;
  }

}
