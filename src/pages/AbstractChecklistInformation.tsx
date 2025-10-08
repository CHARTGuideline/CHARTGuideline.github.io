import { useTheme } from '../contexts/ThemeContext';
import styled from '@emotion/styled';
import { useState } from 'react';
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

const BackButton = styled.button<{ theme: any }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${props => props.theme.secondary};
  color: white;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  margin-bottom: 2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.shadowHover};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SectionContainer = styled.div<{ theme: any }>`
  background: white;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.border};
  overflow: hidden;
`;

const SectionHeader = styled.div<{ theme: any }>`
  background: ${props => props.theme.primary};
  color: white;
  padding: 1.5rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: ${props => props.theme.primaryDark || props.theme.primary};
  }
`;

const SubsectionContainer = styled.div<{ theme: any; isOpen: boolean }>`
  max-height: ${props => props.isOpen ? 'none' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemContainer = styled.div<{ theme: any }>`
  border-bottom: 1px solid ${props => props.theme.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.button<{ theme: any; isOpen: boolean; level?: 'subsection' | 'subitem' }>`
  width: 100%;
  padding: ${props => props.level === 'subitem' ? '1rem 3rem' : '1.5rem 2rem'};
  background: ${props => props.isOpen ? '#f8f9fa' : 'white'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  border-left: ${props => props.level === 'subitem' ? '4px solid #e9ecef' : 'none'};
  
  &:hover {
    background: #f8f9fa;
  }
`;

const ItemNumber = styled.span<{ theme: any; level?: 'section' | 'subsection' | 'subitem' }>`
  font-weight: 700;
  color: ${props => props.theme.primary};
  font-size: ${props => {
    if (props.level === 'section') return '1.3rem';
    if (props.level === 'subsection') return '1.1rem';
    return '1rem';
  }};
  min-width: ${props => props.level === 'section' ? '50px' : '40px'};
`;

const ItemTitle = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1f2e;
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-size: 0.95rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }
`;

const ExpandIcon = styled.span<{ isOpen: boolean }>`
  font-size: 1.2rem;
  color: #666;
  transition: transform 0.2s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ItemContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #f8f9fa;
`;

const ItemDetails = styled.div`
  padding: 2rem;
  border-top: 1px solid #e9ecef;
  
  h4 {
    color: #1a1f2e;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }
  
  p {
    color: #444;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    font-size: 0.95rem;
  }
  
  ul {
    color: #444;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }
  }
  
  .example {
    background: #e8f4f8;
    border-left: 4px solid #17a2b8;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    
    strong {
      color: #17a2b8;
    }
  }
`;

const AbstractChecklistInformation = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});
  
  const toggleItem = (itemNumber: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemNumber]: !prev[itemNumber]
    }));
  };
  
  const checklistSections = [
    {
      number: '2',
      section: 'Introduction',
      subsections: [
        {
          number: '2a',
          label: 'Background',
          description: 'State the scientific background, rationale, and healthcare context for evaluating the generative AI-driven chatbot(s), referencing relevant literature when applicable.',
          details: {
            explanation: 'Investigators should describe the context in which this research is occurring, including the current state of relevant literature. This foundational knowledge should include only the information necessary for readers to understand the potential role of the generative AI-driven chatbot in a clinical setting. For example, whether the work being undertaken is preclinical (the role of the gut microbiome on diverticulitis) or clinical (the treatment of diverticulitis), investigators are encouraged to outline relevant advances made in the field thus far. Authors should further clarify whether applications are designed to provide advice according to specific resources (such as societal guidelines) for any range of conditions, specialties, or scenarios. Overall, investigators are encouraged to signpost the use-case for which the generative AI-driven chatbot(s) is being evaluated. Authors should describe the gap in current knowledge that their work addresses.',
            rationale: 'A well-established background helps readers understand the significance of the research and its place within the broader scientific literature.',
            examples: [
              'Current state of relevant literature in the field',
              'Potential role of the generative AI-driven chatbot in clinical setting',
              'Use-case for which the generative AI-driven chatbot(s) is being evaluated',
              'Gap in current knowledge that the work addresses'
            ]
          }
        },
        {
          number: '2b',
          label: 'Aims and Research Questions',
          description: 'State the aims and research questions including the target audience, intervention, comparator(s), and outcome(s).',
          details: {
            explanation: 'We encourage authors to specify the purpose of their study by explicitly outlining the aims of their work. Investigators are encouraged to clarify whether the generative AI-driven chatbot(s) is/are directed at clinicians, patients, members of the general public, and/or CHA researchers as the end user. Authors should further clarify whether they evaluated the performance of a single generative AI-driven chatbot as an intervention, additional chatbot/model comparators, other AI models, and/or humans (such as clinicians). Furthermore, investigators should state whether the aim of the study was to evaluate the ability of the generative AI-driven chatbot(s) to summarise clinical evidence, provide health advice (in the form of guidance or recommendations), or both summarise clinical evidence and provide health advice. Finally, authors should specifically outline the research questions being investigated. These questions might include but are not limited to whether the work relates to health prevention, screening, diagnosis, treatment, prognosis, and/or general health information. Investigators should also clearly state the primary and secondary outcome(s) of the study as applicable, described in further detail in subitem 9ai.',
            rationale: 'Well-defined research questions guide the methodology and help readers understand what the study aims to achieve.',
            examples: [
              'Target audience: clinicians, patients, general public, or CHA researchers',
              'Type of evaluation: single chatbot, multiple comparators, or human controls',
              'Study aim: summarise clinical evidence, provide health advice, or both',
              'Research questions related to prevention, screening, diagnosis, treatment, or prognosis'
            ]
          }
        }
      ]
    },
    {
      number: '3',
      section: 'Methods',
      subsections: [
        {
          number: '3a',
          label: 'Model Identifiers',
          description: 'State the name and version identifier(s) of the generative AI model(s) and chatbot(s) under evaluation, as well as their date of release or last update.',
          details: {
            explanation: 'To facilitate the identification of the intervention being evaluated, authors are encouraged to identify the generative AI model and chatbot under assessment. Notably, both generative AI models and chatbots are typically separate entities. For example, when authors use chatbots to engage with large language models (LLMs) in CHA studies, they are effectively evaluating the performance of the ensemble of both the chatbot and the generative AI model, as the software architecture of the chatbot may impact their overall performance and functionality. CHA researchers should be aware that accessing generative AI models through application programming interface keys still constitutes the use of the chatbot component to access the model itself. Both chatbots and generative AI models can be version controlled, and readers must understand which iteration of the model and chatbot is being evaluated to properly interpret the study findings. For instance, authors querying a more recent version of ChatGPT on 5 September 2024 would be using ChatGPT-4o as a chatbot, with the "4o" specifying the version. This chatbot allows authors to access GPT-4o as an LLM for the ChatGPT interface ensemble. Notably, the model GPT-4o has been updated several times since its original release. In addition to identifying the name and version number of the model and chatbot being assessed, investigators should specify the date of release or last update of both the model and the chatbot where possible. One example illustrated for ChatGPT would be "gpt-4o-2024-08-06," which helps to ensure clarity for readers, as iterative updates might be implemented without announcements or recognisable changes to version identifiers.',
            rationale: 'Precise model identification is crucial for reproducibility and allows readers to understand which version was tested.',
            examples: [
              'ChatGPT-4o as a chatbot with GPT-4o as the underlying LLM',
              'Specific version identifiers like "gpt-4o-2024-08-06"',
              'Date of release or last update for both model and chatbot',
              'Recognition that API access still involves chatbot components'
            ]
          }
        },
        {
          number: '3b',
          label: 'Model Accessibility',
          description: 'State whether the generative AI model(s) and chatbot(s) are open-source or closed-source/proprietary.',
          details: {
            explanation: 'Both generative AI models and chatbots may be open-source or closed-source. Closed-source approaches conceal source code, training data, model architecture, and/or fine-tuning protocols, whereas open-source offers more transparency and control to the user by facilitating model and/or chatbot adaptation and customisation. Proprietors of closed-source models and chatbots might also alter their product or its training data and subsequently change their output at any time without the ability of users to recognise these changes, which affects the reproducibility of scientific research evaluating generative AI-driven chatbots. For these reasons, authors should specify whether they are evaluating open-source or closed-source models and chatbots. For instance, ChatGPT-4o is a proprietary/closed-source chatbot, while GPT-4o is a proprietary generative AI model.',
            rationale: 'Understanding model accessibility affects reproducibility and practical implementation considerations.',
            examples: [
              'Open-source: offers transparency and user control for adaptation',
              'Closed-source: conceals source code, training data, and architecture',
              'ChatGPT-4o as proprietary/closed-source chatbot example',
              'Impact on reproducibility of scientific research'
            ]
          }
        }
      ]
    },
    {
      number: '4',
      section: 'Model Details',
      subsections: [
        {
          number: '4a',
          label: 'Model Type',
          description: 'State whether the generative AI model was a base model or a novel base model, tuned model, or fine-tuned model.',
          details: {
            explanation: 'Investigators might choose to evaluate the performance of one or more generative AI models: An out-of-the-box model that has already been developed and described (a base model). A novel base model that has not been previously described and is proposed as part of the study itself. A pre-existing model that has been tuned (a tuned model)—which has been customised for some functionality. A fine-tuned or adapted model (through the alteration of whole or parts of model parameters, weights, or the addition or removal of parameters and layers) that has been revised either through algorithmic tuning to alter its performance (such as through reinforcement learning or retrieval-augmented generation), or through additional training with new data. It is important to explicitly specify which of these model types are being evaluated in order for readers to contextualise the study findings.',
            rationale: 'Model type affects performance characteristics and interpretation of results.',
            examples: [
              'Base model: out-of-the-box model already developed and described',
              'Novel base model: not previously described, proposed as part of study',
              'Tuned model: pre-existing model customised for specific functionality',
              'Fine-tuned model: altered parameters, weights, or layers through additional training'
            ]
          }
        }
      ]
    },
    {
      number: '5',
      section: 'Prompt Engineering',
      subsections: [
        {
          number: '5a',
          label: 'Prompt Development',
          description: 'Describe the evolution of study prompt development.',
          subItems: [
            {
              number: '5ai',
              label: 'Prompt Sources',
              description: 'Describe the sources of prompts.',
              details: {
                explanation: 'Prompts might originate from a wide variety of sources. Although investigators frequently derive prompts on their own (based on expert opinion), other sources such as professional society/organisation websites, non-evidence based websites including patient forums, social media, textbooks, and clinical practice guidelines have been used previously. Alternatively, investigators can collect prompts from patients or clinicians through prospective or retrospective review of patient records or communication systems used for healthcare work. Providing readers with a clear summary of the source of experimental prompts helps readers contextualise the clinical relevance of the chatbot system under evaluation and might also reveal where the system is likely to perform well or fail.',
                rationale: 'Understanding prompt sources helps assess their validity and appropriateness for the study context.',
                examples: [
                  'Expert opinion, professional society websites, textbooks',
                  'Clinical practice guidelines and evidence-based sources',
                  'Patient forums, social media, and non-evidence based websites',
                  'Patient records or healthcare communication systems'
                ]
              }
            },
            {
              number: '5aii',
              label: 'Prompt Engineering Team',
              description: 'State the number and characteristics of the individual(s) involved in prompt engineering.',
              details: {
                explanation: 'Describe the expertise and background of individuals who developed the prompts.',
                rationale: 'The qualifications of prompt engineers affect the quality and clinical relevance of the prompts.',
                examples: [
                  'Clinical experts (specialty, years of experience)',
                  'AI/ML specialists',
                  'Health informatics professionals',
                  'Patient representatives'
                ]
              }
            },
            {
              number: '5aiii',
              label: 'Patient and Public Involvement',
              description: 'Provide details of any patient and public involvement during prompt engineering.',
              details: {
                explanation: 'Document how patients or the public contributed to prompt development.',
                rationale: 'Patient involvement ensures prompts reflect real-world needs and concerns.',
                examples: [
                  'Patient advisory board review',
                  'Focus groups with target patient populations',
                  'Survey feedback from potential users',
                  'Co-design workshops'
                ]
              }
            }
          ],
          details: {
            explanation: 'Prompt engineering refers to the development and optimisation of prompt words and sentences to optimise the stability and appropriateness of model output. Prompt engineering affects the performance of generative AI models such as LLMs, particularly in the context of clinical questions. Thus, investigators should report the overall process undertaken during study prompt development to facilitate the interpretation of study findings. We encourage authors to report the number and nature of test prompts used to elicit model responses. Additionally, investigators might encounter barriers during prompt development. For example, chatbots could refuse to answer a medical question or might simply present multiple options without committing to a clinical decision. Thus, further test iterations of prompts might be needed to elicit guidance from the chatbot. These barriers can be circumvented with the use of follow-up prompts that might be applied in a standardised way across all models under evaluation. Authors might also comment on whether prompts were reviewed for grammatical accuracy, and whether approaches were taken to mitigate biased responses from the generative AI-driven chatbot.',
            rationale: 'Prompt engineering significantly affects AI performance, and transparency in this process is essential for reproducibility.',
            examples: [
              'Development and optimisation of prompt words and sentences',
              'Number and nature of test prompts used',
              'Barriers encountered and follow-up prompts used',
              'Approaches to mitigate biased responses'
            ]
          }
        }
      ]
    },
    {
      number: '6',
      section: 'Query Strategy',
      subsections: [
        {
          number: '6a',
          label: 'Model Access',
          description: 'State route of access to generative AI model.',
          details: {
            explanation: 'Describe how the AI model was accessed and queried during the study.',
            rationale: 'Access method can affect response characteristics and study reproducibility.',
            examples: [
              'Web interface (ChatGPT web application)',
              'API access (OpenAI API)',
              'Local deployment',
              'Third-party platform integration'
            ]
          }
        },
        {
          number: '6b',
          label: 'Query Timing and Location',
          description: 'State the date(s) and location(s) of queries for the generative AI-driven chatbot(s) including the day, month, and year as well as city and country.',
          details: {
            explanation: 'Provide specific temporal and geographical details for when and where queries were conducted.',
            rationale: 'AI models may change over time, and location can affect access to different model versions.',
            examples: [
              'Queries conducted on March 15-20, 2023, in Toronto, Canada',
              'Data collection period: January 1-31, 2024, London, United Kingdom',
              'Multiple sites: Boston (USA), Toronto (Canada), London (UK)'
            ]
          }
        }
      ]
    },
    {
      number: '7',
      section: 'Performance Evaluation',
      subsections: [
        {
          number: '7a',
          label: 'Reference Standard',
          description: 'Define the ground truth or reference standard used to define successful generative AI-driven chatbot performance.',
          details: {
            explanation: 'Clearly establish the criteria and standards against which AI performance is measured.',
            rationale: 'Well-defined reference standards are crucial for valid and meaningful performance assessment.',
            examples: [
              'Clinical practice guidelines',
              'Expert consensus',
              'Peer-reviewed literature',
              'Validated clinical tools or scores'
            ]
          }
        },
        {
          number: '7b',
          label: 'Evaluation Process',
          description: 'Describe the process undertaken for generative AI-driven chatbot performance evaluation.',
          details: {
            explanation: 'Once the ground truth is established, authors may further clarify how responses are classified. For instance, a study evaluating the clinical accuracy of colorectal cancer screening recommendations derived by generative AI-driven chatbots might consider responses to be correct provided that they align with local guideline recommendations on whether they are for or against colorectal cancer screening. However, model output might not simply recommend or advise against screening, but instead state that a clinical decision is "reasonable" or "appropriate." Moreover, models could still provide disclaimers rather than commit to clinical guidance despite the use of follow-up prompts, or list a myriad of separate screening options. Whether authors are evaluating topics of health prevention, differential diagnosis, diagnosis, treatment, and/or general information, authors should clearly outline how they plan to handle these types of circumstances, preferably determined a priori and documented in a study protocol as in subitem 1d. Subitems 7bi-iii further outline specific elements of performance evaluation which should be reported.',
            rationale: 'A transparent evaluation process ensures validity and allows for replication.',
            examples: [
              'Classification of responses as correct when aligned with guidelines',
              'Handling of ambiguous responses like "reasonable" or "appropriate"',
              'Managing disclaimers rather than committed clinical guidance',
              'A priori documentation in study protocol for all circumstances'
            ]
          }
        }
      ]
    },
    {
      number: '8',
      section: 'Sample Size',
      subsections: [
        {
          number: '8',
          label: 'Sample Size Determination',
          description: 'Report how the sample size was determined.',
          details: {
            explanation: 'Describe the rationale and methodology for determining the number of prompts, scenarios, or evaluations.',
            rationale: 'Adequate sample size is crucial for statistical power and generalizability of findings.',
            examples: [
              'Power calculation based on expected effect size',
              'Pragmatic considerations (resource constraints)',
              'Saturation principles for qualitative components',
              'Precedent from similar studies'
            ]
          }
        }
      ]
    },
    {
      number: '9',
      section: 'Data Analysis',
      subsections: [
        {
          number: '9a',
          label: 'Statistical Methods',
          description: 'Describe statistical analysis methods, including any evaluation of reproducibility of generative AI-driven chatbot responses.',
          details: {
            explanation: 'Depending on the study design, type of statistical analysis may be different. Authors should clearly describe which statistical methods they chose. For instance, when data are categorical, authors might consider reporting simple percentages, odds ratios, or relative risks. When data are continuous, mean differences might be more appropriate. Confidence intervals around point estimates should also be reported where appropriate. Some CHA studies might also evaluate reproducibility. These studies aim to assess whether generative AI-driven chatbots provide similar responses when presented with identical prompts multiple times, as the stochastic nature of these models means that they may generate different responses even when presented with the same input repeatedly. Reproducibility measures are particularly relevant when assessing clinical consistency and reliability. Some potential methods for assessing reproducibility include computing the percentage of responses that are identical when the same prompt is repeated multiple times, or computing intraclass correlation coefficients when responses are evaluated using continuous measures.',
            rationale: 'Clear statistical methods ensure proper interpretation and enable replication of findings.',
            examples: [
              'Categorical data: percentages, odds ratios, relative risks',
              'Continuous data: mean differences with confidence intervals',
              'Reproducibility assessment through repeated prompting',
              'Percentage of identical responses on repetition',
              'Intraclass correlation coefficients for continuous measures'
            ]
          }
        }
      ]
    },
    {
      number: '10',
      section: 'Results',
      subsections: [
        {
          number: '10a',
          label: 'Performance Results',
          description: 'Report the performance evaluation undertaken including the alignment between generative AI-driven chatbot output and ground truth or reference standard using quantitative or mixed methods approaches as applicable.',
          details: {
            explanation: 'Reporting of performance results is highly contextual to the study design and research questions addressed by the study and will vary substantially across different CHA evaluations. At its core, this item requires authors to detail how generative AI-driven chatbot responses compare to the chosen reference standard or ground truth for the clinical task under study. This typically involves performance metrics that illustrate the alignment between the chatbot outputs and the reference standard. As noted in subitem 7a, the most appropriate reference standard should be chosen in light of existing evidence for the clinical task at hand. In many cases, this will allow for quantitative reporting of performance metrics such as accuracy (the proportion of correct responses divided by the total number of responses), sensitivity (the proportion of true positives correctly identified as positives), specificity (the proportion of true negatives correctly identified as negatives), positive predictive value (the proportion of positive predictions that are true positives), and negative predictive value (the proportion of negative predictions that are true negatives), among others. When such reporting is possible, 95% confidence intervals should be included where applicable. Additionally, some evaluations might involve the use of qualitative or mixed methods approaches to performance evaluation. In such cases, authors are encouraged to consider existing qualitative reporting guidelines such as the Standards for Reporting Qualitative Research checklist.',
            rationale: 'Comprehensive performance reporting allows readers to assess the clinical utility and reliability of the AI system.',
            examples: [
              'Quantitative metrics: accuracy, sensitivity, specificity with 95% CI',
              'Positive and negative predictive values',
              'Qualitative analysis following SRQR guidelines',
              'Mixed methods approaches combining quantitative and qualitative',
              'Alignment assessment between AI outputs and reference standards'
            ]
          }
        }
      ]
    }
  ];
  
  return (
    <PageContainer>
      <BackButton theme={theme} onClick={() => navigate('/abstractchecklist')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        Back to Abstract Checklist
      </BackButton>
      
      <PageHeader theme={theme}>
        <h1>CHART Abstract Checklist Information</h1>
        <p>Detailed guidance for each abstract checklist item</p>
      </PageHeader>
      
      {checklistSections.map((section, sectionIndex) => (
        <SectionContainer key={sectionIndex} theme={theme}>
          <SectionHeader 
            theme={theme}
            onClick={() => toggleItem(section.number)}
          >
            <div>
              <ItemNumber theme={theme} level="section">{section.number}</ItemNumber>
              {section.section}
            </div>
            <ExpandIcon isOpen={openItems[section.number] || false}>
              ▼
            </ExpandIcon>
          </SectionHeader>
          
          <SubsectionContainer 
            theme={theme} 
            isOpen={openItems[section.number] || false}
          >
            {section.subsections.map((subsection, subsectionIndex) => (
              <ItemContainer key={`${sectionIndex}-${subsectionIndex}`} theme={theme}>
                <ItemHeader
                  theme={theme}
                  isOpen={openItems[subsection.number] || false}
                  onClick={() => toggleItem(subsection.number)}
                  level="subsection"
                >
                  <ItemNumber theme={theme} level="subsection">{subsection.number}</ItemNumber>
                  <ItemTitle>
                    <h3>{subsection.label || 'Checklist Item'}</h3>
                    <p>{subsection.description}</p>
                  </ItemTitle>
                  <ExpandIcon isOpen={openItems[subsection.number] || false}>
                    ▼
                  </ExpandIcon>
                </ItemHeader>
                
                <ItemContent isOpen={openItems[subsection.number] || false}>
                  <ItemDetails>
                    <h4>Detailed Explanation</h4>
                    <p>{subsection.details.explanation}</p>
                    
                    <h4>Rationale</h4>
                    <p>{subsection.details.rationale}</p>
                    
                    <h4>Examples and Guidance</h4>
                    <ul>
                      {subsection.details.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex}>{example}</li>
                      ))}
                    </ul>
                  </ItemDetails>
                </ItemContent>
                
                {(subsection as any).subItems && (subsection as any).subItems.map((subItem: any, subItemIndex: number) => (
                  <div key={`${sectionIndex}-${subsectionIndex}-${subItemIndex}`}>
                    <ItemHeader
                      theme={theme}
                      isOpen={openItems[subItem.number] || false}
                      onClick={() => toggleItem(subItem.number)}
                      level="subitem"
                    >
                      <ItemNumber theme={theme} level="subitem">{subItem.number}</ItemNumber>
                      <ItemTitle>
                        <h3>{subItem.label}</h3>
                        <p>{subItem.description}</p>
                      </ItemTitle>
                      <ExpandIcon isOpen={openItems[subItem.number] || false}>
                        ▼
                      </ExpandIcon>
                    </ItemHeader>
                    
                    <ItemContent isOpen={openItems[subItem.number] || false}>
                      <ItemDetails>
                        <h4>Detailed Explanation</h4>
                        <p>{subItem.details.explanation}</p>
                        
                        <h4>Rationale</h4>
                        <p>{subItem.details.rationale}</p>
                        
                        <h4>Examples and Guidance</h4>
                        <ul>
                          {subItem.details.examples.map((example: string, exampleIndex: number) => (
                            <li key={exampleIndex}>{example}</li>
                          ))}
                        </ul>
                      </ItemDetails>
                    </ItemContent>
                  </div>
                ))}
              </ItemContainer>
            ))}
          </SubsectionContainer>
        </SectionContainer>
      ))}
    </PageContainer>
  );
};

export default AbstractChecklistInformation;