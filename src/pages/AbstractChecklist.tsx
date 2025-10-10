import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div<{ theme: any }>`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.primary};
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ theme: any; variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  background: ${props => props.variant === 'secondary' ? props.theme.secondary : props.theme.primary};
  color: white;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.shadowHover};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ChecklistContainer = styled.div<{ theme: any }>`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
`;

const ChecklistHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    color: #1a1f2e;
    margin-bottom: 0.5rem;
    font-weight: 700;
    
    @media print {
      font-size: 1.5rem;
      color: black;
    }
  }
  
  p {
    color: #666;
    font-size: 1rem;
    
    @media print {
      color: black;
      font-size: 0.9rem;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  
  th, td {
    border: 1px solid #000;
    padding: 1rem;
    text-align: left;
    vertical-align: top;
  }
  
  th {
    background-color: #6D94C5;
    color: white;
    font-weight: 600;
    font-size: 0.95rem;
    
    @media print {
      background-color: white !important;
      color: black !important;
      border: 1px solid #000 !important;
    }
  }
  
  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
    
    @media print {
      background-color: white !important;
    }
  }
  
  .section-header {
    background-color: #FFFFFF;
    font-weight: 700;
    font-size: 0.9rem;
    color: #1a1f2e;
    
    @media print {
      background-color: white !important;
      color: black !important;
      font-weight: 700;
    }
  }
  
  .item-number {
    font-weight: 600;
    color: #1a1f2e;
    font-size: 0.85rem;
    
    @media print {
      color: black !important;
    }
  }
  
  .item-description {
    color: #333;
    line-height: 1.6;
    font-size: 0.85rem;
    
    @media print {
      color: black !important;
    }
  }
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    
    @media print {
      border: none !important;
      padding: 0 !important;
      font-size: 0.85rem !important;
    }
  }
`;

const AbstractChecklist = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const checklistRef = useRef<HTMLDivElement>(null);
  
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  
  const handleResponseChange = (itemNumber: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [itemNumber]: value
    }));
  };
  
  const downloadAsPDF = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    if (checklistRef.current) {
      // Temporarily apply print styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .checklist-print th {
          background-color: white !important;
          color: black !important;
        }
        .checklist-print tbody tr {
          background-color: white !important;
        }
        .checklist-print .section-header {
          background-color: white !important;
          color: black !important;
        }
        .checklist-print input[type="text"] {
          border: none !important;
          background: transparent !important;
        }
      `;
      document.head.appendChild(styleElement);
      checklistRef.current.classList.add('checklist-print');
      
      // Small delay to apply styles
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(checklistRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      // Remove temporary styles
      checklistRef.current.classList.remove('checklist-print');
      document.head.removeChild(styleElement);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'letter'); // Changed to 'l' for landscape orientation
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const availableWidth = pdfWidth - (2 * margin);
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (imgHeight > pdfHeight - (2 * margin)) {
        let position = 0;
        let pageCount = 0;
        
        while (position < imgHeight) {
          if (pageCount > 0) {
            pdf.addPage();
          }
          
          const remainingHeight = imgHeight - position;
          const pageImageHeight = Math.min(pdfHeight - (2 * margin), remainingHeight);
          
          const srcY = (position / imgHeight) * canvas.height;
          const srcHeight = (pageImageHeight / imgHeight) * canvas.height;
          
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
          
          position += pdfHeight - (2 * margin);
          pageCount++;
        }
      } else {
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      }
      
      pdf.save('chart-abstract-checklist.pdf');
    }
  };
  
  const downloadAsWord = async () => {
    const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, BorderStyle, AlignmentType, HeadingLevel } = await import('docx');
    const { saveAs } = await import('file-saver');
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'CHART Abstract Checklist', bold: true, size: 32 })],
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Reporting Checklist for Chatbot Health Advice Study Abstracts', size: 24 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Header row
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Heading', bold: true, color: 'FFFFFF' })] })],
                    width: { size: 18, type: WidthType.PERCENTAGE },
                    shading: { fill: '6D94C5' },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Item #', bold: true, color: 'FFFFFF' })] })],
                    width: { size: 8, type: WidthType.PERCENTAGE },
                    shading: { fill: '6D94C5' },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Item', bold: true, color: 'FFFFFF' })] })],
                    width: { size: 46, type: WidthType.PERCENTAGE },
                    shading: { fill: '6D94C5' },
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Page #', bold: true, color: 'FFFFFF' })] })],
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: '6D94C5' },
                  }),
                ],
              }),
              // Data rows
              ...checklistItems.flatMap((section) => [
                // Section header row
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: section.section, bold: true })] })],
                      columnSpan: 4,
                      shading: { fill: 'FFFFFF' },
                    }),
                  ],
                }),
                // Section items
                ...section.items.map((item) => 
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph(item.label)],
                        width: { size: 18, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph(item.number)],
                        width: { size: 8, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph(item.description)],
                        width: { size: 46, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph('')],
                        width: { size: 28, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  })
                ),
              ]),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
        ],
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'chart-abstract-checklist.docx');
  };
  
  const checklistItems = [
    { section: 'Background', items: [
      { number: '2a', label: '', description: 'State the scientific background, rationale, and healthcare context for evaluating the generative AI-driven chatbot(s), referencing relevant literature when applicable.' },
      { number: '2b', label: '', description: 'State the aims and research questions including the target audience, intervention, comparator(s), and outcome(s).' }
    ]},
    { section: 'Methods', items: [
      { number: '3a', label: 'Model Identifiers', description: 'State the name and version identifier(s) of the generative AI model(s) and chatbot(s) under evaluation, as well as their date of release or last update.' },
      { number: '3b', label: '', description: 'State whether generative AI model(s) and chatbot(s) are open-source versus closed-source/proprietary.' },
      { number: '4a', label: 'Model Details', description: 'State whether the generative AI model was a base model or a novel base model, tuned model, or fine-tuned model.' },
      { number: '5a', label: 'Prompt Engineering', description: 'Describe the evolution of study prompt development.' },
      { number: '5ai', label: '', description: 'Describe the sources of prompts.' },
      { number: '5aii', label: '', description: 'State the number and characteristics of the individual(s) involved in prompt engineering.' },
      { number: '5aiii', label: '', description: 'Provide details of any patient and public involvement during prompt engineering.' },
      { number: '6a', label: 'Query Strategy', description: 'State route of access to generative AI model.' },
      { number: '6b', label: '', description: 'State the date(s) and location(s) of queries for the generative AI-driven chatbot(s) including the day, month, and year as well as city and country.' },
      { number: '7a', label: 'Performance Evaluation', description: 'Define the ground truth or reference standard used to define successful generative AI-driven chatbot performance.' },
      { number: '7b', label: '', description: 'Describe the process undertaken for the performance evaluation of the generative AI-driven chatbot(s).' },
      { number: '8', label: 'Sample Size', description: 'Report how the sample size was determined.' },
      { number: '9a', label: 'Data Analysis', description: 'Describe statistical analysis methods, including any evaluation of reproducibility of generative AI-driven chatbot responses.' }
    ]},
    { section: 'Results', items: [
      { number: '10a', label: '', description: 'Report the alignment between generative AI-driven chatbot output and ground truth or reference standard using quantitative or mixed methods approaches as applicable.' }
    ]}
  ];
  
  return (
    <PageContainer>
      <PageHeader theme={theme}>
        <h1>CHART Abstract Checklist</h1>
        <p>Complete the abstract checklist items and save as PDF</p>
      </PageHeader>
      
      <ActionButtons>
        <Button theme={theme} variant="primary" onClick={downloadAsWord}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
          </svg>
          Download Blank Word Document
        </Button>
        <Button 
          theme={theme} 
          variant="secondary"
          onClick={() => navigate('/abstractchecklist-information')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          More Information
        </Button>
      </ActionButtons>
      
      <ChecklistContainer ref={checklistRef} theme={theme}>
        <ChecklistHeader>
          <h2>CHART Abstract Checklist</h2>
          <p>Reporting Checklist for Chatbot Health Advice Study Abstracts</p>
        </ChecklistHeader>
        
        <Table>
          <thead>
            <tr>
              <th style={{ width: '18%' }}>Heading</th>
              <th style={{ width: '8%' }}>Item #</th>
              <th style={{ width: '46%' }}>Item</th>
              <th style={{ width: '28%' }}>Page #</th>
            </tr>
          </thead>
          <tbody>
            {checklistItems.map((section, sectionIndex) => (
              <>
                <tr key={`section-${sectionIndex}`}>
                  <td className="section-header" colSpan={4}>{section.section}</td>
                </tr>
                {section.items.map((item, itemIndex) => (
                  <tr key={`item-${sectionIndex}-${itemIndex}`}>
                    <td>{item.label}</td>
                    <td className="item-number">{item.number}</td>
                    <td className="item-description">{item.description}</td>
                    <td>
                      <input
                        type="text"
                        value={responses[item.number] || ''}
                        onChange={(e) => handleResponseChange(item.number, e.target.value)}
                        placeholder="Enter page #"
                      />
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </Table>
      </ChecklistContainer>
      
      <ActionButtons>
        <Button theme={theme} variant="primary" onClick={downloadAsPDF}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <path d="M7 10l5 5 5-5"/>
            <path d="M12 15V3"/>
          </svg>
          Save as PDF
        </Button>
      </ActionButtons>
    </PageContainer>
  );
};

export default AbstractChecklist;
