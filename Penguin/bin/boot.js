const package_configFn = (name = 'Penguin-Koa', dependencies = {}) => {
    return {
        "name": name,
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "dependencies": dependencies,
        "devDependencies": {},
        "scripts": {
            "start": "node index.js"
        },
        "keywords": [
            "Penguin",
            "Koa"
        ],
        "author": "",
        "license": "ISC",
        "engines": {
            "node": "10.15.x",
            "npm": "6.4.x"
        }
    };
};
const cors_configFn = () => {
    return {
        deps: [
            `const cors = require('koa-cors');`,
        ],
        init: [],
        uses: [
            `app.use(cors({
    origin: () => {
        return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));`
        ],
    }
}
const bodyparser_configFn = () => {
    return {
        deps: [
            `const bodyParser = require('koa-bodyparser');`,
        ],
        init: [],
        uses: [
            `app.use(bodyParser());`
        ],
    }
}
const fileupload_configFn = () => {
    return {
        deps: [
            `const koaBody = require('koa-body');`,
        ],
        init: [],
        uses: [
            `
app.use(koaBody({
    multipart: true,                    // allow mutiple files
    urlencoded: true,                   // allow encoded content
    formidable:{
        uploadDir: './public/upload',   // upload dir
        maxFileSies: 20 * 1024 * 1024,  // MAX 20MB
    }
}));`
        ],
    }
}
const router_configFn = () => {
    return {
        deps: [],
        init: [`const router = require('./app/router');`],
        uses: [
            `app
.use(router.routes())
.use(router.allowedMethods());`
        ],
    }
}
const entry_configFn = (port = '3000', dependencies = {}) => {
    const base_use =
        `
app.use(async ctx => {
    ctx.body = 'Hello World';
});`;
    const entry_config = {
        deps: [
            `const path = require('path');\n
const Koa = require('koa');
const static=require('koa-static');`,
        ],
        init: [
            `const staticPath=path.join(__dirname,'public','dist');\n
const app = new Koa();
app.keys = ['Penguin-${new Date().getTime()}-Koa']`,
        ],
        uses: [
            `app.use(static(staticPath));\n`
        ],
        port: [
            `const port = ${port};
app.listen(port);
console.log('app started at port ' + port + '...');`
        ]
    }
    if (!dependencies['koa-router']) {
        entry_config.uses.push(base_use);
    } else {
        entry_config.deps.push(...router_configFn().deps);
        entry_config.init.push(...router_configFn().init);
        entry_config.uses.push(...router_configFn().uses);
    }
    if (dependencies['koa-cors']) {
        entry_config.deps.push(...cors_configFn().deps);
        entry_config.init.push(...cors_configFn().init);
        entry_config.uses.push(...cors_configFn().uses);
    }
    if (dependencies['koa-bodyparser']) {
        entry_config.deps.push(...bodyparser_configFn().deps);
        entry_config.init.push(...bodyparser_configFn().init);
        entry_config.uses.push(...bodyparser_configFn().uses);
    }
    if (dependencies['koa-body']) {
        entry_config.deps.push(...fileupload_configFn().deps);
        entry_config.init.push(...fileupload_configFn().init);
        entry_config.uses.push(...fileupload_configFn().uses);
    }
    return entry_config;
};
const router_entry_configFn = () => {
    const router_entry_config = {
        deps: [
            `const Router = require('koa-router');`,
            `const HelloController = require('./controller/HelloPenguin');`
        ],
        init: [
            `const router = new Router({
    prefix: '/api/v1'
});`,
        ],
        uses: [
            `router.get('/', HelloController.Penguin);`,
        ],
        exportModule: [
            `module.exports = router;`
        ]
    };
    return router_entry_config;
}
const router_folder_configFn = () => {
    const router_controller_config = {
        'HelloPenguin': {
            type: 'js',
            content:
                `const Penguin = async (ctx, next) => {
    ctx.body = 'Hello Penguin!';
    await next();
}

module.exports = {
    Penguin,
}`,
        },
    };
    const router_folder_config = {
        'controller': {
            type: 'dir',
            children: router_controller_config,
        },
        'router': {
            type: 'js',
            content: '',
        },
    };
    const router_entry_config = router_entry_configFn();
    router_folder_config.router.content = Object.values(router_entry_config).map((el, i) => {
        return '\/* ' + Object.keys(router_entry_config)[i] + ' module *\/\n\n' + el.join('\n');
    }).join('\n\n\n');

    return router_folder_config;
}
const public_configFn = (name) => {
    const index_html_content =
        `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="white"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <title>${name}</title>
</head>

<body>
    <h1>Hi, ${name} by Penguin Cli</h1>
</body>

</html>
    `;
    const public_config = {
        'dist': {
            type: 'dir',
            children: {
                'index': {
                    type: 'html',
                    content: index_html_content,
                }
            },
        },
    };
    return public_config;
}
const fileupload_folder_configFn = () => {
    const public_config = {
        'upload': {
            type: 'dir',
            children: {
                'README': {
                    type: 'md',
                    content: `# this is uploaded folder`,
                }
            },
        },
    };
    return public_config;
}
const folder_configFn = (name, port, dependencies) => {
    const folder_config = {
        'app': {
            type: 'dir',
            children: {},
        },
        'public': {
            type: 'dir',
            children: {},
        },
        'index': {
            type: 'js',
            content: '',
        },
        'package': {
            type: 'json',
            content: '',
        },
    };
    const entry_config = entry_configFn(port, dependencies);
    folder_config.index.content = Object.values(entry_config).map((el, i) => {
        return '\/* ' + Object.keys(entry_config)[i] + ' module *\/\n\n' + el.join('\n');
    }).join('\n\n\n');
    const package_config = package_configFn(name, dependencies);
    folder_config.package.content = JSON.stringify(package_config);

    if (dependencies['koa-router']) {
        const router_folder_config = router_folder_configFn();
        let childrenObj = folder_config.app.children;
        childrenObj = Object.assign(childrenObj, router_folder_config);
        folder_config.app.children = childrenObj;
    }

    let public_config = public_configFn(name);
    if (dependencies['koa-body']) {
        const fileupload_folder_config = fileupload_folder_configFn();
        public_config = Object.assign(public_config, fileupload_folder_config);
    }
    folder_config.public.children = public_config;

    return folder_config;
}

module.exports = folder_configFn;