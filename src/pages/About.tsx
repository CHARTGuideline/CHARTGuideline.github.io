import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled.div<{ theme: any }>`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${props => props.theme.text};
`;

const PageHeader = styled.div<{ theme: any }>`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3rem;
    color: ${props => props.theme.primary};
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContentBlock = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${props => props.theme.shadowHover};
  }
  
  h2 {
    color: ${props => props.theme.primary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    color: ${props => props.theme.textSecondary};
    line-height: 1.8;
    font-size: 1.05rem;
  }
`;

const HighlightSection = styled.div<{ theme: any }>`
  background: ${props => props.theme.gradient};
  border-radius: 16px;
  padding: 3rem 2rem;
  margin-top: 3rem;
  box-shadow: 0 8px 24px ${props => props.theme.shadow};
  
  h2 {
    color: white;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2.5rem;
    font-weight: 700;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureItem = styled(motion.div)<{ theme: any }>`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div<{ theme: any }>`
  width: 64px;
  height: 64px;
  background: ${props => props.theme.primary}15;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    width: 32px;
    height: 32px;
    stroke: ${props => props.theme.primary};
  }
`;

const FeatureTitle = styled.h3<{ theme: any }>`
  color: ${props => props.theme.primary};
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p<{ theme: any }>`
  color: ${props => props.theme.text};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const About = () => {
  const { theme } = useTheme();
  
  return (
    <PageContainer theme={theme}>
      <PageHeader theme={theme}>
        <h1>About CHART</h1>
        <p>Understanding the development and purpose of the CHART reporting guideline</p>
      </PageHeader>
      
      <ContentGrid>
        <ContentBlock
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Filling a Critical Gap</h2>
          <p>
            Gap exists in published studies but nothing to standardize reporting so that they can possibly be implemented later
          </p>
        </ContentBlock>
        
        <ContentBlock
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>Our Mission</h2>
          <p>
            Transparent and standardized reporting of chatbot health advice studies to improve research quality and facilitate implementation.
          </p>
        </ContentBlock>
        
        <ContentBlock
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Development Process</h2>
          <p>
            Began with a comprehensive scoping review to identify use cases, then an anonymous online Delphi Consensus meeting, then hybrid meeting with global multidisciplinary experts.
          </p>
        </ContentBlock>
      </ContentGrid>
      
      <HighlightSection theme={theme}>
        <h2>Key Features of CHART</h2>
        <FeaturesGrid>
          <FeatureItem
            theme={theme}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FeatureIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle theme={theme}>Evidence-Based</FeatureTitle>
            <FeatureDescription theme={theme}>
              Developed through a comprehensive scoping review and multiple expert consensus rounds including a Delphi consensus
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem
            theme={theme}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FeatureIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle theme={theme}>Comprehensive</FeatureTitle>
            <FeatureDescription theme={theme}>
              Covers all aspects of chatbot health advice study reporting
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem
            theme={theme}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <FeatureIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-3-3m0-1a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle theme={theme}>User-Friendly</FeatureTitle>
            <FeatureDescription theme={theme}>
              Designed for researchers, reviewers, readers and journal editors to easily understand if standards have been met
            </FeatureDescription>
          </FeatureItem>
        </FeaturesGrid>
      </HighlightSection>
    </PageContainer>
  );
};

export default About;
