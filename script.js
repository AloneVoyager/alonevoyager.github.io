// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 切换移动端菜单
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // 汉堡菜单动画
        if (hamburger.classList.contains('active')) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.backgroundColor = '#F7D15B';
            
            // 创建关闭图标效果
            hamburger.style.backgroundColor = 'transparent';
            hamburger.style.transform = 'rotate(180deg)';
            
            const before = hamburger.previousElementSibling;
            const after = hamburger.nextElementSibling;
            
            if (!before || !after) {
                // 如果没有伪元素，我们动态创建
                hamburger.style.position = 'relative';
                
                // 创建线条
                const line1 = document.createElement('span');
                line1.style.position = 'absolute';
                line1.style.top = '0';
                line1.style.left = '0';
                line1.style.width = '100%';
                line1.style.height = '3px';
                line1.style.backgroundColor = '#F7D15B';
                line1.style.transform = 'rotate(45deg)';
                hamburger.appendChild(line1);
                
                const line2 = document.createElement('span');
                line2.style.position = 'absolute';
                line2.style.top = '0';
                line2.style.left = '0';
                line2.style.width = '100%';
                line2.style.height = '3px';
                line2.style.backgroundColor = '#F7D15B';
                line2.style.transform = 'rotate(-45deg)';
                hamburger.appendChild(line2);
                
                // 隐藏原始线条
                hamburger.style.backgroundColor = 'transparent';
            }
        } else {
            // 恢复原始状态
            hamburger.style.transform = 'rotate(0)';
            hamburger.style.backgroundColor = '#333';
            
            // 移除动态创建的线条
            const lines = hamburger.querySelectorAll('span');
            lines.forEach(line => line.remove());
        }
    });
    
    // 点击移动端导航链接后关闭菜单
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.style.transform = 'rotate(0)';
            hamburger.style.backgroundColor = '#333';
            
            // 移除动态创建的线条
            const lines = hamburger.querySelectorAll('span');
            lines.forEach(line => line.remove());
            
            // 更新活动状态
            updateActiveNav(this);
        });
    });
    
    // 点击桌面导航链接更新活动状态
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            updateActiveNav(this);
            
            // 滚动到对应部分
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 更新活动导航链接
    function updateActiveNav(activeLink) {
        // 移除所有导航链接的活动状态
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // 添加活动状态到当前链接
        activeLink.classList.add('active');
        
        // 同步桌面和移动端的活动状态
        const linkHref = activeLink.getAttribute('href');
        if (activeLink.classList.contains('nav-link')) {
            mobileNavLinks.forEach(link => {
                if (link.getAttribute('href') === linkHref) {
                    link.classList.add('active');
                }
            });
        } else {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === linkHref) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // 处理B站按钮点击
    const bilibiliBtn = document.querySelector('.bilibili-btn');
    if (bilibiliBtn) {
        bilibiliBtn.addEventListener('click', function(e) {
            // 跳转到B站个人空间
            e.preventDefault();
            
            window.open('https://space.bilibili.com/3493144343612119', '_blank');
        });
    }
    
    // 滚动时更新导航栏样式
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 页面加载时显示欢迎消息
    window.addEventListener('load', function() {
        console.log('Alone Voyager 个人网站已加载完成！');
    });
});