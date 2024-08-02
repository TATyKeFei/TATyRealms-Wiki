(() => {
    "use strict";
    window.$docsify = window.$docsify || {}, window.$docsify.plugins = (window.$docsify.plugins || []).concat((function(o, f) {
        f.config.footer;
        let e = f.config.footer && f.config.footer.copy ? f.config.footer.copy : "<span>TATyRealms &copy; 2021-<script type=\"text/javascript\">document.write(new Date().getFullYear());</script></span>",
            t = f.config.footer && f.config.footer.auth ? f.config.footer.auth : '<span>本网站基于 <a href="https://github.com/docsifyjs/docsify" target="_blank" rel="noreferrer" rel="noopener">docsify</a>. By TATyTEAM</span>',
            c = f.config.footer && f.config.footer.style ? `style="${f.config.footer.style}"` : "",
            n = f.config.footer && f.config.footer.class ? `class="${f.config.footer.class}"` : "";
        var i = `${f.config.footer&&f.config.footer.pre?`${f.config.footer.pre}`:""}<footer ${c} ${n}>${e} ${t}</footer>`;
        o.afterEach((function(o) {
            return o + i
        }))
    }))
})();