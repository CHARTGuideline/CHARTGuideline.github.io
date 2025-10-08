import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';

const PageContainer = styled.div`
  padding: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div<{ theme: any }>`
  text-align: center;
  margin-bottom: 1rem;
  
  h1 {
    font-size: 2rem;
    color: ${props => props.theme.primary};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.95rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const TopActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.5rem;
  flex: 1;
  overflow: hidden;
  min-height: 0;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

const FormSection = styled.div<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  min-height: 0;
  max-height: 100%;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surfaceAlt};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }
`;

const DiagramSection = styled.div<{ theme: any }>`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  max-height: 100%;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.surfaceAlt};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }
`;

const SectionTitle = styled.h4<{ theme: any }>`
  color: ${props => props.theme.primary};
  font-size: 1.1rem;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${props => props.theme.border};
  
  &:first-of-type {
    margin-top: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label<{ theme: any }>`
  display: block;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
`;

const Input = styled.input<{ theme: any }>`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 6px;
  background: ${props => props.theme.surfaceAlt};
  color: ${props => props.theme.text};
  font-size: 0.85rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
  
  &::placeholder {
    color: ${props => props.theme.textMuted};
    font-size: 0.8rem;
  }
`;

const DiagramPreview = styled.div<{ theme: any }>`
  flex: 1;
  overflow: visible;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
  padding: 1.5rem;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

const DiagramRow = styled.div`
  display: grid;
  grid-template-columns: 0.35fr auto 0.35fr;
  gap: 0.6rem;
  width: 100%;
  max-width: 680px;
  align-items: center;
  position: relative;
  margin: -70px 0 2px 0;
`;


const DiagramBox = styled.div<{ theme: any; variant?: 'header' | 'left' | 'right' | 'center' }>`
  background: ${props => props.variant === 'header' ? 'white' : '#A7CBFF'};
  color: ${props => props.variant === 'header' ? '#1a1f2e' : '#1a1f2e'};
  border: 2px solid #000;
  border-radius: 0px;
  padding: 0.65rem 0.75rem;
  font-size: 0.8rem;
  line-height: 1.4;
  min-height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  word-wrap: break-word;
  
  ${props => props.variant === 'header' && `
    font-weight: 700;
    font-size: 0.9rem;
    grid-column: 1 / -1;
    padding: 0.75rem;
    text-align: center;
    justify-content: center;
    border-radius: 10px;
  `}
  
  ${props => props.variant === 'center' && `
    grid-column: 1 / -1;
  `}
`;

// CenterBox and Connector were unused; removed to clean up lint errors.

const SplitArrow = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  margin: 0.25rem auto;
  position: relative;
  z-index: 1;
  
  svg {
    width: 100%;
    height: 70px;
  }
`;

const ActionButtons = styled.div<{ theme: any }>`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.primary}33;
`;

const Button = styled.button<{ theme: any; variant?: 'primary' | 'secondary' | 'reset' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.variant === 'reset' ? `
    background: ${props.theme.textMuted};
    color: white;
  ` : props.variant === 'secondary' ? `
    background: ${props.theme.secondary};
    color: white;
  ` : `
    background: ${props.theme.primary};
    color: white;
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.shadowHover};
    opacity: 0.9;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const Diagram = () => {
  const { theme } = useTheme();
  const diagramRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    // Diagram title
    diagramTitle: 'Methodological Flow Diagram',
    
    // Chatbot section
    totalChatbots: '',
    chatbotNames: '',
    baseModel: '',
    novelBaseModel: '',
    tunedModel: '',
    fineTunedModel: '',
    openSource: '',
    closedSource: '',
    subscription: '',
    api: '',
    other: '',
    
    // Prompt Engineering section
    promptEngineers: '',
    investigatorDerived: '',
    clinicianDerived: '',
    patientDerived: '',
    promptSources: '',
    totalPrompts: '',
    followUpPrompts: '',
    
    // Query section
    queryDates: '',
    chatSessions: '',
    locations: '',
    languages: '',
    
    // Performance Evaluation section
    evaluators: '',
    patientPublic: '',
    automated: '',
    modelOutputResponses: '',
    valid: '',
    missingInvalid: '',
    
    // Reproducibility section
    repeatQueries: '',
    reproducibilityDates: '',
    reproducibilityLocations: '',
    discrepancies: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleReset = () => {
    setFormData({
      diagramTitle: 'Methodological Flow Diagram',
      totalChatbots: '',
      chatbotNames: '',
      baseModel: '',
      novelBaseModel: '',
      tunedModel: '',
      fineTunedModel: '',
      openSource: '',
      closedSource: '',
      subscription: '',
      api: '',
      other: '',
      promptEngineers: '',
      investigatorDerived: '',
      clinicianDerived: '',
      patientDerived: '',
      promptSources: '',
      totalPrompts: '',
      followUpPrompts: '',
      queryDates: '',
      chatSessions: '',
      locations: '',
      languages: '',
      evaluators: '',
      patientPublic: '',
      automated: '',
      modelOutputResponses: '',
      valid: '',
      missingInvalid: '',
      repeatQueries: '',
      reproducibilityDates: '',
      reproducibilityLocations: '',
      discrepancies: ''
    });
  };
  
  const downloadAsPDF = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    if (diagramRef.current) {
      // Temporarily remove the scale transform for accurate capture
      const parentContainer = diagramRef.current.parentElement;
      const originalTransform = parentContainer ? parentContainer.style.transform : '';
      
      if (parentContainer) {
        parentContainer.style.transform = 'none';
      }
      
      // Small delay to ensure DOM updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Capture the entire diagram at high quality
      const canvas = await html2canvas(diagramRef.current, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        scrollX: 0
      });
      
      // Restore original transform
      if (parentContainer) {
        parentContainer.style.transform = originalTransform;
      }
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'letter'); // portrait, US letter (8.5 x 11)
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions with margins
      const margin = 10; // 10mm margins
      const availableWidth = pdfWidth - (2 * margin);
      const availableHeight = pdfHeight - (2 * margin);
      
      // Calculate image dimensions to fit within available space
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // If image is taller than one page, split across multiple pages
      if (imgHeight > availableHeight) {
        let position = 0;
        let pageCount = 0;
        
        while (position < imgHeight) {
          if (pageCount > 0) {
            pdf.addPage();
          }
          
          // Calculate how much of the image fits on this page
          const remainingHeight = imgHeight - position;
          const pageImageHeight = Math.min(availableHeight, remainingHeight);
          
          // Calculate source dimensions for cropping
          const srcY = (position / imgHeight) * canvas.height;
          const srcHeight = (pageImageHeight / imgHeight) * canvas.height;
          
          // Create a temporary canvas for this page's slice
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = canvas.width;
          tempCanvas.height = srcHeight;
          const tempCtx = tempCanvas.getContext('2d');
          
          if (tempCtx) {
            tempCtx.drawImage(
              canvas,
              0, srcY, canvas.width, srcHeight,
              0, 0, canvas.width, srcHeight
            );
            
            const pageImgData = tempCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImageHeight);
          }
          
          position += availableHeight;
          pageCount++;
        }
      } else {
        // Image fits on one page - center it vertically
        const y = margin + (availableHeight - imgHeight) / 2;
        pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
      }
      
      pdf.save('chart-methodological-diagram.pdf');
    }
  };
  
  const downloadAsJPG = async () => {
    const html2canvas = (await import('html2canvas')).default;
    
    if (diagramRef.current) {
      // Temporarily remove the scale transform for accurate capture
      const parentContainer = diagramRef.current.parentElement;
      const originalTransform = parentContainer ? parentContainer.style.transform : '';
      
      if (parentContainer) {
        parentContainer.style.transform = 'none';
      }
      
      // Small delay to ensure DOM updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(diagramRef.current, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        scrollX: 0
      });
      
      // Restore original transform
      if (parentContainer) {
        parentContainer.style.transform = originalTransform;
      }
      
      const link = document.createElement('a');
      link.download = 'chart-methodological-diagram.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    }
  };
  
  const downloadAsWord = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const { Document, Packer, Paragraph, TextRun, ImageRun } = await import('docx');
    const { saveAs } = await import('file-saver');
    
    if (diagramRef.current) {
      // Capture diagram as image
      const parentContainer = diagramRef.current.parentElement;
      const originalTransform = parentContainer ? parentContainer.style.transform : '';
      
      if (parentContainer) {
        parentContainer.style.transform = 'none';
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(diagramRef.current, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        scrollX: 0
      });
      
      if (parentContainer) {
        parentContainer.style.transform = originalTransform;
      }
      
      // Convert canvas to blob
      const imageBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      
      const arrayBuffer = await imageBlob.arrayBuffer();
      
      // Create Word document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.diagramTitle || 'Methodological Flow Diagram',
                  bold: true,
                  size: 32, // 16pt
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: new Uint8Array(arrayBuffer),
                  transformation: {
                    width: 600,
                    height: (canvas.height * 600) / canvas.width,
                  },
                  type: 'png',
                }),
              ],
            }),
          ],
        }],
      });
      
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'chart-methodological-diagram.docx');
    }
  };
  
  const downloadAsSVG = async () => {
    alert('SVG export coming soon! Use PDF or JPG for now.');
  };
  
  return (
    <PageContainer>
      <PageHeader theme={theme}>
        <h1>CHART Methodological Diagram Builder</h1>
        <p>Fill in your study details to create a customized flowchart</p>
      </PageHeader>
      
      <TopActionButtons>
        <Button theme={theme} variant="primary" onClick={downloadAsWord}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
          </svg>
          Download as Word Document
        </Button>
      </TopActionButtons>
      
      <MainContent>
        <FormSection theme={theme}>
          <SectionTitle theme={theme}>Diagram Title</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Title</Label>
            <Input theme={theme} type="text" name="diagramTitle" value={formData.diagramTitle} onChange={handleChange} placeholder="Methodological Flow Diagram" />
          </FormGroup>
          
          <SectionTitle theme={theme}>Chatbot Information</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Total chatbots (n=)</Label>
            <Input theme={theme} type="text" name="totalChatbots" value={formData.totalChatbots} onChange={handleChange} placeholder="e.g., 3" />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Name(s) and version identifier(s)</Label>
            <Input theme={theme} type="text" name="chatbotNames" value={formData.chatbotNames} onChange={handleChange} placeholder="e.g., GPT-4, Claude 3" />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Base model (n=)</Label>
            <Input theme={theme} type="text" name="baseModel" value={formData.baseModel} onChange={handleChange} placeholder="e.g., 2" />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Novel base model (n=)</Label>
            <Input theme={theme} type="text" name="novelBaseModel" value={formData.novelBaseModel} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Tuned model (n=)</Label>
            <Input theme={theme} type="text" name="tunedModel" value={formData.tunedModel} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Fine-tuned model (n=)</Label>
            <Input theme={theme} type="text" name="fineTunedModel" value={formData.fineTunedModel} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Open-source (n=)</Label>
            <Input theme={theme} type="text" name="openSource" value={formData.openSource} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Closed-source/proprietary (n=)</Label>
            <Input theme={theme} type="text" name="closedSource" value={formData.closedSource} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Subscription (n=)</Label>
            <Input theme={theme} type="text" name="subscription" value={formData.subscription} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>API (n=)</Label>
            <Input theme={theme} type="text" name="api" value={formData.api} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Other (n=)</Label>
            <Input theme={theme} type="text" name="other" value={formData.other} onChange={handleChange} />
          </FormGroup>
          
          <SectionTitle theme={theme}>Prompt Engineering</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Prompt engineers (n=)</Label>
            <Input theme={theme} type="text" name="promptEngineers" value={formData.promptEngineers} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Investigator-derived (n=)</Label>
            <Input theme={theme} type="text" name="investigatorDerived" value={formData.investigatorDerived} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Clinician-derived (n=)</Label>
            <Input theme={theme} type="text" name="clinicianDerived" value={formData.clinicianDerived} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Patient-derived (n=)</Label>
            <Input theme={theme} type="text" name="patientDerived" value={formData.patientDerived} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Prompt sources (n=)</Label>
            <Input theme={theme} type="text" name="promptSources" value={formData.promptSources} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Total prompts (n=)</Label>
            <Input theme={theme} type="text" name="totalPrompts" value={formData.totalPrompts} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Follow-up prompts (n=)</Label>
            <Input theme={theme} type="text" name="followUpPrompts" value={formData.followUpPrompts} onChange={handleChange} />
          </FormGroup>
          
          <SectionTitle theme={theme}>Query</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Date(s) of query (mm/dd/yyyy)</Label>
            <Input theme={theme} type="text" name="queryDates" value={formData.queryDates} onChange={handleChange} placeholder="e.g., 10/04/2025" />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Chat sessions (n=)</Label>
            <Input theme={theme} type="text" name="chatSessions" value={formData.chatSessions} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Location(s)</Label>
            <Input theme={theme} type="text" name="locations" value={formData.locations} onChange={handleChange} placeholder="e.g., Canada, USA" />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Language(s)</Label>
            <Input theme={theme} type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="e.g., English" />
          </FormGroup>
          
          <SectionTitle theme={theme}>Performance Evaluation</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Evaluators (n=)</Label>
            <Input theme={theme} type="text" name="evaluators" value={formData.evaluators} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Patient/public (n=)</Label>
            <Input theme={theme} type="text" name="patientPublic" value={formData.patientPublic} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Automated (n=)</Label>
            <Input theme={theme} type="text" name="automated" value={formData.automated} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Model output/responses (n=)</Label>
            <Input theme={theme} type="text" name="modelOutputResponses" value={formData.modelOutputResponses} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Valid (n=)</Label>
            <Input theme={theme} type="text" name="valid" value={formData.valid} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Missing/invalid (n=)</Label>
            <Input theme={theme} type="text" name="missingInvalid" value={formData.missingInvalid} onChange={handleChange} />
          </FormGroup>
          
          <SectionTitle theme={theme}>Reproducibility</SectionTitle>
          
          <FormGroup>
            <Label theme={theme}>Repeat queries (n=)</Label>
            <Input theme={theme} type="text" name="repeatQueries" value={formData.repeatQueries} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Date(s) of query (mm/dd/yyyy)</Label>
            <Input theme={theme} type="text" name="reproducibilityDates" value={formData.reproducibilityDates} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Location(s)</Label>
            <Input theme={theme} type="text" name="reproducibilityLocations" value={formData.reproducibilityLocations} onChange={handleChange} />
          </FormGroup>
          
          <FormGroup>
            <Label theme={theme}>Discrepancies (n=)</Label>
            <Input theme={theme} type="text" name="discrepancies" value={formData.discrepancies} onChange={handleChange} />
          </FormGroup>
          
          <ActionButtons theme={theme}>
            <Button theme={theme} variant="primary" onClick={downloadAsPDF}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <path d="M7 10l5 5 5-5"/>
                <path d="M12 15V3"/>
              </svg>
              PDF
            </Button>
            <Button theme={theme} variant="primary" onClick={downloadAsJPG}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <path d="M7 10l5 5 5-5"/>
                <path d="M12 15V3"/>
              </svg>
              JPG
            </Button>
            <Button theme={theme} variant="secondary" onClick={downloadAsSVG}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <path d="M7 10l5 5 5-5"/>
                <path d="M12 15V3"/>
              </svg>
              SVG
            </Button>
            <Button theme={theme} variant="reset" onClick={handleReset}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              Reset
            </Button>
          </ActionButtons>
        </FormSection>
        
        <DiagramSection theme={theme}>
          <h3 style={{ marginBottom: '0.75rem', color: theme.primary, textAlign: 'center', fontSize: '1rem' }}>
            Live Preview
          </h3>
          <DiagramPreview theme={theme}>
            <DiagramContainer ref={diagramRef}>
              
              {/* Title */}
              <h2 style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '1.2rem', color: '#1a1f2e' }}>
                {formData.diagramTitle || 'Methodological Flow Diagram'}
              </h2>
              
              {/* Chatbot Section */}
              <DiagramBox theme={theme} variant="header">
                Total generative AI-driven chatbot(s) (n={formData.totalChatbots || ' '})
                <br />
                Name(s) and version identifier(s): {formData.chatbotNames || ' '}
              </DiagramBox>
              
              <SplitArrow theme={theme}>
                <svg viewBox="0 0 640 70" preserveAspectRatio="none">
                  {/* Single vertical line through entire height */}
                  <line x1="320" y1="0" x2="320" y2="70" stroke="#000" strokeWidth="2.5"/>
                  
                  {/* Left branch - horizontal line with left-pointing arrowhead */}
                  <line x1="320" y1="35" x2="220" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="220,35 227,32 227,38" fill="#000"/>
                  
                  {/* Right branch - horizontal line with right-pointing arrowhead */}
                  <line x1="320" y1="35" x2="420" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="420,35 413,32 413,38" fill="#000"/>
                  
                  {/* Downward arrowhead at bottom */}
                  <polygon points="320,70 313,63 327,63" fill="#000"/>
                </svg>
              </SplitArrow>
              
              <DiagramRow>
                <DiagramBox theme={theme} variant="left">
                  Base model (n={formData.baseModel || ' '})
                  <br />
                  Novel base model (n={formData.novelBaseModel || ' '})
                  <br />
                  Tuned model (n={formData.tunedModel || ' '})
                  <br />
                  Fine-tuned model (n={formData.fineTunedModel || ' '})
                </DiagramBox>
                
                <div></div>
                
                <DiagramBox theme={theme} variant="right">
                  Open-source (n={formData.openSource || ' '})
                  <br />
                  Closed-source/proprietary (n={formData.closedSource || ' '})
                  <br />
                  Subscription (n={formData.subscription || ' '})
                  <br />
                  API (n={formData.api || ' '})
                  <br />
                  Other (n={formData.other || ' '})
                </DiagramBox>
              </DiagramRow>
              
              {/* Prompt Engineering Section */}
              <DiagramBox theme={theme} variant="header">
                Prompt engineering
              </DiagramBox>
              
              <SplitArrow theme={theme}>
                <svg viewBox="0 0 640 70" preserveAspectRatio="none">
                  {/* Single vertical line through entire height */}
                  <line x1="320" y1="0" x2="320" y2="70" stroke="#000" strokeWidth="2.5"/>
                  
                  {/* Left branch - horizontal line with left-pointing arrowhead */}
                  <line x1="320" y1="35" x2="220" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="220,35 227,32 227,38" fill="#000"/>
                  
                  {/* Right branch - horizontal line with right-pointing arrowhead */}
                  <line x1="320" y1="35" x2="420" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="420,35 413,32 413,38" fill="#000"/>
                  
                  {/* Downward arrowhead at bottom */}
                  <polygon points="320,70 313,63 327,63" fill="#000"/>
                </svg>
              </SplitArrow>
              
              <DiagramRow>
                <DiagramBox theme={theme} variant="left">
                  Prompt engineers (n={formData.promptEngineers || ' '})
                  <br />
                  Investigator-derived (n={formData.investigatorDerived || ' '})
                  <br />
                  Clinician-derived (n={formData.clinicianDerived || ' '})
                  <br />
                  Patient-derived (n={formData.patientDerived || ' '})
                </DiagramBox>
                
                <div></div>
                
                <DiagramBox theme={theme} variant="right">
                  Prompt sources (n={formData.promptSources || ' '})
                  <br />
                  Total prompts (n={formData.totalPrompts || ' '})
                  <br />
                  Follow-up prompts (n={formData.followUpPrompts || ' '})
                </DiagramBox>
              </DiagramRow>
              
              {/* Query Section */}
              <DiagramBox theme={theme} variant="header">
                Query
              </DiagramBox>
              
              <SplitArrow theme={theme}>
                <svg viewBox="0 0 640 70" preserveAspectRatio="none">
                  {/* Single vertical line through entire height */}
                  <line x1="320" y1="0" x2="320" y2="70" stroke="#000" strokeWidth="2.5"/>
                  
                  {/* Left branch only - horizontal line with left-pointing arrowhead */}
                  <line x1="320" y1="35" x2="220" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="220,35 227,32 227,38" fill="#000"/>
                  
                  {/* Downward arrowhead at bottom */}
                  <polygon points="320,70 313,63 327,63" fill="#000"/>
                </svg>
              </SplitArrow>
              
              <DiagramRow>
                <DiagramBox theme={theme} variant="left">
                  Date(s) of query (mm/dd/yyyy): {formData.queryDates || ' '}
                  <br />
                  Chat sessions (n={formData.chatSessions || ' '})
                  <br />
                  Location(s): {formData.locations || ' '}
                  <br />
                  Language(s): {formData.languages || ' '}
                </DiagramBox>
                
                <div></div>
                <div></div>
              </DiagramRow>
              
              {/* Performance Evaluation Section */}
              <DiagramBox theme={theme} variant="header">
                Performance evaluation
              </DiagramBox>
              
              <SplitArrow theme={theme}>
                <svg viewBox="0 0 640 70" preserveAspectRatio="none">
                  {/* Single vertical line through entire height */}
                  <line x1="320" y1="0" x2="320" y2="70" stroke="#000" strokeWidth="2.5"/>
                  
                  {/* Left branch - horizontal line with left-pointing arrowhead */}
                  <line x1="320" y1="35" x2="220" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="220,35 227,32 227,38" fill="#000"/>
                  
                  {/* Right branch - horizontal line with right-pointing arrowhead */}
                  <line x1="320" y1="35" x2="420" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="420,35 413,32 413,38" fill="#000"/>
                  
                  {/* Downward arrowhead at bottom */}
                  <polygon points="320,70 313,63 327,63" fill="#000"/>
                </svg>
              </SplitArrow>
              
              <DiagramRow>
                <DiagramBox theme={theme} variant="left">
                  Evaluators (n={formData.evaluators || ' '})
                  <br />
                  Patient/public (n={formData.patientPublic || ' '})
                  <br />
                  Automated (n={formData.automated || ' '})
                </DiagramBox>
                
                <div></div>
                
                <DiagramBox theme={theme} variant="right">
                  Model output/responses (n={formData.modelOutputResponses || ' '})
                  <br />
                  Valid (n={formData.valid || ' '})
                  <br />
                  Missing/invalid (n={formData.missingInvalid || ' '})
                </DiagramBox>
              </DiagramRow>
              
              {/* Reproducibility Section */}
              <DiagramBox theme={theme} variant="header">
                Reproducibility
              </DiagramBox>
              
              <SplitArrow theme={theme}>
                <svg viewBox="0 0 640 70" preserveAspectRatio="none">
                  {/* Vertical line ending at horizontal branches */}
                  <line x1="320" y1="0" x2="320" y2="35" stroke="#000" strokeWidth="2.5"/>
                  
                  {/* Left branch - horizontal line with left-pointing arrowhead */}
                  <line x1="320" y1="35" x2="220" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="220,35 227,32 227,38" fill="#000"/>
                  
                  {/* Right branch - horizontal line with right-pointing arrowhead */}
                  <line x1="320" y1="35" x2="420" y2="35" stroke="#000" strokeWidth="2.5"/>
                  <polygon points="420,35 413,32 413,38" fill="#000"/>
                </svg>
              </SplitArrow>
              
              <DiagramRow>
                <DiagramBox theme={theme} variant="left">
                  Repeat queries (n={formData.repeatQueries || ' '})
                </DiagramBox>
                
                <div></div>
                
                <DiagramBox theme={theme} variant="right">
                  Date(s) of query (mm/dd/yyyy): {formData.reproducibilityDates || ' '}
                  <br />
                  Location(s): {formData.reproducibilityLocations || ' '}
                  <br />
                  Discrepancies (n={formData.discrepancies || ' '})
                </DiagramBox>
              </DiagramRow>
              
            </DiagramContainer>
          </DiagramPreview>
        </DiagramSection>
      </MainContent>
    </PageContainer>
  );
};

export default Diagram;
