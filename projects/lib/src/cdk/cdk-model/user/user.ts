import { Library, Simple, Token } from '@lernender/core';

export class User extends Simple {
  public group: Simple;
  public token: Token;

  /**
   * constructor()
   */
  constructor();

  constructor(options: object);
  constructor(options?: any) {
    super(options);
    this.token = new Token(Library.init(options, 'token'));
  }
}
