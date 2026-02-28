import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic',
      description: 'Essential tools for individual creators starting their AI journey.',
      price: '9',
      credits: '6K credits/quarter',
      features: [
        '3500 credits per month',
        'Up to ~700 Image Generations/month',
        'Up to ~115 Video Generations/month',
        'General Commercial Terms',
        'Image Generations Visibility: Public',
        '4 concurrent Image Generations',
        '1 concurrent Video Generation'
      ],
      isPopular: false,
      dark: true
    },
    {
      name: 'Standard',
      description: 'Enhanced features for creators seeking more flexibility and support',
      price: '25',
      credits: '24K credits/quarter',
      features: [
        '8000 credits per month',
        'Up to ~1600 Image Generations/month',
        'Up to ~265 Video Generations/month',
        'General Commercial Terms',
        'Image Generation Visibility: Public',
        '8 concurrent Image Generations',
        '2 concurrent Video Generations'
      ],
      isPopular: false,
      dark: true
    },
    {
      name: 'Ultimate',
      description: 'Advanced tools and privacy for professionals maximizing productivity.',
      price: '41',
      credits: '48K credits/quarter',
      features: [
        '16000 credits per month',
        'Up to ~3200 Image Generations/month',
        'Up to ~530 Video Generations/month',
        'All styles and models',
        'General Commercial Terms',
        'Image Generation Visibility: Private',
        '12 Concurrent Image Generations',
        '3 concurrent Video Generations',
        'Priority Support'
      ],
      isPopular: true,
      dark: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="pricing-section">
      <motion.div 
        className="pricing-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {plans.map((plan, index) => (
          <motion.div 
            key={index} 
            variants={cardVariants}
            whileHover={{ y: -10, scale: plan.isPopular ? 1.05 : 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`pricing-card ${plan.dark ? 'card-dark' : 'card-light'} ${plan.isPopular ? 'popular' : ''}`}
            style={{ 
              ...(plan.isPopular ? { boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)', border: '1px solid rgba(16, 185, 129, 0.5)' } : {})
            }}
          >
            {plan.isPopular && <div className="badge" style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>Best Value</div>}
            <div className="card-header">
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>
              <div className="price-container">
                <span className="currency">$</span>
                <span className="price">{plan.price}</span>
                <div className="billing">
                  <span className="period">/month</span>
                  <span className="billed">Billed quarterly</span>
                </div>
              </div>
              <p className="credits-text">{plan.credits}</p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cta-btn ${plan.dark ? 'btn-outline' : 'btn-solid'}`}
            >
              Get Started
            </motion.button>
            
            <div className="features-section">
              <h3 className="features-title">What's included</h3>
              <ul className="features-list">
                {plan.features.map((feature, fIndex) => (
                  <motion.li 
                    key={fIndex} 
                    className="feature-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * fIndex, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Check size={18} className="check-icon" style={{ color: plan.dark ? '#10b981' : '#06b6d4', flexShrink: 0 }} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PricingSection;
