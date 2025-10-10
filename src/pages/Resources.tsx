import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div<{ theme: any }>`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3rem;
    color: ${props => props.theme.primary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const ResourceDetailed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
`;

const ResourceItem = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.primary};
  }
`;

const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ResourceIcon = styled.svg<{ theme: any }>`
  width: 48px;
  height: 48px;
  color: ${props => props.theme.primary};
  flex-shrink: 0;
`;

const ResourceMeta = styled.div<{ theme: any }>`
  h2 {
    font-size: 1.8rem;
    color: ${props => props.theme.text};
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.9rem;
    color: ${props => props.theme.textSecondary};
    font-weight: 500;
  }
`;

const ResourceDescription = styled.p<{ theme: any }>`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
`;

const ResourceActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Button = styled.a<{ theme: any; variant?: 'primary' | 'secondary' }>`
  ${buttonStyles}
  background: ${props => props.variant === 'secondary' ? props.theme.secondary : props.theme.primary};
  color: white;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.shadowHover};
    background: ${props => props.variant === 'secondary' ? props.theme.secondaryHover : props.theme.primaryHover};
  }
`;

const ButtonLink = styled(Link)<{ theme: any; variant?: 'primary' | 'secondary' }>`
  ${buttonStyles}
  background: ${props => props.variant === 'secondary' ? props.theme.secondary : props.theme.primary};
  color: white;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.shadowHover};
    background: ${props => props.variant === 'secondary' ? props.theme.secondaryHover : props.theme.primaryHover};
  }
`;

const Resources = () => {
  const { theme } = useTheme();

  const resources = [
    {
      title: 'Full Checklist',
      type: 'Word Document',
      description: 'A comprehensive checklist that provides complete guidance for conducting and reporting chatbot health advice studies. Includes detailed criteria for transparent reporting.',
      pdfLink: '/Full Checklist.pdf',
      docxLink: '/Full Checklist.docx',
      fillLink: '/fullchecklist',
      icon: (
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/>
      )
    },
    {
      title: 'Abstract Checklist',
      type: 'Word Document',
      description: 'A refined version of the full checklist, tailored for researchers to use when writing abstracts for CHA studies ensuring concise and transparent communication to a broad audience.',
      pdfLink: '/Abstract Checklist.pdf',
      docxLink: '/Abstract Checklist.docx',
      fillLink: '/abstractchecklist',
      icon: (
        <><path d="M9 11l3 3l8-8"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03"/></>
      )
    },
    {
      title: 'Methodological Flow Diagram',
      type: 'Diagram',
      description: 'A visual flowchart that illustrates the systematic process of chatbot health advice (CHA) study development.',
      pdfLink: '/Methodological Diagram.pdf',
      docxLink: '/Methodological Diagram.docx',
      fillLink: '/diagram',
      icon: (
        <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M12 8v8 M8 12h8 M16 16l-4-4-4 4"/></>
      )
    }
  ];

  return (
    <PageContainer>
      <PageHeader theme={theme}>
        <h1>Resources</h1>
        <p>Access all CHART materials and documentation</p>
      </PageHeader>
      
      <ResourceDetailed>
        {resources.map((resource, index) => (
          <ResourceItem
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ResourceHeader>
              <ResourceIcon theme={theme} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {resource.icon}
              </ResourceIcon>
              <ResourceMeta theme={theme}>
                <h2>{resource.title}</h2>
                <span>{resource.type}</span>
              </ResourceMeta>
            </ResourceHeader>
            
            <ResourceDescription theme={theme}>
              {resource.description}
            </ResourceDescription>
            
            <ResourceActions>
              <ButtonLink to={resource.fillLink} theme={theme} variant="primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                {resource.title === 'Methodological Flow Diagram' ? 'Fill Diagram' : 'Fill Document'}
              </ButtonLink>
              
              <Button 
                href={resource.docxLink} 
                theme={theme} 
                variant="secondary"
                download
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <path d="M7 10l5 5 5-5"/>
                  <path d="M12 15V3"/>
                </svg>
                Download Word Document
              </Button>
              
              <Button href={resource.pdfLink} theme={theme} variant="secondary" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6"/>
                </svg>
                View PDF
              </Button>
              
              {resource.title !== 'Methodological Flow Diagram' && (
                <ButtonLink 
                  to={resource.title === 'Full Checklist' ? '/fullchecklist-information' : '/abstractchecklist-information'}
                  theme={theme} 
                  variant="secondary"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  More Information
                </ButtonLink>
              )}
            </ResourceActions>
          </ResourceItem>
        ))}
      </ResourceDetailed>
    </PageContainer>
  );
};

export default Resources;
