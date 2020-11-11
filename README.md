# fe-monitor-action
前端用户行为采集sdk

# 安装
### npm安装
```
$ npm install fe-monitor-action
```

### CDN

```
<script src="https://cdn.jsdelivr.net/npm/fe-monitor-action@(version)/lib/track.js"></script>
<!-- 例如 -->
<script src="https://cdn.jsdelivr.net/npm/fe-monitor-action@1.0.0-rc.2/lib/track.js"></script>
```

# 使用方式
```js

import track from 'fe-monitor-action'; 
 
// 重新安装
track.install({
    uploadUrl: "/someApi",
    isDebug: false,
    autoTrack: true,
    autoHeatmap: false,
    autoVisual: fasle,
    autoHash: true,
    session: "crossDomain"
});

```

# 配置参数
参数名 | 描述 |  类型  | 默认值 |
-|-|-|-|
uploadUrl | 行为数据上报API地址	 | string | -- |
isDebug | 是否开启调试 | boolean | false |
router | 监听路由方式 | 'hash'、'history' | hash |
autoTrack | 是否启用原生标签埋点 | boolean | true |
autoHeatmap | 是否启用热图功能	 | boolean | false |
autoHash | 是否监听hash路径变化	  | bool | true |
session | session存储模式(跨域关联session)	 | enum（'crossSubDomain'、'storage'，‘crossDomain’） | crossSubDomain |