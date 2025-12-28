// Theme Management
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeIcon = document.getElementById('theme-icon');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Mobile navigation
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// User dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('active');
}

// Modal management
function openAuthModal(type) {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchAuthForm(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

// Newsletter modal
function openNewsletterModal() {
    document.getElementById('newsletter-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeNewsletterModal() {
    document.getElementById('newsletter-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mock news data
const mockNews = [
    {
        title: "OpenAI Announces GPT-5 with Revolutionary Reasoning Capabilities",
        summary: "The new model shows significant improvements in logical reasoning and can handle complex multi-step problems with unprecedented accuracy.",
        source: "TechCrunch",
        time: "2 hours ago",
        tags: ["OpenAI", "GPT-5", "AI Research"]
    },
    {
        title: "Google's Gemini Pro Now Available for Enterprise Applications",
        summary: "Google Cloud launches enterprise version of Gemini Pro with enhanced security features and dedicated support for business customers.",
        source: "VentureBeat",
        time: "4 hours ago", 
        tags: ["Google", "Gemini", "Enterprise"]
    },
    {
        title: "AI Startup Anthropic Raises $2.3B in Series C Funding",
        summary: "The company plans to use the funding to advance its constitutional AI research and compete with OpenAI in the enterprise market.",
        source: "Reuters",
        time: "6 hours ago",
        tags: ["Anthropic", "Funding", "Startup"]
    },
    {
        title: "Microsoft Integrates Advanced AI into Office 365 Suite",
        summary: "New Copilot features include intelligent document generation, data analysis automation, and enhanced collaboration tools.",
        source: "Microsoft News",
        time: "8 hours ago",
        tags: ["Microsoft", "Office 365", "Productivity"]
    },
    {
        title: "EU Finalizes AI Act Implementation Guidelines",
        summary: "New regulations will affect how AI companies operate in Europe, with strict requirements for high-risk AI applications.",
        source: "EU Commission",
        time: "10 hours ago",
        tags: ["Regulation", "EU", "Policy"]
    }
];

// Load news feed
function loadNews() {
    const newsGrid = document.getElementById('news-grid');
    const contentGate = document.getElementById('content-gate');
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userToken');
    
    if (!isLoggedIn) {
        contentGate.style.display = 'block';
        newsGrid.style.display = 'none';
        return;
    }
    
    contentGate.style.display = 'none';
    newsGrid.style.display = 'grid';
    
    newsGrid.innerHTML = mockNews.map(item => `
        <div class="news-item" onclick="readArticle('${item.title}')">
            <div class="news-meta">
                <span class="news-source">${item.source}</span>
                <span class="news-time">${item.time}</span>
            </div>
            <h3 class="news-title">${item.title}</h3>
            <p class="news-summary">${item.summary}</p>
            <div class="news-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function loadMoreNews() {
    // Simulate loading more news
    const newsGrid = document.getElementById('news-grid');
    const moreNews = mockNews.slice().reverse();
    
    moreNews.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.onclick = () => readArticle(item.title);
        newsItem.innerHTML = `
            <div class="news-meta">
                <span class="news-source">${item.source}</span>
                <span class="news-time">${item.time}</span>
            </div>
            <h3 class="news-title">${item.title}</h3>
            <p class="news-summary">${item.summary}</p>
            <div class="news-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        newsGrid.appendChild(newsItem);
    });
}

function readArticle(title) {
    // Placeholder for article reading functionality
    alert(`Opening article: ${title}`);
}

// Update last updated timestamp
function updateTimestamp() {
    const timestampElement = document.getElementById('last-updated');
    if (timestampElement) {
        const now = new Date();
        const minutes = Math.floor(Math.random() * 5) + 1;
        timestampElement.textContent = `${minutes} minutes ago`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadNews();
    updateTimestamp();
    
    // Update timestamp every 30 seconds
    setInterval(updateTimestamp, 30000);
    
    // Close modals when clicking outside
    window.onclick = function(event) {
        const authModal = document.getElementById('auth-modal');
        const newsletterModal = document.getElementById('newsletter-modal');
        const paymentModal = document.getElementById('payment-modal');
        
        if (event.target === authModal) {
            closeAuthModal();
        }
        if (event.target === newsletterModal) {
            closeNewsletterModal();
        }
        if (event.target === paymentModal) {
            closePaymentModal();
        }
    };
});
