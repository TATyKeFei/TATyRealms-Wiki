var CONFIG = {
    auto: true,
    text: "Top",
    right: 15,
    bottom: 15,
    offset: 500
};
var install = function (hook, vm) {
    var opts = vm.config.scrollToTop || CONFIG;
    CONFIG.auto = opts.auto && typeof opts.auto === "boolean" ? opts.auto : CONFIG.auto;
    CONFIG.text = opts.text && typeof opts.text === "string" ? opts.text : CONFIG.text;
    CONFIG.right = opts.right && typeof opts.right === "number" ? opts.right : CONFIG.right;
    CONFIG.bottom = opts.bottom && typeof opts.bottom === "number" ? opts.bottom : CONFIG.bottom;
    CONFIG.offset = opts.offset && typeof opts.offset === "number" ? opts.offset : CONFIG.offset;
    var onScroll = function (e) {
        if (!CONFIG.auto) {
            return
        }
        var offset = window.document.documentElement.scrollTop;
        var $scrollBtn = Docsify.dom.find("span.scroll-to-top");
        $scrollBtn.style.display = offset >= CONFIG.offset ? "block" : "none"
    };
    hook.mounted(function () {
        var scrollBtn = document.createElement("span");
        scrollBtn.className = "scroll-to-top";
        scrollBtn.style.display = CONFIG.auto ? "none" : "block";
        scrollBtn.style.overflow = "hidden";
        scrollBtn.style.position = "fixed";
        scrollBtn.style.right = CONFIG.right + "px";
        scrollBtn.style.bottom = CONFIG.bottom + "px";
        scrollBtn.style.width = "50px";
        scrollBtn.style.height = "50px";
        scrollBtn.style.background = "url(https://www.tatysmp.love/images/ui/fireworks_top.png)";
        scrollBtn.style.border = "1px solid #ddd";
        scrollBtn.style.borderRadius = "4px";
        scrollBtn.style.lineHeight = "42px";
        scrollBtn.style.fontSize = "16px";
        scrollBtn.style.textAlign = "center";
        scrollBtn.style.boxShadow = "0px 0px 6px #eee";
        scrollBtn.style.cursor = "pointer";
        var textNode = document.createTextNode(CONFIG.text);
        scrollBtn.appendChild(textNode);
        document.body.appendChild(scrollBtn);
        window.addEventListener("scroll", onScroll);
        scrollBtn.onclick = function (e) {
            e.stopPropagation();
            var step = window.scrollY / 15;
            var scroll = function () {
                window.scrollTo(0, window.scrollY - step);
                if (window.scrollY > 0) {
                    setTimeout(scroll, 15)
                }
            };
            scroll()
        }
    })
};
$docsify.plugins = [].concat(install, $docsify.plugins);