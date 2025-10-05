import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import logo from './CHARTlogo.jpg';

const FooterContainer = styled.footer<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-top: 1px solid ${props => props.theme.border};
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div<{ theme?: any }>`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div<{ theme?: any }>`
  h4 {
    color: ${props => props.theme.primary};
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  p, a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;
    line-height: 1.8;
    font-size: 0.9rem;
  }
  
  a:hover {
    color: ${props => props.theme.primary};
  }
`;

const Copyright = styled.div<{ theme?: any }>`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const Footer = () => {
  const { theme } = useTheme();

  return (
    <FooterContainer theme={theme}>
      <div style={{ maxWidth: 1200, margin: '0 auto 1rem', display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="CHART logo" style={{ height: 56, width: 'auto' }} />
      </div>
      <FooterContent>
        <FooterSection theme={theme}>
          <h4>About CHART</h4>
          <p>
            Advancing the quality of chatbot health advice studies through transparent reporting.
          </p>
        </FooterSection>
        <FooterSection theme={theme}>
          <h4>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="/resources">Resources</a>
            <a href="/about">About</a>
            <a href="/citation">Citation</a>
            <a href="/feedback">Feedback</a>
          </div>
        </FooterSection>
        <FooterSection theme={theme}>
          <h4>Contact</h4>
          <p>For questions about the CHART guideline:</p>
          <a href="mailto:bright.huo@dal.ca">bright.huo@dal.ca</a>
        </FooterSection>
      </FooterContent>
      <Copyright theme={theme}>
        © {new Date().getFullYear()} CHART Collaboration. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
