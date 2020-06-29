# restaurant
项目使用MVVM模式进行设计，数据上的交换格式为JSON，后台采取分布式微服务集群架构，采取开源数据库mysql作为主要存储，使用redis非关系形数据库进行缓存数据存储，架构上支持分布式部署，允许随时扩容处理。

本项目为web服务，无需安装，只需用户打开浏览器输入网址即可使用，手机端也可通过扫描二维码进行使用，网址如下：

商家前台网址：http://haozheng.club/restaurant_computer_p

商家后厨网址：http://kitchen.haozheng.club/restaurant_computer_k

手机点餐网址：http://user.haozheng.club/restaurant_m

主要实现功能：

1.商家前台端口：

（a允许商家对餐厅详情、订单、点餐二维码等一系列信息进行管理；

（b拥有清晰的数据分析和报表，实时获取门店真实经营数据；

（c允许商家发布营销活动，助其吸引新客、沉淀老客；

（d订单智能排队，高峰时段缓解配菜压力；

2．商家后厨端口：

（a建立后厨秩序，配菜和传菜无缝对接，节约时间；

3.用户端口：

（a可浏览附近加入本平台的餐厅简要信息；

（b 扫码等方式点餐或外卖预订，及时查询订单进度详情；
