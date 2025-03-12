# 客户端常见问题

## 身份验证服务器宕机

一般由于客户端网络不好造成的，挂梯子或者换个网

## 有时进服会进到其他服务器?

如果你使用 `play.tatysmp.love` 这个域名，可能会跑到 `axolotland` 服务器

只需要换成这个指定端口就行了 `play.tatysmp.love:10308`

## 资源包加载失败被踢出服务器

检查服务器列表编辑是否同意了下载资源包，不要用 Via 等跨版本协议 MOD 进入服务器

尝试切换其他图形渲染引擎，还不行把客户端日志发私发给服主

## 自定义方块变成音符盒

<!-- tabs:start -->

#### ** 演示 **

<img src="/Help/custom_block.gif" width="500px" />

上方的自定义方块被挖掉后下方的自定义方块会短暂闪成变成音符盒

#### ** 解释 **

<img src="/Help/reason.jpg" height="500px" />

总结 mojang 的锅

<!-- tabs:end -->

## 盔甲自定义纹理失效/动作渲染错误

如果你正在使用其他修改原版着色器的资源包以及mod，如光影，会导致渲染错误

经我翻社区查找似乎是因光影着色器与原版着色器冲突导致，当然我不敢直接下定论

解决方法：关闭光影

> 有关此问题的 iessues
>
> https://github.com/IrisShaders/Iris/issues/1042
>
> https://github.com/sp614x/optifine/issues/6391

<img src="./Help/optifine.jpg" width="400px" />

## 游戏卡顿

由于服务器自定义物品以及方块导致原版客户端性能低下，建议用优化 mod 可有效提升帧数

建议用 fabric+化学三件套MOD，极其不推荐在高版本环境下使用 optifine

如果仍然卡顿，请将卡顿位置以及设备配置报告给服主或者在论坛反馈