/**
 * 视频播放器应用主脚本
 * 包含路由管理、页面渲染、交互功能等
 */

/**
 * 路由管理器类
 * 处理URL hash路由和页面渲染
 */
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
        this.init();
    }

    /**
     * 初始化路由监听器
     */
    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    /**
     * 处理路由变化
     */
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        this.currentRoute = hash;
        this.renderPage(hash);
    }

    /**
     * 渲染页面
     * @param {string} path - 路由路径
     */
    async renderPage(path) {
        const app = document.getElementById('app');
        
        // 显示加载状态
        app.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>正在加载视频...</p>
            </div>
        `;

        // 模拟加载延迟
        await new Promise(resolve => setTimeout(resolve, 300));

        const video = videoDatabase.getVideoByPath(path);
        
        if (video) {
            this.renderVideoPage(video);
        } else {
            this.renderNotFound();
        }
    }

    /**
     * 渲染视频详情页
     * @param {Object} video - 视频数据对象
     */
    renderVideoPage(video) {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="video-container">
                <div class="video-wrapper">
                    <video class="video-player" controls autoplay muted poster="${video.thumbnail}">
                        <source src="${video.url}" type="video/mp4">
                        您的浏览器不支持视频播放。
                    </video>
                </div>
                
                <div class="video-info">
                    <h1 class="video-title">${video.title}</h1>
                    <div class="video-meta">
                        <span>${video.views} 次观看</span>
                        <span>${video.uploadDate}</span>
                        <span>${video.category}</span>
                    </div>
                    <div class="video-stats">
                        <div class="stat-item">
                            <span>👍 ${videoDatabase.formatNumber(video.stats.likes)}</span>
                        </div>
                        <div class="stat-item">
                            <span>💰 ${videoDatabase.formatNumber(video.stats.coins)}</span>
                        </div>
                        <div class="stat-item">
                            <span>⭐ ${videoDatabase.formatNumber(video.stats.collects)}</span>
                        </div>
                        <div class="stat-item">
                            <span>📤 ${videoDatabase.formatNumber(video.stats.shares)}</span>
                        </div>
                    </div>
                </div>

                <div class="author-section">
                    <div class="author-avatar">${video.creator.avatar}</div>
                    <div class="author-info">
                        <div class="author-name">${video.creator.name}</div>
                        <div class="author-followers">${video.creator.followers} 粉丝</div>
                    </div>
                    <button class="follow-btn" onclick="toggleFollow(this)">关注</button>
                </div>

                <div class="interaction-bar">
                    <button class="interaction-btn" onclick="toggleInteraction(this, 'like')">
                        <span>👍</span>
                        <span>点赞</span>
                    </button>
                    <button class="interaction-btn" onclick="toggleInteraction(this, 'coin')">
                        <span>💰</span>
                        <span>投币</span>
                    </button>
                    <button class="interaction-btn" onclick="toggleInteraction(this, 'collect')">
                        <span>⭐</span>
                        <span>收藏</span>
                    </button>
                    <button class="interaction-btn" onclick="toggleInteraction(this, 'share')">
                        <span>📤</span>
                        <span>分享</span>
                    </button>
                </div>
            </div>

            <div id="Discuss-Comments">
                <h3 style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">评论区</h3>
            </div>
        `;

        // 初始化视频播放器事件
        this.initVideoPlayer();

        // 初始化Discuss评论系统
        if (typeof discuss !== 'undefined') {
            discuss.init({
                el: '#Discuss-Comments',
                serverURLs: 'https://discuss.eryang.top/',
                path: fullPath
            });
        }
    }

    /**
     * 渲染404页面
     */
    renderNotFound() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="not-found">
                <h2>404 - 页面未找到</h2>
                <p>抱歉，您访问的视频不存在或已被删除。</p>
                <button class="back-btn" onclick="router.navigate('/')">返回首页</button>
            </div>
        `;
    }

    /**
     * 初始化视频播放器事件
     */
    initVideoPlayer() {
        const video = document.querySelector('.video-player');
        if (video) {
            video.addEventListener('loadedmetadata', () => {
                console.log('视频加载完成');
            });

            video.addEventListener('error', (e) => {
                console.error('视频加载错误:', e);
                const wrapper = document.querySelector('.video-wrapper');
                wrapper.innerHTML = `
                    <div class="video-placeholder">
                        <p>视频加载失败，请检查网络连接</p>
                    </div>
                `;
            });
        }
    }

    /**
     * 导航到指定路径
     * @param {string} path - 目标路径
     */
    navigate(path) {
        window.location.hash = path;
    }
}

/**
 * 关注/取消关注功能
 * @param {HTMLElement} button - 按钮元素
 */
function toggleFollow(button) {
    const isFollowing = button.textContent === '已关注';
    button.textContent = isFollowing ? '关注' : '已关注';
    button.style.background = isFollowing ? '#00a1d6' : '#999';
}

/**
 * 互动按钮功能（点赞、投币、收藏、分享）
 * @param {HTMLElement} button - 按钮元素
 * @param {string} type - 互动类型
 */
function toggleInteraction(button, type) {
    const isActive = button.classList.contains('active');
    
    if (isActive) {
        button.classList.remove('active');
    } else {
        document.querySelectorAll('.interaction-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    // 简单的动画效果
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// 初始化应用
const router = new Router();

// 全局访问
window.router = router;