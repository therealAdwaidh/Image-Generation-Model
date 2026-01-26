import React from 'react';

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

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${plan.dark ? 'card-dark' : 'card-light'} ${plan.isPopular ? 'popular' : ''}`}
          >
            {plan.isPopular && <div className="badge">Best Value</div>}
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
            
            <button className={`cta-btn ${plan.dark ? 'btn-outline' : 'btn-solid'}`}>
              Get Started
            </button>
            
            <div className="features-section">
              <h3 className="features-title">What's included</h3>
              <ul className="features-list">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="feature-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
