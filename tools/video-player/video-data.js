/**
 * 视频数据库模块
 * 提供视频数据的存储、查询和管理功能
 * 支持按路径、ID搜索，以及数字格式化等功能
 */
const videoDatabase = {
    /**
     * 视频数据数组
     * 每个视频对象包含完整的信息：标题、描述、URL、创作者、统计数据等
     */
    videos: [
        {
            id: 1, // 视频唯一标识符
            title: "黑神话悟空 - 终极预告片", // 视频标题
            description: "国产3A大作震撼来袭！体验东方神话的史诗级冒险，悟空觉醒，天地变色！", // 视频描述
            url: "https://upyun.eryang.top/video/xbox%E9%BB%91%E7%A5%9E%E8%AF%9D%E6%82%9F%E7%A9%BA.mp4", // 视频文件URL
            thumbnail: "https://picsum.photos/400/225?random=1", // 缩略图URL
            duration: "03:45", // 视频时长
            views: "2.3M", // 观看次数
            uploadDate: "2024-06-10", // 上传日期
            category: "游戏", // 视频分类
            path: "/heishenhua-wukong", // 路由路径，用于URL hash路由
            creator: { // 创作者信息
                name: "游戏科学官方",
                avatar: "游", // 头像文字标识
                followers: "89.5万", // 粉丝数量
                verified: true // 是否认证用户
            },
            stats: { // 互动统计数据
                likes: 234000, // 点赞数
                coins: 89000,  // 投币数
                collects: 56000, // 收藏数
                shares: 12000   // 分享数
            },
            tags: ["国产", "动作", "RPG", "神话"] // 标签数组
        },
        /**
         * 第二个视频：赛博朋克2077 DLC
         * 展示热门游戏DLC内容，吸引赛博朋克粉丝
         */
        {
            id: 2,
            title: "赛博朋克2077: 幻影自由",
            description: "夜之城的新篇章，V的终极冒险！",
            url: "https://example.com/cyberpunk.mp4",
            thumbnail: "https://picsum.photos/400/225?random=2",
            duration: "05:24",
            views: "234万",
            uploadDate: "2024-06-08",
            category: "游戏",
            path: "/video/cyberpunk-phantom",
            creator: {
                name: "CD Projekt RED",
                avatar: "CD",
                followers: "456万",
                verified: true
            },
            stats: {
                likes: 567000,
                coins: 123000,
                collects: 89000,
                shares: 45000
            },
            tags: ["赛博朋克", "RPG", "开放世界"]
        },
        /**
         * 第三个视频：原神版本更新
         * 热门手游的版本更新内容，保持内容新鲜度
         */
        {
            id: 3,
            title: "原神4.5版本前瞻直播",
            description: "新角色、新地图、新玩法！",
            url: "https://example.com/genshin.mp4",
            thumbnail: "https://picsum.photos/400/225?random=3",
            duration: "08:15",
            views: "567万",
            uploadDate: "2024-06-05",
            category: "游戏",
            path: "/video/genshin-4-5",
            creator: {
                name: "米哈游官方",
                avatar: "米",
                followers: "890万",
                verified: true
            },
            stats: {
                likes: 890000,
                coins: 234000,
                collects: 156000,
                shares: 78000
            },
            tags: ["二次元", "RPG", "开放世界"]
        },
        /**
         * 第四个视频：艾尔登法环DLC
         * 魂系游戏大作，满足硬核玩家需求
         */
        {
            id: 4,
            title: "艾尔登法环DLC预告解析",
            description: "黄金树幽影，新的冒险即将开始！",
            url: "https://example.com/eldenring.mp4",
            thumbnail: "https://picsum.photos/400/225?random=4",
            duration: "12:30",
            views: "189万",
            uploadDate: "2024-06-01",
            category: "游戏",
            path: "/video/elden-ring-dlc",
            creator: {
                name: "FromSoftware",
                avatar: "F",
                followers: "234万",
                verified: true
            },
            stats: {
                likes: 345000,
                coins: 78000,
                collects: 67000,
                shares: 23000
            },
            tags: ["魂系", "RPG", "黑暗奇幻"]
        }
    ],

    /**
     * 路由映射表
     * 将URL路径映射到对应的视频ID，支持hash路由
     */
    routes: {
        "/heishenhua-wukong": 1,
        "/video/cyberpunk-phantom": 2,
        "/video/genshin-4-5": 3,
        "/video/elden-ring-dlc": 4,
        "/": 1
    },

    /**
     * 通过ID获取单个视频
     * @param {number|string} id - 视频ID
     * @returns {Object|null} 视频对象或null
     */
    getVideoById: function(id) {
        return this.videos.find(video => video.id === parseInt(id));
    },

    /**
     * 通过路径获取单个视频
     * @param {string} path - 视频路径
     * @returns {Object|null} 视频对象或null
     */
    getVideoByPath: function(path) {
        const videoId = this.routes[path];
        return videoId ? this.getVideoById(videoId) : null;
    },

    /**
     * 获取所有视频
     * @returns {Array} 视频数组
     */
    getAllVideos: function() {
        return this.videos;
    },

    /**
     * 获取所有路由路径
     * @returns {Array} 路径字符串数组
     */
    getRoutes: function() {
        return Object.keys(this.routes);
    },

    /**
     * 格式化数字显示
     * 将大数字转换为更易读的形式（如1.2k、3.5M）
     * @param {number} num - 要格式化的数字
     * @returns {string} 格式化后的字符串
     */
    formatNumber: function(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    },

    /**
     * 搜索视频
     * 根据关键词在标题、描述和创作者名称中搜索匹配的视频
     * @param {string} keyword - 搜索关键词
     * @returns {Array} 匹配的视频数组
     */
    searchVideos: function(keyword) {
        if (!keyword) return this.videos;
        
        keyword = keyword.toLowerCase();
        return this.videos.filter(video => 
            video.title.toLowerCase().includes(keyword) ||
            video.description.toLowerCase().includes(keyword) ||
            video.creator.name.toLowerCase().includes(keyword)
        );
    }
};

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = videoDatabase;
}