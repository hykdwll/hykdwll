class ToolManager {
    constructor() {
        this.tools = toolsDatabase.tools;
        this.categories = toolsDatabase.categories;
        this.filteredTools = [...this.tools];
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.init();
    }

    init() {
        this.renderTools();
        this.bindEvents();
        this.updateStats();
        this.addLoadingAnimation();
    }

    updateStats() {
        document.getElementById('totalTools').textContent = this.tools.length;
        document.getElementById('categoriesCount').textContent = this.categories.length;
        document.getElementById('popularTools').textContent = this.tools.filter(t => t.popular).length;
    }

    bindEvents() {
        // 搜索功能
        document.getElementById('toolSearch').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // 过滤按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        let filtered = [...this.tools];

        // 搜索过滤
        if (this.searchTerm) {
            filtered = toolsDatabase.searchTools(this.searchTerm);
        }

        // 分类过滤
        switch (this.currentFilter) {
            case 'popular':
                filtered = filtered.filter(tool => tool.popular);
                break;
            case 'new':
                filtered = filtered.filter(tool => tool.new);
                break;
        }

        this.filteredTools = filtered;
        this.renderTools();
    }

    renderTools() {
        const container = document.getElementById('toolsContainer');
        const noResults = document.getElementById('noResults');

        if (this.filteredTools.length === 0) {
            container.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        noResults.style.display = 'none';

        // 按分类分组
        const toolsByCategory = {};
        this.filteredTools.forEach(tool => {
            if (!toolsByCategory[tool.category]) {
                toolsByCategory[tool.category] = [];
            }
            toolsByCategory[tool.category].push(tool);
        });

        // 渲染工具
        container.innerHTML = Object.keys(toolsByCategory).map(categoryId => {
            const category = this.categories.find(c => c.id === categoryId);
            const tools = toolsByCategory[categoryId];

            return tools.map((tool, index) => `
                <div class="tool-card" style="animation-delay: ${index * 0.1}s" data-category="${categoryId}">
                    <div class="tool-header">
                        <div class="tool-icon" style="background: linear-gradient(135deg, ${category.color}, ${category.color}dd)">
                            <img src="${tool.image}" alt="${tool.name}">
                        </div>
                        <div class="tool-info">
                            <h3>${tool.name}</h3>
                            <div class="tool-category">${category.name}</div>
                            <div class="tool-badges">
                                ${tool.new ? '<span class="badge new">NEW</span>' : ''}
                                ${tool.popular ? '<span class="badge hot">HOT</span>' : ''}
                            </div>
                        </div>
                    </div>
                    <p class="tool-description">${tool.description}</p>
                    <ul class="tool-features">
                        ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="tool-tags">
                        ${tool.tags.map(tag => `<span class="tool-tag">#${tag}</span>`).join('')}
                    </div>
                    <a href="${tool.url}" class="tool-link">
                        立即使用 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `).join('');
        }).join('');
    }

    addLoadingAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        });

        document.querySelectorAll('.tool-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// 初始化工具管理器
document.addEventListener('DOMContentLoaded', () => {
    new ToolManager();
});