// AURA AI - Advanced Analytics & Performance Tracking
// Million-dollar analytics system for user behavior and app performance

// User behavior tracking
export class AnalyticsEngine {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.events = [];
    this.startTime = Date.now();
    this.isInitialized = false;
  }

  // Initialize analytics with user context
  initialize(userId, userTier) {
    this.userId = userId;
    this.userTier = userTier;
    this.isInitialized = true;
    
    // Track session start
    this.track('session_start', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    });

    // Track page visibility changes
    this.setupVisibilityTracking();
    
    // Track performance metrics
    this.trackPerformanceMetrics();
  }

  // Generate unique session ID
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Core event tracking
  track(eventName, properties = {}) {
    if (!this.isInitialized && eventName !== 'session_start') return;

    const event = {
      id: this.generateEventId(),
      sessionId: this.sessionId,
      userId: this.userId,
      userTier: this.userTier,
      eventName,
      timestamp: new Date().toISOString(),
      properties: {
        ...properties,
        page: window.location.pathname,
        referrer: document.referrer,
        sessionDuration: Date.now() - this.startTime
      }
    };

    this.events.push(event);
    
    // Store locally for offline support
    this.storeEventLocally(event);
    
    // Send to analytics service (in production)
    this.sendToAnalytics(event);
    
    console.log(`📊 Analytics: ${eventName}`, properties);
  }

  // Generate unique event ID
  generateEventId() {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Conversation analytics
  trackConversationStart(modelId, trigger = 'manual') {
    this.track('conversation_start', {
      modelId,
      trigger, // manual, quick_starter, suggestion
      timestamp: Date.now()
    });
  }

  trackMessage(messageData) {
    this.track('message_sent', {
      messageLength: messageData.content.length,
      messageType: messageData.role,
      modelId: messageData.model,
      topic: messageData.topic,
      emotionalTone: messageData.emotionalTone,
      confidence: messageData.confidence,
      responseTime: messageData.responseTime || null
    });
  }

  trackConversationEnd(conversationData) {
    this.track('conversation_end', {
      conversationId: conversationData.id,
      messageCount: conversationData.messageCount,
      duration: Date.now() - conversationData.startTime,
      satisfaction: conversationData.satisfaction || null,
      topics: conversationData.insights?.topicAnalysis?.dominant,
      emotions: conversationData.insights?.emotionalJourney?.dominant
    });
  }

  // User engagement tracking
  trackScreenView(screenName, properties = {}) {
    this.track('screen_view', {
      screenName,
      previousScreen: this.currentScreen || null,
      ...properties
    });
    this.currentScreen = screenName;
  }

  trackFeatureUsage(featureName, context = {}) {
    this.track('feature_used', {
      featureName,
      context,
      userTier: this.userTier
    });
  }

  trackUserAction(action, target, context = {}) {
    this.track('user_action', {
      action, // click, scroll, hover, focus, etc.
      target, // button_id, element_type, etc.
      context
    });
  }

  // Subscription and monetization tracking
  trackSubscriptionEvent(eventType, subscriptionData) {
    this.track('subscription_event', {
      eventType, // view_pricing, start_trial, upgrade, downgrade, cancel
      fromTier: subscriptionData.fromTier,
      toTier: subscriptionData.toTier,
      price: subscriptionData.price,
      currency: subscriptionData.currency,
      billingPeriod: subscriptionData.billingPeriod
    });
  }

  trackConversionFunnel(funnelStep, funnelName, success = true) {
    this.track('conversion_funnel', {
      funnelName,
      funnelStep,
      success,
      userTier: this.userTier
    });
  }

  // Error and performance tracking
  trackError(error, context = {}) {
    this.track('error_occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      errorType: error.name,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }

  trackPerformanceMetrics() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.track('performance_metric', {
          metric: 'largest_contentful_paint',
          value: lastEntry.startTime,
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.track('performance_metric', {
            metric: 'first_input_delay',
            value: entry.processingStart - entry.startTime,
            rating: entry.processingStart - entry.startTime < 100 ? 'good' : 
                   entry.processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor'
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.track('performance_metric', {
          metric: 'cumulative_layout_shift',
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.track('performance_metric', {
        metric: 'page_load_time',
        value: loadTime,
        rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs_improvement' : 'poor'
      });
    });
  }

  // Track page visibility for engagement
  setupVisibilityTracking() {
    let visibilityStart = Date.now();
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const visibleDuration = Date.now() - visibilityStart;
        this.track('page_visibility', {
          state: 'hidden',
          visibleDuration
        });
      } else {
        visibilityStart = Date.now();
        this.track('page_visibility', {
          state: 'visible'
        });
      }
    });
  }

  // Store events locally for offline support
  storeEventLocally(event) {
    try {
      const localEvents = JSON.parse(localStorage.getItem('aura_analytics_events') || '[]');
      localEvents.push(event);
      
      // Keep only last 1000 events locally
      const trimmedEvents = localEvents.slice(-1000);
      localStorage.setItem('aura_analytics_events', JSON.stringify(trimmedEvents));
    } catch (error) {
      console.error('Error storing analytics event locally:', error);
    }
  }

  // Send to analytics service (placeholder for production)
  sendToAnalytics(event) {
    // In production, send to your analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, Custom API
    
    if (window.gtag) {
      // Google Analytics 4
      window.gtag('event', event.eventName, {
        custom_user_id: event.userId,
        session_id: event.sessionId,
        user_tier: event.userTier,
        ...event.properties
      });
    }

    if (window.mixpanel) {
      // Mixpanel
      window.mixpanel.track(event.eventName, {
        distinct_id: event.userId,
        session_id: event.sessionId,
        user_tier: event.userTier,
        ...event.properties
      });
    }

    // Custom analytics API
    if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
      fetch(process.env.REACT_APP_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(error => {
        console.error('Error sending analytics event:', error);
      });
    }
  }

  // Get analytics insights for display
  getSessionInsights() {
    const sessionEvents = this.events.filter(e => e.sessionId === this.sessionId);
    
    return {
      sessionDuration: Date.now() - this.startTime,
      eventCount: sessionEvents.length,
      messagesExchanged: sessionEvents.filter(e => e.eventName === 'message_sent').length,
      screensViewed: sessionEvents.filter(e => e.eventName === 'screen_view').length,
      featuresUsed: [...new Set(sessionEvents.filter(e => e.eventName === 'feature_used').map(e => e.properties.featureName))],
      errors: sessionEvents.filter(e => e.eventName === 'error_occurred').length
    };
  }

  // Export user data (GDPR compliance)
  exportUserData() {
    return {
      userId: this.userId,
      sessionId: this.sessionId,
      events: this.events.filter(e => e.userId === this.userId),
      insights: this.getSessionInsights(),
      exportedAt: new Date().toISOString()
    };
  }

  // Clear user data (GDPR compliance)
  clearUserData() {
    this.events = this.events.filter(e => e.userId !== this.userId);
    localStorage.removeItem('aura_analytics_events');
    this.track('data_cleared', { reason: 'user_request' });
  }
}

// A/B Testing system
export class ABTestingEngine {
  constructor() {
    this.experiments = new Map();
    this.userVariants = new Map();
  }

  // Define an experiment
  defineExperiment(experimentName, variants, trafficAllocation = 1.0) {
    this.experiments.set(experimentName, {
      variants,
      trafficAllocation,
      createdAt: Date.now()
    });
  }

  // Get user's variant for an experiment
  getVariant(experimentName, userId) {
    if (!this.experiments.has(experimentName)) {
      return 'control';
    }

    // Check if user already has a variant
    const userKey = `${experimentName}_${userId}`;
    if (this.userVariants.has(userKey)) {
      return this.userVariants.get(userKey);
    }

    const experiment = this.experiments.get(experimentName);
    
    // Check traffic allocation
    const userHash = this.hashString(userId + experimentName);
    const trafficThreshold = experiment.trafficAllocation * 100;
    
    if (userHash % 100 >= trafficThreshold) {
      this.userVariants.set(userKey, 'control');
      return 'control';
    }

    // Assign variant
    const variantIndex = userHash % experiment.variants.length;
    const variant = experiment.variants[variantIndex];
    
    this.userVariants.set(userKey, variant);
    
    // Track experiment exposure
    analytics.track('experiment_exposure', {
      experimentName,
      variant,
      userId
    });

    return variant;
  }

  // Simple hash function for deterministic assignment
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Track experiment conversion
  trackConversion(experimentName, userId, conversionType = 'primary') {
    const variant = this.getVariant(experimentName, userId);
    
    analytics.track('experiment_conversion', {
      experimentName,
      variant,
      conversionType,
      userId
    });
  }
}

// Create global analytics instance
export const analytics = new AnalyticsEngine();
export const abTesting = new ABTestingEngine();

// Convenience functions for common tracking
export const trackPageView = (pageName, properties = {}) => {
  analytics.trackScreenView(pageName, properties);
};

export const trackUserInteraction = (element, action = 'click', context = {}) => {
  analytics.trackUserAction(action, element, context);
};

export const trackConversion = (type, value = null, currency = 'USD') => {
  analytics.track('conversion', {
    type,
    value,
    currency,
    timestamp: Date.now()
  });
};

export const trackFeature = (featureName, context = {}) => {
  analytics.trackFeatureUsage(featureName, context);
};

// Performance monitoring hooks
export const usePerformanceMonitoring = () => {
  const measureRenderTime = (componentName) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      analytics.track('component_render_time', {
        componentName,
        renderTime: endTime - startTime
      });
    };
  };

  const measureAsyncOperation = async (operationName, asyncFunction) => {
    const startTime = performance.now();
    
    try {
      const result = await asyncFunction();
      const endTime = performance.now();
      
      analytics.track('async_operation_complete', {
        operationName,
        duration: endTime - startTime,
        success: true
      });
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      
      analytics.track('async_operation_complete', {
        operationName,
        duration: endTime - startTime,
        success: false,
        error: error.message
      });
      
      throw error;
    }
  };

  return { measureRenderTime, measureAsyncOperation };
};
