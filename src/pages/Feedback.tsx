import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PageContainer = styled.div<{ theme: any }>`
  padding: 4rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  color: ${props => props.theme.text};
`;

const PageHeader = styled.div<{ theme: any }>`
  text-align: center;
  margin-bottom: 2rem;
  
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

const FeedbackIntro = styled.p<{ theme: any }>`
  background: ${props => props.theme.surfaceAlt};
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.primary};
  margin-bottom: 2.5rem;
  line-height: 1.7;
  color: ${props => props.theme.text};
`;

const FeedbackForm = styled(motion.form)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 3rem;
`;

const FormGroup = styled.div<{ theme: any }>`
  margin-bottom: 2rem;
  
  label {
    display: block;
    font-weight: 600;
    color: ${props => props.theme.text};
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid ${props => props.theme.border};
    border-radius: 6px;
    background: ${props => props.theme.surfaceAlt};
    color: ${props => props.theme.text};
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
    }
    
    &::placeholder {
      color: ${props => props.theme.textMuted};
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const RatingGroup = styled.div<{ theme: any }>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  input[type="radio"] {
    display: none;
    
    &:checked + label {
      background: ${props => props.theme.primary};
      color: white;
      border-color: ${props => props.theme.primary};
    }
  }
  
  label {
    padding: 0.75rem 1.5rem;
    border: 2px solid ${props => props.theme.border};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    margin-bottom: 0;
    
    &:hover {
      border-color: ${props => props.theme.primary};
      background: ${props => props.theme.primary}15;
    }
  }
`;

const CheckboxGroup = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 0;
    
    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const FormActions = styled.div<{ theme: any }>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Button = styled.button<{ theme: any; variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.variant === 'secondary' ? `
    background: ${props.theme.surfaceAlt};
    color: ${props.theme.text};
    border: 2px solid ${props.theme.border};
    
    &:hover {
      background: ${props.theme.surface};
      border-color: ${props.theme.primary};
    }
  ` : `
    background: ${props.theme.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.primaryHover};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${props.theme.shadowHover};
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;

const FeedbackInfo = styled.div<{ theme: any }>`
  margin-top: 3rem;
  
  h2 {
    color: ${props => props.theme.primary};
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 700;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoItem = styled(motion.div)<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${props => props.theme.shadowHover};
  }
`;

const InfoIcon = styled.div<{ theme: any }>`
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

const InfoTitle = styled.h3<{ theme: any }>`
  color: ${props => props.theme.primary};
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const InfoDescription = styled.p<{ theme: any }>`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
`;

const SuccessMessage = styled.div<{ theme: any }>`
  background: #2D7A4F;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(45, 122, 79, 0.3);
`;

const Feedback = () => {
  const { theme } = useTheme();
  const [showEmailField, setShowEmailField] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      // Remove the success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowEmailField(e.target.checked);
    if (!e.target.checked) {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      if (emailInput) emailInput.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Get rating
    const rating = formData.get('rating');
    
    // Get useful resources
    const usefulResources = formData.getAll('useful').join(', ') || 'None selected';
    
    // Get comments
    const comments = formData.get('comments') || 'No comments provided';
    
    // Get follow-up preference
    const followUp = formData.get('followUp') === 'yes' ? 'Yes' : 'No';
    const email = formData.get('email') || 'Not provided';
    
    // Create email body
    const emailBody = `
CHART Feedback Submission

Rating: ${rating}

Most Useful Resources: ${usefulResources}

Comments and Suggestions:
${comments}

Follow-up Requested: ${followUp}
${followUp === 'Yes' ? `Contact Email: ${email}` : ''}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:brighthuo@dal.ca?subject=CHART Feedback Submission&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    e.currentTarget.reset();
    setShowEmailField(false);
  };
  
  return (
    <PageContainer theme={theme}>
      <PageHeader theme={theme}>
        <h1>Feedback</h1>
        <p>We value your experience using the CHART guidelines</p>
      </PageHeader>
      
      {showSuccess && (
        <SuccessMessage theme={theme}>
          ✓ Thank you for your feedback! Your submission has been received.
        </SuccessMessage>
      )}
      
      <FeedbackIntro theme={theme}>
        Your feedback helps us improve and expand our resources for the research community. Please share your experience, suggestions, or any challenges you encountered while using the CHART reporting guideline.
      </FeedbackIntro>
      
      <FeedbackForm
        theme={theme}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <FormGroup theme={theme}>
          <label htmlFor="experience">Rate your overall experience *</label>
          <RatingGroup theme={theme}>
            <input type="radio" id="rating5" name="rating" value="5" required />
            <label htmlFor="rating5">Excellent</label>
            <input type="radio" id="rating4" name="rating" value="4" required />
            <label htmlFor="rating4">Good</label>
            <input type="radio" id="rating3" name="rating" value="3" required />
            <label htmlFor="rating3">Average</label>
            <input type="radio" id="rating2" name="rating" value="2" required />
            <label htmlFor="rating2">Poor</label>
            <input type="radio" id="rating1" name="rating" value="1" required />
            <label htmlFor="rating1">Very Poor</label>
          </RatingGroup>
        </FormGroup>
        
        <FormGroup theme={theme}>
          <label htmlFor="mostUseful">Which resource was most useful?</label>
          <CheckboxGroup theme={theme}>
            <label>
              <input type="checkbox" id="useful-full" name="useful" value="full-checklist" />
              Full Checklist
            </label>
            <label>
              <input type="checkbox" id="useful-flow" name="useful" value="flow-diagram" />
              Flow Diagram
            </label>
            <label>
              <input type="checkbox" id="useful-abstract" name="useful" value="abstract-checklist" />
              Abstract Checklist
            </label>
          </CheckboxGroup>
        </FormGroup>
        
        <FormGroup theme={theme}>
          <label htmlFor="comments">Comments and suggestions</label>
          <textarea
            id="comments"
            name="comments"
            rows={6}
            placeholder="Please share your experience, suggestions for improvement, or any challenges you encountered..."
          />
        </FormGroup>
        
        <FormGroup theme={theme}>
          <CheckboxGroup theme={theme}>
            <label>
              <input
                type="checkbox"
                id="followUp"
                name="followUp"
                value="yes"
                onChange={handleFollowUpChange}
              />
              I would like to be contacted for follow-up
            </label>
          </CheckboxGroup>
        </FormGroup>
        
        {showEmailField && (
          <FormGroup theme={theme}>
            <label htmlFor="email">Email address for follow-up *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required={showEmailField}
            />
          </FormGroup>
        )}
        
        <FormActions theme={theme}>
          <Button type="submit" theme={theme} variant="primary">
            Submit Feedback
          </Button>
          <Button type="reset" theme={theme} variant="secondary">
            Clear Form
          </Button>
        </FormActions>
      </FeedbackForm>
      
      <FeedbackInfo theme={theme}>
        <h2>Why Your Feedback Matters</h2>
        <InfoGrid>
          <InfoItem
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InfoIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </InfoIcon>
            <InfoTitle theme={theme}>Improve Usability</InfoTitle>
            <InfoDescription theme={theme}>
              Your input helps us identify areas where the guidelines can be clearer or more user-friendly.
            </InfoDescription>
          </InfoItem>
          
          <InfoItem
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </InfoIcon>
            <InfoTitle theme={theme}>Enhance Quality</InfoTitle>
            <InfoDescription theme={theme}>
              Feedback from real users ensures our guidelines remain relevant and effective for the research community.
            </InfoDescription>
          </InfoItem>
          
          <InfoItem
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <InfoIcon theme={theme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </InfoIcon>
            <InfoTitle theme={theme}>Guide Development</InfoTitle>
            <InfoDescription theme={theme}>
              Your suggestions help us prioritize future updates and new resources for the CHART framework.
            </InfoDescription>
          </InfoItem>
        </InfoGrid>
      </FeedbackInfo>
    </PageContainer>
  );
};

export default Feedback;
