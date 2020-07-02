const stdin = process.stdin;
const stdout = process.stdout;
const fs = require('fs');
const path = require('path');

const cwd_path = process.cwd();
const entry_path = __dirname;

stdin.setEncoding('utf8');
stdout.setEncoding('utf8');

const appInfo = require('./package.json');
const version = appInfo.version;

const Request = require('bullettool').HttpRequest;
const folderInit = require('./bin/boot');

const args = process.argv;
const commands = [
    '-V, --version; get current version;',
    '-S, --simple [ProjectName]; fastly generate a simple Koa project without any modules;',
    '-A, --advance [ProjectName]; fastly generate a advance Koa project with Route and more modules;'
]
const params_config = [
    {
        value: 'name',
        asking: 'What your project Name is? default:${default}\n',
        desc: 'input the Name for your project. default:${default}\n',
        default: 'Penguin-Koa',
        regx: /\w/gi,
    },
    {
        value: 'port',
        asking: 'Which port number you want open? default:${default}\n',
        desc: 'input the port number for your project running. default:${default}\n',
        default: '8000',
        regx: /[0-9]/gi,
    },
    {
        value: 'route',
        asking: 'Do you want the Route module in Koa? Input [${chooses}],  default:${default}\n',
        desc: 'input the [${chooses}] to confirming if you need Routes. default:${default}\n',
        default: 'n',
        chooses: ['y', 'n'],
        regx: /y|n/gi,
    },
    {
        value: 'cors',
        asking: 'Do you want the CORS module in Koa? Input [${chooses}],  default:${default}\n',
        desc: 'input the [${chooses}] to confirming if you need CORS. default:${default}\n',
        default: 'n',
        chooses: ['y', 'n'],
        regx: /y|n/gi,
    },
    {
        value: 'bodyparser',
        asking: 'Do you want the Bodyparser module in Koa? Input [${chooses}],  default:${default}\n',
        desc: 'input the [${chooses}] to confirming if you need Bodyparser. default:${default}\n',
        default: 'n',
        chooses: ['y', 'n'],
        regx: /y|n/gi,
    },
    {
        value: 'fileupload',
        asking: 'Do you want the File-Upload module in Koa? Input [${chooses}],  default:${default}\n',
        desc: 'input the [${chooses}] to confirming if you need File-Upload. default:${default}\n',
        default: 'n',
        chooses: ['y', 'n'],
        regx: /y|n/gi,
    }
];

function Generation(param_values = {}) {
    this.param_values = Object.assign({ name: 'Penguin-Koa', port: '4004', route: false, cors: false, bodyparser: false, fileupload: false }, param_values);
}
Generation.prototype.checkingNpm = function (packageName) {
    const result = {};
    return new Promise((res, rej) => {
        if (packageName) {
            let url = 'https://registry.npmjs.org/' + packageName;
            new Request().request({
                url,
                dataType: 'json',
                type: 'get'
            }).then(resp => {
                if (resp && resp['name']) {
                    result[resp['name']] = '^' + resp['dist-tags']['latest'];
                    res(result);
                } else {
                    res(result);
                }
            }).catch(err => {
                console.error('checkingNpm got ERROR:\n\n' + err + '\n')
                res(result);
            })
        } else {
            res(result);
        }
    });
}
Generation.prototype.generateFile = function (path, content = '', encoding = 'utf8') {
    if (!path) { return false; }
    try {
        fs.writeFileSync(path, content, {
            encoding,
        });
        console.log(path + ' file generated success!');
        return true;
    } catch (err) {
        console.error('generateFile ' + path + ' got ERROR:\n' + err + '\n'); return false;
    }
}
Generation.prototype.generateFoler = function (path) {
    if (!path) { return false; }
    try {
        fs.mkdirSync(path);
        console.log(path + ' folder generated success!');
        return true;
    } catch (err) {
        console.error('generateFoler ' + path + ' got ERROR:\n' + err + '\n'); return false;
    }
}
Generation.prototype.generateObj = function (parentPath = './', folderObj = {}) {
    const folderKeys = Object.keys(folderObj);
    if (folderKeys.length === 0) { return false; }
    const initFolderConstruct = (k, v) => {
        if (v['type'] === 'dir') {
            this.generateFoler(path.join(parentPath, k));
        } else {
            this.generateFile(path.join(parentPath, k + (v['type'] ? ('.' + v['type']) : '')), v['content']);
        }
        if (v['children'] && Object.keys(v['children']).length > 0) {
            const prevFolder = path.join(parentPath, k);
            this.generateObj(prevFolder, v['children']);
        }
    }
    folderKeys.forEach(k => {
        const v = folderObj[k];
        initFolderConstruct(k, v);
    });
}
Generation.prototype.init = async function () {
    const koa = await this.checkingNpm('koa');
    const static = await this.checkingNpm('koa-static');
    let [cors, route, bodyparser, fileupload] = [{}, {}, {}, {}];
    if (this.param_values.cors) {
        cors = await this.checkingNpm('koa-cors');
    }
    if (this.param_values.route) {
        route = await this.checkingNpm('koa-router');
    }
    if (this.param_values.bodyparser) {
        bodyparser = await this.checkingNpm('koa-bodyparser');
    }
    if (this.param_values.fileupload) {
        fileupload = await this.checkingNpm('koa-body');
    }
    const deps = Object.assign({}, koa, static, cors, route, bodyparser, fileupload);
    const folderObj = folderInit(this.param_values.name, this.param_values.port, deps);
    const rootPath = path.join(cwd_path, this.param_values.name);
    const hasRoot = this.generateFoler(rootPath);
    if (hasRoot) {
        this.generateObj(rootPath, folderObj);
    }
    exit();
}

function QA() {
    this.sIndex = 0;
    this.params_value = { name: 'Penguin-Koa', port: '4004', route: false, cors: false, bodyparser: false };
}
QA.prototype.next = function () {
    if (this.sIndex > params_config.length - 1) {
        this.end();
    } else {
        const asking = params_config[this.sIndex].asking;
        print(asking);
    }
}
QA.prototype.get = function (data) {
    let value = data;
    value = value.replace(/\\r\\n/gi, '');
    value = value.toString().trim();
    const key = params_config[this.sIndex].value;
    const regx = params_config[this.sIndex].regx;
    const defaultVal = params_config[this.sIndex].default;
    if (value.length > 0) {
        if (regx.test(value)) {
            if (this.sIndex > 1) {
                value = value.toString().toLowerCase() === 'y';
            }
            this.params_value[key] = value;
            this.sIndex++;
        } else {
            print('wrong value, please input again.\n');
        }
    } else {
        value = defaultVal;
        if (this.sIndex > 1) {
            value = value.toString().toLowerCase() === 'y';
        }
        this.params_value[key] = value;
        this.sIndex++;
    }
    this.next();
}
QA.prototype.generateSimple = function (name = 'Penguin-Koa-Simple') {
    this.params_value = { name, port: '4004', route: false, cors: false, bodyparser: false, fileupload: false };
}
QA.prototype.generateAdvanced = function (name = 'Penguin-Koa-Advanced') {
    this.params_value = { name, port: '4004', route: true, cors: true, bodyparser: true, fileupload: true };
}
QA.prototype.end = function () {
    stdin.removeAllListeners();
    const gen = new Generation(this.params_value);
    gen.init();
}
const _qa = new QA();

function exit() {
    stdin.removeAllListeners();
    stdout.removeAllListeners();
    stdin.destroy();
    stdout.destroy();
}
function print(content) {
    if (!content) return false;
    return stdout.write(content, err => {
        if (err) {
            console.error('when printing\n\"' + content + '\", faced the ERROR:\n', err);
        }
    });
}
function cleanArgs(args = []) {
    let result = [];
    if (args.length > 0) {
        result = args.map(arg => {
            return arg.toString().trim();
        });
    }
    return result;
}
function commandsAdapter(command, args = []) {
    const argsCln = cleanArgs(args);
    switch (command) {
        case 0:
            print('current Penguin version: ' + version + '\n'); exit(); break;
        case 1:
            if (argsCln.length > 0) {
                const name = argsCln[0].toString().trim();
                print('generating please wait...:\n ');
                _qa.generateSimple(name);
                _qa.end();
            } else {
                print('must have Project Name below command with a space:\n\n ' + commands[1] + '\n'); exit();
            }
            break;
        case 2:
            if (argsCln.length > 0) {
                const name = argsCln[0].toString().trim();
                print('generating please wait...:\n ');
                _qa.generateAdvanced(name);
                _qa.end();
            } else {
                print('must have Project Name below command with a space:\n\n ' + commands[2] + '\n'); exit();
            }
            break;
        default:
            print('wrong command, there are all commands below:\n\n ' + commands.join('\n') + '\n'); exit(); break;
    }
}

function main(param = []) {
    if (param.length > 0) {
        // commands mode
        const cmd = param[0];
        const args = param.slice(1, param.length);
        if (cmd.indexOf('-') !== 0 || cmd.indexOf('--') !== 0) {
            commandsAdapter(-1);
        } else {
            commands.every((v, i) => {
                const res = v.split(';')[0].indexOf(cmd) === -1
                if (!res) {
                    commandsAdapter(i, args);
                }
                if (res && i === commands.length - 1) {
                    commandsAdapter(-1);
                }
                return res;
            });
        }
    } else {
        // chat mode
        params_config.forEach((params, i) => {
            const paramReg = /\$\{(.[^\}]+)\}/gi;
            const CReg = /\$\{|\}/gi;
            Object.keys(params).forEach(key => {
                let param = params[key] || '';
                const paramRegArr = param.toString().match(paramReg);
                if (paramRegArr && paramRegArr.length > 0) {
                    paramRegArr.forEach(attr => {
                        const k = attr.replace(CReg, '');
                        const v = params_config[i][k];
                        param = param.replace(attr, v);
                    });
                    params[key] = param;
                }
            })
        });
        _qa.next();
        stdin.addListener('data', (data) => {
            _qa.get(data);
        });
    }
}
process.addListener('beforeExit', (code) => {
    exit();
});
main(args.slice(2));