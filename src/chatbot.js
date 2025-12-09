// Chatbot Widget
document.addEventListener('DOMContentLoaded', function() {

  // Create chatbot HTML
  const chatbotHTML = `
    <div class="chatbot-container">
      <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="chat-badge">1</span>
      </button>

      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <div>
              <h3>DefendXTech Support</h3>
              <p class="status-online">Online - We typically reply instantly</p>
            </div>
          </div>
          <button class="chatbot-minimize" id="chatbot-minimize">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <div class="chatbot-messages" id="chatbot-messages">
          <div class="message bot-message">
            <div class="message-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="message-content">
              <p>Welcome to DefendXTech! 👋</p>
              <p>How can we help secure your business today?</p>
            </div>
          </div>
        </div>

        <div class="chatbot-quick-replies" id="quick-replies">
          <p class="quick-replies-label">Quick options:</p>
          <button class="quick-reply" data-message="I need information about your services">About Services</button>
          <button class="quick-reply" data-message="I want to schedule a demo">Schedule Demo</button>
          <button class="quick-reply" data-message="I have a security emergency">Security Emergency</button>
          <button class="quick-reply" data-message="Tell me about pricing">Pricing Info</button>
        </div>

        <div class="chatbot-input-wrapper">
          <input
            type="text"
            class="chatbot-input"
            id="chatbot-input"
            placeholder="Type your message..."
            autocomplete="off"
          >
          <button class="chatbot-send" id="chatbot-send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Insert chatbot into the page
  const chatbotWidget = document.getElementById('chatbot-widget');
  if (chatbotWidget) {
    chatbotWidget.innerHTML = chatbotHTML;
  }

  // Load chatbot styles
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './src/chatbot-styles.css';
  document.head.appendChild(link);

  // Chatbot functionality
  const toggle = document.getElementById('chatbot-toggle');
  const window = document.getElementById('chatbot-window');
  const minimize = document.getElementById('chatbot-minimize');
  const input = document.getElementById('chatbot-input');
  const send = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');
  const quickReplies = document.querySelectorAll('.quick-reply');
  const badge = document.querySelector('.chat-badge');

  let isOpen = false;

  // Toggle chatbot
  toggle.addEventListener('click', function() {
    isOpen = !isOpen;
    toggle.classList.toggle('active');
    window.classList.toggle('active');

    if (isOpen) {
      input.focus();
      // Hide badge when opened
      if (badge) {
        badge.style.display = 'none';
      }
    }
  });

  // Minimize chatbot
  minimize.addEventListener('click', function() {
    isOpen = false;
    toggle.classList.remove('active');
    window.classList.remove('active');
  });

  // Send message function
  function sendMessage(text) {
    if (!text.trim()) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
      </div>
    `;
    messages.appendChild(userMessage);
    messages.scrollTop = messages.scrollHeight;

    // Clear input
    input.value = '';

    // Hide quick replies after first message
    const quickRepliesContainer = document.getElementById('quick-replies');
    if (quickRepliesContainer) {
      quickRepliesContainer.style.display = 'none';
    }

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage = document.createElement('div');
      botMessage.className = 'message bot-message';
      botMessage.innerHTML = `
        <div class="message-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <div class="message-content">
          <p>${botResponse}</p>
        </div>
      `;
      messages.appendChild(botMessage);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
  }

  // Quick reply handlers
  quickReplies.forEach(button => {
    button.addEventListener('click', function() {
      const message = this.getAttribute('data-message');
      sendMessage(message);
    });
  });

  // Send button handler
  send.addEventListener('click', function() {
    sendMessage(input.value);
  });

  // Enter key handler
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage(input.value);
    }
  });

  // Bot response logic
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('service')) {
      return "We offer comprehensive cybersecurity services including Managed Services (SOC, SOAR), Professional Services (consulting, implementation), Assessment Services (penetration testing, audits), and specialized Expertise (SIEM, IR). Would you like to know more about any specific service?";
    }
    else if (lowerMessage.includes('demo') || lowerMessage.includes('schedule')) {
      return "Great! I'd be happy to schedule a demo for you. Please click <a href='index.html#contact'>here</a> to fill out our contact form, or call us directly. Our team will reach out within 24 hours to set up a convenient time.";
    }
    else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('breach')) {
      return "⚠️ For security emergencies and active incidents, please call our 24/7 SOC hotline immediately or email our incident response team. Our experts are standing by to assist you.";
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Our pricing is customized based on your organization's specific needs and requirements. We offer flexible packages for different business sizes. Would you like to schedule a consultation to discuss pricing? You can also <a href='index.html#contact'>contact us</a> for a quote.";
    }
    else if (lowerMessage.includes('soc') || lowerMessage.includes('monitoring')) {
      return "Our Security Operations Center (SOC) provides 24/7/365 monitoring with an average detection time of 0.3 seconds and 99.99% uptime. We use AI-powered threat hunting and automated response capabilities. Interested in learning more?";
    }
    else if (lowerMessage.includes('compliance') || lowerMessage.includes('gdpr') || lowerMessage.includes('iso')) {
      return "We help organizations achieve and maintain compliance with GDPR, ISO 27001, HIPAA, and other regulatory frameworks. Our compliance-driven approach includes regular audits, reporting, and gap assessments. Would you like to discuss your compliance requirements?";
    }
    else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to DefendXTech. How can I assist you with your cybersecurity needs today?";
    }
    else if (lowerMessage.includes('thank')) {
      return "You're welcome! If you have any other questions, feel free to ask. We're here to help! 😊";
    }
    else {
      return "Thank you for your message! For detailed information, I'd recommend checking out our <a href='index.html#services'>services page</a> or <a href='blog.html'>blog</a>. You can also <a href='index.html#contact'>contact our team</a> directly for personalized assistance. Is there anything specific I can help you with?";
    }
  }

  // Show welcome notification after 3 seconds
  setTimeout(() => {
    if (!isOpen && badge) {
      badge.style.display = 'flex';
      badge.classList.add('pulse');
    }
  }, 3000);

});
