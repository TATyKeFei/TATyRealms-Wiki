(() => {
    "use strict";
    window.$docsify = window.$docsify || {}, window.$docsify.plugins = (window.$docsify.plugins || []).concat((function(o, f) {
        f.config.footer;
        let e = f.config.footer && f.config.footer.copy ? f.config.footer.copy : "<span>&copy; TATyRealms 2021 - 2024 本网站基于 <a href="https://github.com/docsifyjs/docsify" target="_blank" rel="noreferrer" rel="noopener">docsify</a>.</span>",
            t = f.config.footer && f.config.footer.auth ? f.config.footer.auth : '<span>与 Mojang Studio、网易、Microsoft 没有从属关系</span>',
            c = f.config.footer && f.config.footer.style ? `style="${f.config.footer.style}"` : "",
            n = f.config.footer && f.config.footer.class ? `class="${f.config.footer.class}"` : "";
        var i = `${f.config.footer&&f.config.footer.pre?`${f.config.footer.pre}`:""}<footer ${c} ${n}>${e} ${t}</footer>`;
        o.afterEach((function(o) {
            return o + i
        }))
    }))
})();
