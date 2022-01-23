<h3 align="center"> Wuun ☁</h3>
<p align="center">A simple node console and file logger.</p>


#### 👻 Install
```shell
npm install wuun
```
#### 🤖 Configure

Create a configuration file to call the logger 

```javascript
// logger/index.ts
import { Wuun } from 'wuun';

const wuun = new Wuun(__dirname + '/logs');

export default (log: any, message: string, data?: object) => wuun.rainlog(log, message, data);
```
#### 👾 Usage

```javascript
// folder/index.ts
import logger from '../logger/index.ts';

const error = { message: 'user not found' };

logger('message', 'one message in log');
logger('error', 'error in user', error);
logger('success', 'validation of data from user');
logger('warning', 'password from user not is strong');

```
<img src="https://github.com/spikeboss/wuun/blob/master/.github/wuun.png?raw=true" width="600px" />
