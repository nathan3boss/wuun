// Dependencies
import { yellow, white, gray, green, red } from 'kleur';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import moment from 'moment';

export class Wuun {
  private source: string;

  constructor(source?: string) {
    this.source = source + '/' || './';
  }

  rainlog(type: 'warning' | 'success' | 'message' | 'error', message: string, data?: any) {
    const date = moment().format('hh:mm:ss');

    const onData = data ? (typeof data == 'object' ? JSON.stringify(data) : data.toString()) : '';

    const content = `- ${message} ${data ? ': ' + onData : ''}`;

    const log = `[${type.toLocaleUpperCase()}] ${date} ${content}`;

    this.registerRain(log);

    switch (type) {
      case 'warning':
        console.log(yellow(`${white('[')}${type.toLocaleUpperCase()}${white(']')} ${gray(date)} ${white(content)}`));

        break;

      case 'success':
        console.log(green(`${white('[')}${type.toLocaleUpperCase()}${white(']')} ${gray(date)} ${white(content)}`));

        break;
      case 'error':
        console.log(red(`${white('[')}${type.toLocaleUpperCase()}${white(']')} ${gray(date)} ${white(content)}`));

        break;
      case 'message':
        console.log(white(`${white('[')}${type.toLocaleUpperCase()}${white(']')} ${gray(date)} ${white(content)}`));

        break;
      default:
        console.log(white(`${white('[')}${(type as any).toLocaleUpperCase()}${white(']')} ${gray(date)} ${white(content)}`));

        break;
    }
  }

  private registerRain(log: string) {
    const path = this.source + 'wuun.log';

    if (!existsSync(this.source)) {
      mkdirSync(this.source);
    }

    try {
      const t = readFileSync(path, {
        encoding: 'utf8',
        flag: 'r',
      });

      writeFileSync(path, this.validateFileContent(t) ? t + '\n' + log : log);
    } catch (error) {
      writeFileSync(path, log);
    }
  }

  private validateFileContent = (data: string) => {
    let validation = '';

    Array.from(data).map((d) => d != '' && d != '\n' && (validation += d));

    return validation == '' ? false : true;
  };
}
