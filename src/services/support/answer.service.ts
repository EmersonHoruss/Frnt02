import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  _answer = {
    yes: false,
    no: false,
    ok: false,
  };

  constructor() {}

  _getAnswer() {
    return this._answer;
  }

  _setAnswer(_answer: any) {
    return _answer === 'yes'
      ? (this._answer.yes = true)
      : _answer === 'no'
      ? (this._answer.no = true)
      : _answer === 'ok'
      ? (this._answer.ok = true)
      : null;
  }

  _resetAnswer() {
    this._answer = {
      yes: false,
      no: false,
      ok: false,
    };
  }

  _detectChanges() {
    return this._answer.yes === true ? true : this._answer.no === true
  }
}
