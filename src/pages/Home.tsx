import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = styled(motion.div)<{ theme: any }>`
  text-align: center;
  padding: 6rem 2rem;
  background: ${props => props.theme.gradient};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Title = styled.h1<{ theme: any }>`
  font-size: 4rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p<{ theme: any }>`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
`;

const Description = styled.p<{ theme: any }>`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const ResourceGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ResourceCard = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.border};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.primary};
  }
  
  h3 {
    color: ${props => props.theme.primary};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.textSecondary};
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const ButtonLink = styled(Link)<{ theme: any }>`
  display: inline-block;
  background: ${props => props.theme.primary};
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  
  &:hover {
    background: ${props => props.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadowHover};
  }
`;

const ButtonDownload = styled.a<{ theme: any }>`
  display: inline-block;
  background: ${props => props.theme.primary};
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadowHover};
  }
`;

const Home = () => {
  const { theme } = useTheme();

  const resources = [
    {
      title: 'CHART Checklist',
      description: 'Comprehensive checklist for chatbot health advice study authors',
      link: '/Full Checklist.docx',
      isDownload: true
    },
    {
      title: 'Methodological Diagram',
      description: 'Visual flowchart for transparent reporting of study components',
      link: '/diagram',
      isDownload: false
    },
    {
      title: 'Abstract Checklist',
      description: 'Concise checklist for chatbot health advice study abstracts',
      link: '/Abstract Checklist.docx',
      isDownload: true
    }
  ];

  return (
    <>
      <Hero
        theme={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Title theme={theme}>CHART</Title>
        <Subtitle theme={theme}>Chatbot Assessment Reporting Tool</Subtitle>
        <Description theme={theme}>
          This reporting guideline aims to improve the transparency of studies evaluating 
          the performance of generative AI-driven chatbots for the purposes of summarising 
          clinical evidence and providing health advice.
        </Description>
      </Hero>
      
      <ResourceGrid>
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            {resource.isDownload ? (
              <ButtonDownload href={resource.link} theme={theme} download>
                Download →
              </ButtonDownload>
            ) : (
              <ButtonLink to={resource.link} theme={theme}>
                Fill it Out →
              </ButtonLink>
            )}
          </ResourceCard>
        ))}
      </ResourceGrid>
    </>
  );
};

export default Home;
