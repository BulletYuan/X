const templates = {
    component: [
        {
            name: 'p1',
            label: '正文标签1',
            html: `<p class="p1">正文标签1</p>`,
            style: `
                p.p1{
                    font-size:18px;
                    font-weight:bold;
                }
            `,
        },
        {
            name: 'p2',
            label: '正文标签2',
            html: `<p class="p2">正文标签2</p>`,
            style: `
                p.p2{
                    font-size:14px;
                }
            `,
        },
        {
            name: 'img1',
            label: '图像标签',
            html: `<img class="img"></p>`,
            style: `
                p.img{
                    width:320px;
                    height:320px;
                }
            `,
            attr: {
                alt: '图像标签',
            }
        }
    ],
    layout: [
        {
            name: 'flex',
            label: '弹性布局',
            html: `gfdsgfds`,
            style: `
                body{
                    display:flex;
                    flex-wrap:true;
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                    background-color:#fff;
                }

                .component-template{
                    cursor:pointer;
                }

                .layout-template:hover,
                .component-template:hover{
                    border:2px #599eff solid;
                    background:rgba(0,177,255,.14);
                }
            `,
        },
        {
            name: 'colum',
            label: '列布局',
            html: ``,
            style: `
                body{
                    display:block;
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
            `,
        },
    ],
};

const workDom = document.querySelector('article.work-container');
const listDom = document.querySelector('aside.left>ul.list');

const workIframe = workDom.querySelector('iframe');
let workIframeDom, workIframeCtx;

let [_TemplateTabSelected, _LayoutSelected, _ComponentSelected] = [0, 0, 0];

// changed iframe page title
function titleChanged(el) {
    if (!workIframeDom || !workIframeCtx) return;
    workIframeDom.title = el.value;
    refreshWorkIframe();
}

function dragStart(ev) {
    console.log('dragStart', ev);
    ev.dataTransfer.setData('element', ev.currentTarget)
}
function dragEnd(ev) {
    console.log('dragEnd', ev);
}
function draging(ev) {
    // console.log('draging', ev);
}
function dropDown(ev) {
    ev.preventDefault();
    console.log('dropDown', ev);
}

// changing template tabs
function listTabChanged(type = 0) {
    _TemplateTabSelected = type;
    const tabs = document.querySelectorAll('.left>.tab>.tab-item');
    tabs.forEach((el, i) => {
        if (i === type) {
            el.setAttribute('class', 'tab-item active');
        } else {
            el.setAttribute('class', 'tab-item');
        }
    });
    initTemplatesList(type);
}
// init templates list
function initTemplatesList(type = 0) {
    if (!listDom) return;
    let listHtml = '';
    const tmpKeys = Object.keys(templates);
    const tplt = templates[tmpKeys[type]];
    for (let i = 0; i < tplt.length; i++) {
        const item = tplt[i];
        listHtml += '<li ondrag="dragStart(event)" draggable="true">' + item.label + '</li>';
    }
    listDom.innerHTML = listHtml;
}
// init iframe document context
function initWorkPage() {
    if (!workDom || !workIframe) return;
    workIframeDom = workIframe.contentWindow.document;
    workIframeCtx = workIframe.contentWindow;

    workIframeDom.title = document.querySelector('input.title').value;
    setLayout(templates.layout[_LayoutSelected]);

    refreshWorkIframe();
}
function setMetas(workIframeDom, metas = []) {
    for (let i = 0; i < metas.length; i++) {
        const meta = metas[i];
        let metaDom = workIframeDom.createElement('meta');
        const mKeys = Object.keys(meta);
        mKeys.forEach(el => {
            metaDom.setAttribute(el, meta[el]);
        })
        workIframeDom.head.append(metaDom);
    }
}
function setLayout(layout = templates.layout[0]) {
    if (!workIframeDom || !workIframeCtx) return;
    let body = workIframeDom.querySelector('body');
    if (!body) {
        body = workIframeDom.createElement('body');
        body.setAttribute('class', 'layout-template');
        body.addEventListener('dragover', function (event) {
            event.preventDefault();
            console.log('dragover');
        });
        body.addEventListener('drop', function (event) {
            console.log('dragover', event.dataTransfer.getData('element'));
        });
        workIframeDom.append(body);
    }
    body.innerHTML = layout.html;

    setMetas(workIframeDom, [
        { "charset": "utf-8" },
        { "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
        { "name": "viewport", "content": "width=device-width, initial-scale=1.0, maximum-scale=1.0" },
    ]);

    let bodyStyle = workIframeDom.querySelector('style#layout');
    if (!bodyStyle) {
        bodyStyle = workIframeDom.createElement('style');
        bodyStyle.id = 'layout';
        workIframeDom.head.append(bodyStyle);
    }
    bodyStyle.innerHTML = layout.style;
}

// refresh iframe page codes
function refreshWorkIframe() {
    if (!workIframeDom) return;
    const html = `
        <html !doctype>
        ${workIframeDom.head.outerHTML}
        ${workIframeDom.body.outerHTML}
        </html>
    `;
    workIframeDom.designMode = 'on';
    workIframeDom.open();
    workIframeDom.write(html);
    workIframeDom.close();
    workIframeDom.designMode = 'off';
}
// main entry
function main() {
    listTabChanged(0);
    initWorkPage();
}
main();