const isObject = function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

const isString = function (value) {
    return Object.prototype.toString.call(value) === '[object String]';
}

const isBoolean = function (value) {
    return typeof value === 'boolean';
}

const getFooterId = function () {
    return 'footer-' + Math.floor((Math.random() * 1000) + 1);
}

const createStyle = function () {
    const footerStyleId = 'footer-style-001';
    if (document.getElementById(footerStyleId)) {
        return;
    }
    const styleTag = document.createElement('style');
    styleTag.id = footerStyleId;
    styleTag.innerHTML = `
            .footer { height: 50px; margin: 0 auto; background: #eee; padding: 0 30px; text-align: center; overflow: hidden; }
            .footer-item { display: inline-block; padding-left: 8px; padding-right: 8px; color: #999; font-size: 12px; vertical-align: middle; white-space: nowrap; }
            .footer-link {text-decoration: none;}
        `;
    document.querySelector('head').appendChild(styleTag);
}

// 为元素节点设置id属性
function setNodeId(node, id) {
    if (node && id) node.id = id;
}

// 为元素设置样式
function setNodeStyle(node, style) {
    if (!node || !isObject(style)) return;
    for (const key in style) {
        if (Object.prototype.hasOwnProperty.call(style, key)) {
            node.style.setProperty(key, style[key]);
        }
    }
}

const EMPTY_NODE_ID = 'emptyNode-001';

const DEFAULT_FOOTER_HEIGHT = '50px';

const FOOTER_CONFIG = {
    visible: true,
    footerId: '',
    style: {
        'height': DEFAULT_FOOTER_HEIGHT,
        'line-height': DEFAULT_FOOTER_HEIGHT
    },
    textLinks: [],
    footerElement: null, // 自定义HTML元素，当配置了此选项时，默认使用此选项，样式请自行配置。（上面配置的样式不会应用在此项上）
};

const footerPluginFunction = function (hook, vm) {
    let config = {};
    if (vm.config && isObject(vm.config.customFooter)) {
        config = vm.config.customFooter;
        config.visible = isBoolean(config.visible) ? config.visible : FOOTER_CONFIG.visible;
        config.style = isObject(config.style) ? config.style : FOOTER_CONFIG.style;
        config.textLinks = Array.isArray(config.textLinks) ? config.textLinks : FOOTER_CONFIG.textLinks;
        config.footerId = isString(config.footerId) && !document.getElementById(config.footerId) ? config.footerId : getFooterId();
        if (config.footerElement && config.footerElement.nodeType !== 1) {
            console.error('自定义的 footerElement 节点类型不是元素节点');
            config.visible = false;
        }
    } else {
        FOOTER_CONFIG.footerId = getFooterId();
        config = FOOTER_CONFIG;
    }

    function initFooter() {
        if (!config.footerId) {
            return null;
        }
        if (document.getElementById(config.footerId)) {
            return document.getElementById(config.footerId);
        }
        createStyle();
        const footerDiv = document.createElement('div');
        footerDiv.id = config.footerId; // 设置页脚元素的id
        // 遍历配置的样式对象，设置样式
        footerDiv.className = 'footer';
        for (const key in config.style) {
            if (Object.prototype.hasOwnProperty.call(config.style, key)) {
                footerDiv.style.setProperty(key, config.style[key]);
            }
        }
        // 遍历数组，创建元素节点
        config.textLinks.forEach(item => {
            let node;
            item.tagType = ['a', 'img', 'span'].includes(item.tagType) ? item.tagType : 'span';
            item.text = item.text ? item.text : '未知文本';
            node = document.createElement(item.tagType);
            node.classList.add('footer-item');
            if (item.tagType === 'a') { // 标签
                node.href = item.link;
                node.target = item.target || '_blank';
                node.classList.add('footer-link');
                node.appendChild(document.createTextNode(item.text));
            } else if (item.tagType === 'img') {
                node.alt = item.text;
                node.src = item.link;
            } else if (item.tagType === 'span') { // 文本节点
                node.appendChild(document.createTextNode(item.text));
            }
            setNodeId(node, item.id);
            setNodeStyle(node, item.style);
            footerDiv.appendChild(node);
        })
        return footerDiv;
    }

    // 创建页脚方法
    const createFooter = function () {
        if (!config.visible) {
            return;
        }
        // 创建元素节点
        let footerDiv;
        if (config.footerElement) {
            footerDiv = config.footerElement;
            footerDiv.id = config.footerId; // 设置页脚元素的id
        } else {
            footerDiv = initFooter();
        }

        if (!document.getElementById(config.footerId)) {
            Docsify.dom.find('section.content').appendChild(footerDiv);
        }

        // 文章文本主体区域
        const article = document.getElementById('main');
        // 获取文章正文区域的全部高度，包括带滚动条隐藏区域的高度
        const articleHeight = article.scrollHeight;
        // 文章内容区域
        const content = Docsify.dom.find('section.content');
        // 获取文档内容区域的高度，去除内边距、边框等
        const contentHeight = content.clientHeight - article.offsetTop;
        // 页脚
        const footer = document.getElementById(config.footerId);
        // 重新计算页脚高度
        const footerHeight = Math.max(parseInt(config.style.height || DEFAULT_FOOTER_HEIGHT, 10), footer.clientHeight);
        footer.style.setProperty('height', footerHeight + 'px');
        footer.style.setProperty('line-height', footerHeight + 'px');

        const diff = contentHeight - articleHeight - footerHeight;
        if (diff < 0) { // 如果内容区域高度小于文章正文区域高度和页脚高度之和，判断是否存在填充的div，有则将其隐藏，然后返回
            if (document.getElementById(EMPTY_NODE_ID)) {
                document.getElementById(EMPTY_NODE_ID).style.display = 'none';
            }
            return;
        }
        let emptyNode = document.getElementById(EMPTY_NODE_ID);
        if (!emptyNode) {
            emptyNode = document.createElement('div');
            emptyNode.id = EMPTY_NODE_ID;
            content.insertBefore(emptyNode, footer);
        }
        footer.style.visibility = 'hidden'; // 先将页脚隐藏，减弱页脚元素抖动
        emptyNode.style.height = Math.floor(diff - 1) + 'px';
        emptyNode.style.display = 'block';
        footer.style.visibility = 'visible';
    }

    hook.doneEach(function () {
        // 每次路由切换时数据全部加载完成后调用，没有参数。
        createFooter();
    });

};

if ($docsify.plugins && Array.isArray($docsify.plugins)) {
    $docsify.plugins.push(footerPluginFunction);
} else {
    $docsify.plugins = [footerPluginFunction];
}