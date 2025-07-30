// 工具数据库 - 模拟API数据
const toolsDatabase = {
    categories: [
        {
            id: "security",
            name: "加密与安全",
            icon: "fas fa-shield-alt",
            color: "#ff6b6b"
        },
        {
            id: "encoding",
            name: "编码转换",
            icon: "fas fa-code",
            color: "#4ecdc4"
        },
        {
            id: "development",
            name: "开发工具",
            icon: "fas fa-laptop-code",
            color: "#45b7d1"
        },
        {
            id: "multimedia",
            name: "多媒体",
            icon: "fas fa-photo-video",
            color: "#96ceb4"
        },
        {
            id: "utilities",
            name: "实用工具",
            icon: "fas fa-tools",
            color: "#feca57"
        }
    ],
    tools: [
        {
            id: "aes-encrypt",
            name: "AES加解密",
            category: "security",
            description: "高级加密标准，支持多种模式和密钥长度",
            icon: "fas fa-lock",
            image: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
            url: "aes-decrypt/",
            features: ["AES-128/192/256", "CBC/ECB/CFB模式", "Base64输出"],
            tags: ["加密", "安全", "AES"],
            popular: true,
            new: false
        },
        {
            id: "video-player",
            name: "视频播放器",
            category: "multimedia",
            description: "功能强大的在线视频播放器",
            icon: "fas fa-play-circle",
            image: "https://cdn-icons-png.flaticon.com/512/2889/2889651.png",
            url: "video-player/",
            features: ["多格式支持", "字幕功能", "播放控制"],
            tags: ["视频", "播放", "媒体"],
            popular: false,
            new: false
        },
        {
            id: "password-gen",
            name: "密码生成器",
            category: "security",
            description: "生成高强度随机密码，支持自定义规则",
            icon: "fas fa-key",
            image: "https://cdn-icons-png.flaticon.com/512/2889/2889617.png",
            url: "password-generator/",
            features: ["自定义长度", "包含符号", "批量生成"],
            tags: ["密码", "安全", "生成器"],
            popular: true,
            new: true
        },

        {
            id: "qr-generator",
            name: "二维码生成",
            category: "multimedia",
            description: "生成自定义二维码，支持多种数据类型",
            icon: "fas fa-qrcode",
            image: "https://cdn-icons-png.flaticon.com/512/2889/2889622.png",
            url: "qr-generator/",
            features: ["文本URL", "自定义样式", "高清下载"],
            tags: ["二维码", "生成", "分享"],
            popular: true,
            new: false
        },
        {
            id: "uuid-gen",
            name: "UUID生成器",
            category: "development",
            description: "生成标准UUID/GUID，支持多种版本",
            icon: "fas fa-fingerprint",
            image: "https://cdn-icons-png.flaticon.com/512/2889/2889647.png",
            url: "uuid-generator/",
            features: ["UUID v1/v4", "批量生成", "格式选项"],
            tags: ["UUID", "标识符", "开发"],
            popular: false,
            new: false
        },
 
    ],
    
    // 搜索和筛选功能
    searchTools(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.tools.filter(tool => 
            tool.name.toLowerCase().includes(lowercaseQuery) ||
            tool.description.toLowerCase().includes(lowercaseQuery) ||
            tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    },
    
    getToolsByCategory(categoryId) {
        return this.tools.filter(tool => tool.category === categoryId);
    },
    
    getPopularTools() {
        return this.tools.filter(tool => tool.popular);
    },
    
    getNewTools() {
        return this.tools.filter(tool => tool.new);
    }
};

// 导出供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = toolsDatabase;
}