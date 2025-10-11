import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { useState } from 'react';
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

const CitationBlock = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  
  h2 {
    color: ${props => props.theme.primary};
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
`;

const CitationBox = styled.div<{ theme: any }>`
  background: ${props => props.theme.surfaceAlt};
  border: 2px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const CitationControls = styled.div<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  label {
    font-weight: 600;
    color: ${props => props.theme.text};
  }
  
  select {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.border};
    background: ${props => props.theme.surface};
    color: ${props => props.theme.text};
    font-size: 1rem;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
    }
  }
`;

const CitationText = styled.p<{ theme: any }>`
  background: ${props => props.theme.surface};
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.borderLight};
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  word-wrap: break-word;
`;

const CopyButton = styled.button<{ theme: any }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: ${props => props.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadowHover};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const JournalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const JournalItem = styled.div<{ theme: any; featured?: boolean }>`
  background: ${props => props.featured ? props.theme.primary : props.theme.surfaceAlt};
  border: 1px solid ${props => props.featured ? props.theme.primary : props.theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  
  ${props => props.featured && `
    box-shadow: 0 8px 24px ${props.theme.shadowHover};
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.primary};
  }
  
  h3 {
    color: ${props => props.featured ? 'white' : props.theme.text};
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

const FeaturedBadge = styled.span<{ theme: any }>`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const JournalLink = styled.a<{ theme: any; featured?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.featured ? 'white' : props.theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    color: ${props => props.featured ? 'rgba(255, 255, 255, 0.8)' : props.theme.primaryHover};
    text-decoration: underline;
  }
`;

const Citation = () => {
  const { theme } = useTheme();
  const [citationFormat, setCitationFormat] = useState('ama');
  const [selectedArticle, setSelectedArticle] = useState('bmj-medicine-ee');
  const [copySuccess, setCopySuccess] = useState(false);
  
  const articleCitations = {
    'bmj-medicine-ee': {
      ama: 'Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine. 2025;4:e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      vancouver: 'Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine. 2025;4:e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      apa: 'CHART Collaborative. (2025). Reporting guideline for chatbot health advice studies: The Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine, 4, e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      mla: 'CHART Collaborative. "Reporting Guideline for Chatbot Health Advice Studies: The Chatbot Assessment Reporting Tool (CHART) Statement." BMJ Medicine, vol. 4, 2025, e001632. doi:10.1136/bmjmed-2025-001632.'
    },
    'annals-family-medicine': {
      ama: 'Reporting Guideline for Chatbot Health Advice Studies: Chatbot Assessment Reporting Tool (CHART) Statement. The Annals of Family Medicine. 2025;23(5):389-398. doi:https://doi.org/10.1370/afm.250386',
      vancouver: 'Reporting Guideline for Chatbot Health Advice Studies: Chatbot Assessment Reporting Tool (CHART) Statement. The Annals of Family Medicine. 2025;23(5):389-398. doi:https://doi.org/10.1370/afm.250386',
      apa: 'CHART Collaborative. (2025). Reporting Guideline for Chatbot Health Advice Studies: Chatbot Assessment Reporting Tool (CHART) Statement. The Annals of Family Medicine, 23(5), 389-398. https://doi.org/10.1370/afm.250386',
      mla: 'CHART Collaborative. "Reporting Guideline for Chatbot Health Advice Studies: Chatbot Assessment Reporting Tool (CHART) Statement." The Annals of Family Medicine, vol. 23, no. 5, 2025, pp. 389-398. doi:10.1370/afm.250386.'
    },
    'artificial-intelligence-medicine': {
      ama: 'Huo B, Collins G, Chartash D, et al. Reporting guideline for chatbot health advice studies: The CHART statement. Artificial Intelligence in Medicine. 2025;168:103222. doi:https://doi.org/10.1016/j.artmed.2025.103222',
      vancouver: 'Huo B, Collins G, Chartash D, et al. Reporting guideline for chatbot health advice studies: The CHART statement. Artificial Intelligence in Medicine. 2025;168:103222. doi:https://doi.org/10.1016/j.artmed.2025.103222',
      apa: 'Huo, B., Collins, G., Chartash, D., et al. (2025). Reporting guideline for chatbot health advice studies: The CHART statement. Artificial Intelligence in Medicine, 168, 103222. https://doi.org/10.1016/j.artmed.2025.103222',
      mla: 'Huo, B., et al. "Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement." Artificial Intelligence in Medicine, vol. 168, 2025, 103222. doi:10.1016/j.artmed.2025.103222.'
    },
    'bjs': {
      ama: 'The CHART Collaborative, Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement, BJS, Volume 112, Issue 8, August 2025, znaf142, https://doi.org/10.1093/bjs/znaf142',
      vancouver: 'The CHART Collaborative. Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BJS. 2025;112(8):znaf142. https://doi.org/10.1093/bjs/znaf142',
      apa: 'The CHART Collaborative. (2025). Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BJS, 112(8), znaf142. https://doi.org/10.1093/bjs/znaf142',
      mla: 'The CHART Collaborative. "Reporting Guideline for Chatbot Health Advice Studies: The Chatbot Assessment Reporting Tool (CHART) Statement." BJS, vol. 112, no. 8, Aug. 2025, znaf142. doi:10.1093/bjs/znaf142.'
    },
    'bmj': {
      ama: 'Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine. 2025;4:e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      vancouver: 'Reporting guideline for chatbot health advice studies: the Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine. 2025;4:e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      apa: 'CHART Collaborative. (2025). Reporting guideline for chatbot health advice studies: The Chatbot Assessment Reporting Tool (CHART) statement. BMJ Medicine, 4, e001632. https://doi.org/10.1136/bmjmed-2025-001632',
      mla: 'CHART Collaborative. "Reporting Guideline for Chatbot Health Advice Studies: The Chatbot Assessment Reporting Tool (CHART) Statement." BMJ Medicine, vol. 4, 2025, e001632. doi:10.1136/bmjmed-2025-001632.'
    },
    'bmc-medicine': {
      ama: 'Huo, B., Collins, G., Chartash, D. et al. Reporting guideline for Chatbot Health Advice studies: the CHART statement. BMC Med 23, 447 (2025). https://doi.org/10.1186/s12916-025-04274-w',
      vancouver: 'Huo B, Collins G, Chartash D, et al. Reporting guideline for Chatbot Health Advice studies: the CHART statement. BMC Med. 2025;23:447. https://doi.org/10.1186/s12916-025-04274-w',
      apa: 'Huo, B., Collins, G., Chartash, D., et al. (2025). Reporting guideline for Chatbot Health Advice studies: the CHART statement. BMC Medicine, 23, 447. https://doi.org/10.1186/s12916-025-04274-w',
      mla: 'Huo, B., et al. "Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement." BMC Medicine, vol. 23, 2025, 447. doi:10.1186/s12916-025-04274-w.'
    },
    'jama-network-open': {
      ama: 'The CHART Collaborative. Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement. JAMA Netw Open. 2025;8(8):e2530220. doi:10.1001/jamanetworkopen.2025.30220',
      vancouver: 'The CHART Collaborative. Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement. JAMA Netw Open. 2025;8(8):e2530220. doi:10.1001/jamanetworkopen.2025.30220',
      apa: 'The CHART Collaborative. (2025). Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement. JAMA Network Open, 8(8), e2530220. https://doi.org/10.1001/jamanetworkopen.2025.30220',
      mla: 'The CHART Collaborative. "Reporting Guideline for Chatbot Health Advice Studies: The CHART Statement." JAMA Network Open, vol. 8, no. 8, 2025, e2530220. doi:10.1001/jamanetworkopen.2025.30220.'
    }
  };
  
  const articleOptions = [
    { value: 'bmj-medicine-ee', label: 'BMJ Medicine (E&E)' },
    { value: 'annals-family-medicine', label: 'Annals of Family Medicine' },
    { value: 'artificial-intelligence-medicine', label: 'Artificial Intelligence in Medicine' },
    { value: 'bjs', label: 'BJS' },
    { value: 'bmj', label: 'BMJ' },
    { value: 'bmc-medicine', label: 'BMC Medicine' },
    { value: 'jama-network-open', label: 'JAMA Network Open' }
  ];
  
  const citations = articleCitations[selectedArticle as keyof typeof articleCitations];
  
  const mainArticle = {
    name: 'BMJ Medicine (E&E)',
    url: 'https://bmjmedicine.bmj.com/content/4/1/e001632',
    featured: true
  };

  const disseminationJournals = [
    { name: 'Annals of Family Medicine', url: 'https://www.annfammed.org/content/early/2025/07/29/afm.250386' },
    { name: 'Artificial Intelligence in Medicine', url: 'https://www.sciencedirect.com/science/article/pii/S0933365725001575?via%3Dihub' },
    { name: 'BJS', url: 'https://academic.oup.com/bjs/article/112/8/znaf142/8220472?login=true' },
    { name: 'BMC Medicine', url: 'https://bmcmedicine.biomedcentral.com/articles/10.1186/s12916-025-04274-w' },
    { name: 'BMJ', url: 'https://www.bmj.com/content/390/bmj-2024-083305' },
    { name: 'JAMA Network Open', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2837224' }
  ];
  
  const copyCitation = () => {
    navigator.clipboard.writeText(citations[citationFormat as keyof typeof citations]);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  return (
    <PageContainer theme={theme}>
      <PageHeader theme={theme}>
        <h1>Cite CHART</h1>
      </PageHeader>
      
      <CitationBlock
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CitationBox theme={theme}>
          <CitationControls theme={theme}>
            <label htmlFor="articleSelect">Article:</label>
            <select 
              id="articleSelect" 
              value={selectedArticle}
              onChange={(e) => setSelectedArticle(e.target.value)}
            >
              {articleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </CitationControls>
          <CitationControls theme={theme}>
            <label htmlFor="citationFormat">Citation Format:</label>
            <select 
              id="citationFormat" 
              value={citationFormat}
              onChange={(e) => setCitationFormat(e.target.value)}
            >
              <option value="ama">AMA (Default)</option>
              <option value="vancouver">Vancouver</option>
              <option value="apa">APA</option>
              <option value="mla">MLA</option>
            </select>
          </CitationControls>
          <CitationText theme={theme}>
            {citations[citationFormat as keyof typeof citations]}
          </CitationText>
          <CopyButton theme={theme} onClick={copyCitation}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            {copySuccess ? 'Copied!' : 'Copy Citation'}
          </CopyButton>
        </CitationBox>
      </CitationBlock>
      
      <CitationBlock
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Publications</h2>
        <JournalsGrid>
          <JournalItem theme={theme} featured={true}>
            <FeaturedBadge theme={theme}>Explanation and Elaboration Article</FeaturedBadge>
            <h3>{mainArticle.name}</h3>
            <JournalLink href={mainArticle.url} target="_blank" rel="noopener noreferrer" theme={theme} featured={true}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              View Article
            </JournalLink>
          </JournalItem>
          {disseminationJournals.map((journal, index) => (
            <JournalItem key={index} theme={theme}>
              <h3>{journal.name}</h3>
              <JournalLink href={journal.url} target="_blank" rel="noopener noreferrer" theme={theme}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                View Article
              </JournalLink>
            </JournalItem>
          ))}
        </JournalsGrid>
      </CitationBlock>
    </PageContainer>
  );
};

export default Citation;
