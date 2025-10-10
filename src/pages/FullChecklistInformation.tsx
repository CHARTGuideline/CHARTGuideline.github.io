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

const FullChecklistInformation = () => {
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
      number: '1',
      section: 'Title & Abstract',
      subsections: [
        {
          number: '1a',
          label: 'Title',
          description: 'State that the study is assessing one or more generative AI-driven chatbots for clinical evidence or health advice.',
          details: {
            explanation: 'To ensure clarity for all readers, authors are encouraged to indicate that the study is evaluating the performance of a generative AI-driven chatbot. Doing so facilitates indexing for subsequent record collection and article searching. Authors should avoid broadly stating that the article discusses artificial intelligence.',
            rationale: 'Clear identification of the study\'s focus on generative AI chatbots helps readers quickly understand the scope and relevance of the research.',
            examples: [
              'State that the study is assessing one or more generative AI-driven chatbots',
              'Facilitate indexing for subsequent record collection and article searching',
              'Avoid broadly stating that the article discusses artificial intelligence'
            ]
          }
        },
        {
          number: '1b',
          label: 'Abstract/Summary',
          description: 'Apply a structured format, if applicable.',
          details: {
            explanation: 'Authors may be writing an abstract or summary for the purposes of conference submission, grant submission, or for manuscript submission. The abridged checklist for CHA studies\' abstracts looks at relevant sections that generally include background, methods, results, and conclusion, capturing core information from subitems in the full version of the checklist. The full rationale for each subitem is discussed in subsequent sections of this article following the title and abstract.',
            rationale: 'Structured abstracts improve readability and ensure all essential information is systematically presented.',
            examples: [
              'Background, Methods, Results, Conclusions format',
              'Objective, Design, Setting, Participants, Interventions, Main Outcome Measures, Results, Conclusions',
              'Introduction, Methods, Results, Discussion format'
            ]
          }
        }
      ]
    },
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
            explanation: 'Both generative AI models and chatbots may be open-source or closed-source. Closed-source approaches conceal source code, training data, model architecture, and/or fine-tuning protocols, whereas open-source offers more transparency and control to the user by facilitating model and/or chatbot adaptation and customisation. Proprietors of closed-source models and chatbots might also alter their product or its training data and subsequently change their output at any time without the ability of users to recognise these changes, which affects the reproducibility of scientific research evaluating generative AI-driven chatbots. For these reasons, authors should specify whether they are evaluating open-source or closed-source models and chatbots. For instance, ChatGPT-4o is a proprietary/closed-source chatbot, while GPT-4o is a proprietary generative AI model. Additionally, specific software licenses might be needed for users to access the model(s)/chatbot(s) under evaluation, which could affect the ability of users to modify the model(s)/chatbot(s). If applicable, investigators are encouraged to report the details of each license granted.',
            rationale: 'Understanding model accessibility affects reproducibility and practical implementation considerations.',
            examples: [
              'Open-source: offers transparency and user control for adaptation',
              'Closed-source: conceals source code, training data, and architecture',
              'ChatGPT-4o as proprietary/closed-source chatbot example',
              'Software license details that may affect model modification'
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
        },
        {
          number: '4b',
          label: 'Base Model Citation',
          description: 'If a base model is used, cite its development in sufficient detail to identify the model.',
          details: {
            explanation: 'Investigators might evaluate generative AI models whose development have been described in great detail, such as a base model. In these cases, it is sufficient for authors to provide readers with a citation or link to an existing resource where this information is readily available. We encourage investigators to reference peer reviewed sources where possible. Authors might update pre-existing generative AI models such as LLMs, and thus various iterations of a given model could exist. Investigators should be specific to enable readers to understand the exact base model under evaluation, with the aim of reporting methodology that is both transparent and reproducible. Model descriptions are further addressed in subitem 4c. Where investigators evaluate closed-source models and chatbots, we recognise that the information available might be limited. In these situations, authors are encouraged to report as much detail as is accessible and acknowledge this lack of identifying information as a limitation.',
            rationale: 'Proper citation gives credit to original developers and helps readers locate the original model documentation.',
            examples: [
              'Citation or link to existing resource with model details',
              'Reference to peer reviewed sources where possible',
              'Specific identification of exact base model under evaluation',
              'Acknowledgment of limitations for closed-source models'
            ]
          }
        },
        {
          number: '4c',
          label: 'Model Training Details',
          description: 'If a novel base model, tuned model, or fine-tuned model is used, describe the pre- and/or postimplementation/deployment data and parameters.',
          details: {
            explanation: 'Investigators might further revise generative AI models such as LLMs before their release for user engagement (pre-implementation or pre-deployment) or following their release (post-implementation or post-deployment) through tuning such as customisation of model parameters such as temperature or token length. Authors may also refine their models via fine-tuning through reinforcement learning, retrieval-augmented generation, further training with new datasets, or the adjustment of model parameters such as penalties, add-on availability, and/or layers. This list is not meant to be exhaustive, and authors are encouraged to report what is minimally necessary to allow others to reproduce their study methodology, with a focus on enabling the replicability of experiments. Although organisations may be incentivised to restrict access to their models or conceal the model architecture and/or training/source data, it is imperative that we move towards open-source generative AI models to facilitate the transparent evaluation and reporting of CHA studies that is necessary to establish the role of generative AI-driven chatbots in the clinical workflow.',
            rationale: 'Detailed methodology enables reproducibility and proper interpretation of model performance.',
            examples: [
              'Pre-implementation tuning: customisation of temperature or token length',
              'Post-deployment refinement through reinforcement learning',
              'Fine-tuning with new datasets or parameter adjustments',
              'Transparent reporting to enable replicability of experiments'
            ]
          }
        },
        {
          number: '4b',
          label: 'Base Model Citation',
          description: 'If a base model is used, cite its development in sufficient detail to identify the model.',
          details: {
            explanation: 'Provide proper academic citations for base models used in the study.',
            rationale: 'Proper citation gives credit to original developers and helps readers locate the original model documentation.',
            examples: [
              'Brown, T., et al. (2020). Language models are few-shot learners. Advances in neural information processing systems.',
              'Devlin, J., et al. (2018). BERT: Pre-training of deep bidirectional transformers for language understanding.',
              'Include version numbers, access dates, and DOIs where available'
            ]
          }
        },
        {
          number: '4c',
          label: 'Model Training Details',
          description: 'If a novel base model, tuned model, or fine-tuned model is used, describe the pre- and/or postimplementation/deployment data and parameters.',
          details: {
            explanation: 'Provide comprehensive details about training data, parameters, and methodology for custom or modified models.',
            rationale: 'Detailed methodology enables reproducibility and proper interpretation of model performance.',
            examples: [
              'Training dataset size and composition',
              'Hyperparameters (learning rate, batch size, epochs)',
              'Validation and testing procedures',
              'Hardware and computational resources used'
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
                explanation: 'In addition to describing the source of prompts, the number of individuals overseeing the development of prompts should be clearly stated. Furthermore, we encourage investigators to describe the demographic characteristics and/or background of the individuals involved in study prompt development. Relevant details might vary depending on the aim of the study and the type of advice being examined. Individuals involved in prompt engineering could include study investigators such as clinicians, data scientists, or other researchers. In particular, the CHART expert panel voiced the importance of identifying the expertise of those involved in study prompt development to support readers in judging the trustworthiness of study findings. This knowledge might include prior experience in publishing CHA studies, relevant expertise in the clinical performance evaluation of generative AI models, specific clinical expertise related to the topic being examined, general experience in AI research. Authors without expertise in these areas should not be precluded from initiating CHA studies but might be less likely to develop optimal systems for generating accurate, pragmatic, and safe responses to clinical queries. In all scenarios, the prior experience and expertise of prompt engineers should be expressly stated.',
                rationale: 'The qualifications of prompt engineers affect the quality and clinical relevance of the prompts.',
                examples: [
                  'Number of individuals and their demographic characteristics',
                  'Background: clinicians, data scientists, or other researchers',
                  'Prior experience in CHA studies or AI model evaluation',
                  'Specific clinical expertise related to the study topic'
                ]
              }
            },
            {
              number: '5aiii',
              label: 'Patient and Public Involvement',
              description: 'Provide details of any patient and public involvement during prompt engineering.',
              details: {
                explanation: 'Prompt engineering could have a role in optimising model output in response to user queries, but the responses from generative AI-driven chatbots have been shown to be very sensitive to prompt phrasing. Owing to a discrepancy between the medical language used by clinicians and patients, differences in phrasing between study investigators and patients might affect the generalisability of study findings of CHA studies. In the spirit of patient centred care, authors may use a pragmatic approach by including patients or other members of the public as study investigators to enhance the external validity of their study. We encourage authors to report whether patients or other members of the public were involved in study prompt development to facilitate the interpretation of their findings. Further, we encourage investigators to report how these individuals were involved in prompt engineering. For comprehensive guidance on how to report patient and public involvement in research, authors are advised to consult the GRIPP2 (guidance for reporting involvement of patients and the public) statement.',
                rationale: 'Patient involvement ensures prompts reflect real-world needs and concerns.',
                examples: [
                  'Sensitivity of chatbot responses to prompt phrasing',
                  'Discrepancy between medical language of clinicians and patients',
                  'Patient-centred approach to enhance external validity',
                  'Reference to GRIPP2 statement for comprehensive guidance'
                ]
              }
            }
          ],
          details: {
            explanation: 'Prompt engineering refers to the development and optimisation of prompt words and sentences to optimise the stability and appropriateness of model output. Prompt engineering affects the performance of generative AI models such as LLMs, particularly in the context of clinical questions. Thus, investigators should report the overall process undertaken during study prompt development to facilitate the interpretation of study findings. We encourage authors to report the number and nature of test prompts used to elicit model responses. Additionally, investigators might encounter barriers during prompt development. For example, chatbots could refuse to answer a medical question or might simply present multiple options without committing to a clinical decision. Thus, further test iterations of prompts might be needed to elicit guidance from the chatbot. These barriers can be circumvented with the use of follow-up prompts that might be applied in a standardised way across all models under evaluation. Authors might also comment on whether prompts were reviewed for grammatical accuracy, and whether approaches were taken to mitigate biased responses from the generative AI-driven chatbot. Subitems 5ai-iii further look at specific elements of prompt development that should be clearly outlined. If applicable, authors may report any approaches taken to mitigate potentially harmful output from the model during prompt development. Biased, potentially harmful, or misleading responses are described in more detail in subitem 10c.',
            rationale: 'Prompt engineering significantly affects AI performance, and transparency in this process is essential for reproducibility.',
            examples: [
              'Development and optimisation of prompt words and sentences',
              'Number and nature of test prompts used',
              'Barriers encountered and follow-up prompts used',
              'Approaches to mitigate biased or harmful responses'
            ]
          }
        },
        {
          number: '5b',
          label: 'Study Prompts',
          description: 'Provide study prompts.',
          details: {
            explanation: 'By providing the prompts used in experiments, investigators will improve the reliability and trustworthiness of their findings. The phrasing of prompts and the manner in which queries are conducted directly impact model output, so study investigators of CHA studies are strongly encouraged to provide the raw transcript of prompts used for model query in either the manuscript body or appendix. This information enables readers to examine prompts for factors that influence model output. For instance, these factors might include the use of standardised prompts, one or more languages, follow-up prompts, and checks for the reproducibility of responses. Additionally, authors should consider the importance of inclusive design and testing, because English versus non-English prompts could prompt language or cultural barriers in generative AI-derived health advice depending on the nature and scope of the study.',
            rationale: 'Full prompt disclosure is essential for reproducibility and allows readers to assess prompt quality and factors that influence model output.',
            examples: [
              'Raw transcript of prompts in manuscript body or appendix',
              'Standardised prompts in one or more languages',
              'Follow-up prompts and reproducibility checks',
              'Consideration of language and cultural barriers in prompt design'
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
            explanation: 'Users can query generative AI-driven chatbots through a variety of interfaces. For instance, GPT-4o is a closed-source, proprietary LLM that be accessed through ChatGPT, an online chatbot, or via an application programming interface. For application programming interfaces, investigators might not interact solely via a user-facing chatbot using natural language prompts but rather by coding a script to implement many queries and response processing with minimal delay or human involvement during trials. In these cases, all used code should be reported as per subitem 12e. Bing, Enterprise Co-Pilot, and other LLMs also leverage the same model but through their own interfaces. For the purpose of transparency and reproducibility, investigators should report the manner in which they access the model under evaluation, to provide further context for readers.',
            rationale: 'Access method can affect response characteristics and study reproducibility.',
            examples: [
              'ChatGPT web interface using natural language prompts',
              'Application programming interface with coded scripts',
              'Bing, Enterprise Co-Pilot, or other interface variations',
              'Reporting all used code for transparency and reproducibility'
            ]
          }
        },
        {
          number: '6b',
          label: 'Query Timing and Location',
          description: 'State the date(s) and location(s) of queries for the generative AI-driven chatbot(s) including the day, month, and year as well as city and country.',
          details: {
            explanation: 'As generative AI models are frequently updated, their performance can vary depending on the date of query. Authors of CHA studies should report the day, month, and year in which the chatbot was queried. Additionally, the availability of generative AI models might vary depending on location, while model performance could differ on the basis of local recommendations and best practices, described further in item 7a. For these reasons, investigators of CHA studies should also report the city and country of the query.',
            rationale: 'AI models may change over time, and location can affect access to different model versions.',
            examples: [
              'Report day, month, and year of chatbot queries',
              'Include city and country where queries were conducted',
              'Account for model availability variations by location',
              'Consider local recommendations and best practices impact'
            ]
          }
        },
        {
          number: '6c',
          label: 'Chat Sessions',
          description: 'Describe whether prompts were input into separate chat session(s).',
          details: {
            explanation: 'Users can engage with generative AI-driven chatbots by entering a prompt in a new chat session. Users may continue to enter more prompts in response to model outputs, creating continuous dialogue. However, as users enter successive prompts, subsequent LLM responses may become influenced by prior discourse, and thus investigators may instead enter their prompts in distinct chat sessions. We encourage authors to optimise the reproducibility of their methodology by stating whether separate chat sessions or continuous dialogue in a single chat session were used.',
            rationale: 'Chat history can influence AI responses, affecting the independence of evaluations and reproducibility.',
            examples: [
              'Each prompt in a new, isolated chat session',
              'Continuous dialogue within the same session',
              'Mixed approach with clear documentation',
              'Methodology optimization for reproducibility'
            ]
          }
        },
        {
          number: '6d',
          label: 'AI Responses',
          description: 'Provide all generative AI-driven chatbot output/responses.',
          details: {
            explanation: 'As with prompts, we encourage study investigators to transparently report the model responses from their experiments. By having access to the raw discourse between investigator prompts and model output, readers will be better positioned to both understand and reproduce the study methodology. This added information will improve the generalisability of study findings, because readers can judge the practicality of the study queries used to elicit chatbot responses. Authors may elect to present these data in the main body of the manuscript, or in the appendix or supplementary file as appropriate or as specified by the applicable journal. If investigators are evaluating closed-source or proprietary models, their ability to share transcripts might be limited. In these cases—as well as other situations where the raw transcripts of model responses are not accessible—authors should report this as a major limitation of their study.',
            rationale: 'Full response disclosure enables independent evaluation, supports transparency, and improves generalisability of findings.',
            examples: [
              'Raw discourse between prompts and model output',
              'Data in main manuscript, appendix, or supplementary files',
              'Complete transcripts when accessible',
              'Reporting limitations when transcripts not available'
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
            explanation: 'In addition to stating the primary outcome of the study, authors should explicitly define what is considered to be successful performance by the chatbot, a process otherwise known as defining the reference standard or ground truth. To evaluate the clinical performance of generative AI-driven chatbots, study authors should state their primary (and secondary) outcome(s). Additionally, authors should explicitly define what is considered to be successful performance by the chatbot(s) under evaluation, a process otherwise known as defining the reference standard or ground truth. This standard can be used to gauge whether chatbot responses are accurate. Investigators are encouraged to apply a pragmatic approach to performance evaluation as CHA studies are often evaluated in the context of supporting clinical decision making. Thus, authors can define the ground truth using various sources, the most important of which are evidence-informed clinical practice guidelines. These guidelines use a systematic approach to determining the certainty of the evidence as well as a structured approach to transitioning from the evidence to a decision and/or recommendation such as the GRADE (grading of recommendations, assessment, development, and evaluation) framework. Other sources that might be used to define the ground truth in CHA studies include non-evidence informed clinical practice guidelines, or guidelines that do not use a systematic approach such as GRADE. Additional sources used by authors of CHA studies to define the ground truth might include but are not limited to evidence based systematic reviews or meta-analyses, non-evidence based systematic reviews (similarly defined as the lack of a systematic approach to rating the certainty of the evidence), traditional textbooks, electronic compendiums (such as UpToDate), organisation or society websites, study investigators, or primary articles such as randomised controlled studies or cohort studies.',
            rationale: 'Well-defined reference standards are crucial for valid and meaningful performance assessment.',
            examples: [
              'Evidence-informed clinical practice guidelines using GRADE framework',
              'Non-evidence informed clinical practice guidelines',
              'Evidence-based systematic reviews or meta-analyses',
              'Traditional textbooks, electronic compendiums (UpToDate), primary articles'
            ]
          }
        },
        {
          number: '7b',
          label: 'Evaluation Process',
          description: 'Describe the process undertaken for generative AI-driven chatbot performance evaluation.',
          subItems: [
            {
              number: '7bi',
              label: 'Evaluation Team',
              description: 'State the number and characteristics of team members involved in performance evaluation.',
              details: {
                explanation: 'Similar to subitem 5aii for prompt engineering, CHA authors are encouraged to describe the number of individuals involved in the evaluation of chatbot responses. Demographic characteristics of the team members performing the evaluation including any relevant expertise (as discussed in subitem 6aii) should be reported. However, specific clinical expertise of the team members should be clearly stated. While intellectual conflicts of interests are covered in subitem 12a, any performance evaluators with relevant expertise in the topic of interest should be clearly described to enable readers to interpret study findings and assess for the presence of biased evaluations of model responses. For instance, in a CHA study evaluating the clinical accuracy of recommendations for the surgical management of diverticulitis derived by a generative AI-driven chatbot, the use of two surgeons with expertise in the surgical management of diverticulitis as performance evaluators could be beneficial. But if the ground truth is defined as a particular guideline, readers may examine the evaluations more carefully in case evaluations deviate from the ground truth defined in the paper, which could suggest that the expert evaluators are biased by their own practice.',
                rationale: 'Evaluator expertise and potential bias affects the credibility and accuracy of performance assessments.',
                examples: [
                  'Number of individuals involved in evaluation',
                  'Demographic characteristics and relevant expertise',
                  'Specific clinical expertise clearly stated',
                  'Assessment for presence of biased evaluations'
                ]
              }
            },
            {
              number: '7bii',
              label: 'Patient and Public Involvement in Evaluation',
              description: 'Provide details of any patients and public involvement during the evaluation process.',
              details: {
                explanation: 'As with prompt engineering (subitem 5aii), performance evaluation might differ when rated by study investigators (especially clinicians) compared to other stakeholders. For instance, in a study evaluating the clinical accuracy of LLMs in deriving patient level recommendations for the management of gastroesophageal reflux disease, the use of clinician investigators as performance evaluators could weaken the generalisability of study findings if the target users are patients with gastroesophageal reflux disease. Authors should therefore clearly state whether patients or members of the public were involved in the performance evaluation process where applicable and provide a comprehensive description of their involvement.',
                rationale: 'Patient perspectives add valuable insights about response appropriateness and ensure generalisability to target user populations.',
                examples: [
                  'Patient involvement in performance evaluation process',
                  'Public members contributing to evaluation',
                  'Comprehensive description of their involvement',
                  'Consideration of target user populations'
                ]
              }
            },
            {
              number: '7biii',
              label: 'Evaluator Blinding',
              description: 'State whether evaluators were blinded to the identity of the generative AI-driven chatbot(s) under assessment.',
              details: {
                explanation: 'Just as masking of outcome adjudicators is essential to mitigate measurement bias in a randomised controlled trial, investigators of CHA studies can consider masking the identity of models during performance evaluation. Individuals evaluating model performance might have personal biases for or against certain models, particularly as they develop experience and expertise with CHA studies or more broadly, with machine learning. Thus, investigators of CHA studies should clearly state whether blinding was applied during performance evaluation. Blinding might also apply to any potential comparators evaluated in the study, including other models/chatbots and/or human (clinician) controls. To demonstrate that blinding was effective and that adjudicators were fair in their assessments, studies might compare the alignment of judgements by measuring concordance, or design examples of better or worse responses and observe adjudicator assessments of these.',
                rationale: 'Blinding reduces bias in evaluation and improves the objectivity of assessments, similar to randomised controlled trials.',
                examples: [
                  'Masking identity of models during evaluation',
                  'Blinding applied to comparators (other models/human controls)',
                  'Measurement of concordance to demonstrate effective blinding',
                  'Testing adjudicator assessments with designed examples'
                ]
              }
            }
          ],
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
            explanation: 'Transparency is vital to the validity and generalizability of any published study, particularly given the variability of AI outputs. Responsible conduct of research principles highlight that authors should make their data and methods available to enable replication and validation by the scientific community. Accordingly, authors should report whether they provide the original prompts they used, exact model outputs generated, evaluation scripts, and the reference standards against which they compared model outputs, and if not, provide reasonable justification for withholding such data (e.g., protection of patient privacy) and indicate what they will share. Authors may also consider registering their data with a public repository such as Hugging Face, where they will be easily discoverable by other researchers. If applicable, authors should also specify whether they intend to share their human-in-the-loop workflows.',
            rationale: 'Data transparency enables replication, validation, and advances the field through shared resources.',
            examples: [
              'Public repository for prompts and model outputs',
              'Evaluation scripts made available',
              'Reference standards shared with researchers',
              'Justification when data cannot be shared (e.g., privacy)',
              'Registration with Hugging Face or similar platforms',
              'Documentation of human-in-the-loop workflows'
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
          subItems: [
            {
              number: '9ai',
              label: 'Performance Measures',
              description: 'Report the measures used for performance evaluation.',
              details: {
                explanation: 'In the context of CHA studies, performance pertains to the ability of the generative AI-driven chatbot to provide responses that are aligned to the ground truth or reference standard (subitem 7a), which represents the optimal or true response to each query in relation to the primary or secondary outcome(s). Authors should clearly state which performance measures were used for the evaluation of such responses. As the field is dynamically evolving, we make no recommendation on what specific measures investigators should use, but authors should explain why they are applying the measures chosen for their study. A myriad of different measures have been used, including quantitative or mixed methods approaches. For illustrative purposes, some contemporary examples have included the adoption of weighted or unweighted Cohen κ coefficient, as appropriate, for categorical data, or Lin concordance correlation coefficient for continuous variables. Other commonly reported diagnostic performance measures used in the context of AI performance evaluation include the F1 score, sensitivity (recall), specificity, positive predictive value (precision), negative predictive value, or area under the receiver operating characteristic curve (AUC/AUROC). If applicable, authors should state how true positives, false positives, true negatives, and false negatives were defined and how the confusion matrix was calculated as constructed. Other examples may include the relevancy, consistency, and meaningfulness of the generative AI-driven chatbot responses (intrinsic evaluation) as well as the effectiveness of the chatbot in real world applications (extrinsic evaluation). These examples are not an exhaustive list, and as the field continues to grow, authors may choose to report increasingly different measures, so long as they are rationalised as described here.',
                rationale: 'Clear performance measures allow for comparison across studies and proper interpretation of results.',
                examples: [
                  'Cohen κ coefficient for categorical data',
                  'Lin concordance correlation coefficient for continuous variables',
                  'F1 score, sensitivity, specificity, PPV, NPV, AUC/AUROC',
                  'Definition of confusion matrix components',
                  'Intrinsic and extrinsic evaluation approaches'
                ]
              }
            }
          ],
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
        },
        {
          number: '10b',
          label: 'Response Deviations',
          description: 'For responses deviating from the ground truth or reference standard, state the nature of the difference(s).',
          details: {
            explanation: 'Where applications provide advice or guidance that differs from the ground truth used to define accuracy, desirability, and safety, it is important to explore the qualitative nature of these differences. Authors may provide readers with a dataset containing each individual model output recorded during experiments with deviations from the ground truth indicated, facilitating independent analysis. At a minimum, authors should present a summary of generative AI application deviations, describing frequency, type of deviation, and magnitude of deviation. Types of deviation might relate to broad categories such as empirical factors, bias, harmful language, or be categorised with regard for the specific context of a study. For instance, studies trialling applications across a broad range of clinical specialties or subspecialties could stratify that rate of undesirable responses by those categories to explore relative strengths and weaknesses. Alternatively, thematic analysis might be undertaken to explore any common denominators between deviations in application responses, such as logical inconsistency, use of incorrect external information (eg, hallucination), or failure of interpretation of the query. The magnitude of deviation can be interpreted and presented in a variety of formats. For illustrative purposes, authors might use Likert scales to quantify qualitative judgments by human or AI evaluators, or provide a clear delineation between errors with minimal clinical consequences and errors with serious potential ramifications that could affect patient safety. This list is not exhaustive, and authors should ideally prospectively define how judgements were made in a study protocol as in subitem 12d, alongside other performance metrics described in subitem 9ai.',
            rationale: 'Understanding error patterns helps identify AI limitations, potential risks, and enables independent analysis.',
            examples: [
              'Dataset with individual model outputs and ground truth deviations',
              'Summary of frequency, type, and magnitude of deviations',
              'Categorization by clinical specialties or broad categories',
              'Thematic analysis of common denominators in deviations',
              'Likert scales for qualitative judgments',
              'Delineation between minimal and serious clinical consequences'
            ]
          }
        },
        {
          number: '10c',
          label: 'Harmful or Biased Responses',
          description: 'Report the assessment for potentially harmful, biased, or misleading responses.',
          details: {
            explanation: 'Evaluation of generative AI output for potentially harmful, biased, or misleading content helps readers gauge the safety and reliability of provided health advice. Results might help direct subsequent research and development to ensure that issues of equitable care provision and safety requirements (eg, oversight) are dealt with before wider deployment. Harmful responses include advice that might lead to physical, emotional, or psychological harm if received by users. Biased responses reflect unfair prejudice or favouritism towards particular demographics, treatments, interventions, diagnostic procedures, or medical perspectives. Misleading responses might include inaccurate information, outdated medical advice, medical advice not supported by evidence, or responses that could be misinterpreted by users. Authors should describe the specific methods used to identify and evaluate these problematic responses in sufficient depth to replicate their experiments and analyses; to the same standard as performance evaluation (subitem 7b). Methods might include stress testing or using challenging prompts to simulate real world variation and possible user behaviour and observing whether trialled applications have the adaptability and flexibility to provide useful responses and avoid generating dangerous or harmful content. An additional example is red teaming, where humans or AI models are used to circumvent model safeguards, which is a more intensive form of stress testing that can help improve model robustness. Model responses might be scored using bias detection algorithms, user feedback analysis, qualitative appraisal by researchers, or scenario based testing with sensitive or high risk queries. As with other performance assessments, results should be quantified where possible to facilitate comparative analyses. For example, authors might report the percentage of responses flagged as potentially harmful, biased, or misleading, or Likert scale ratings from researchers or users tasked with scoring non-empirical characteristics of model output. If applicable, authors should report any strategies implemented to address identified issues. Authors are also encouraged to use a systematic approach to classifying potential harm. We endorse no specific classification system, but for illustrative purposes, one such approach might be the World Health Organization\'s International Classification for Patient Safety, which outlines five degrees of harm severity, from no harm to death.',
            rationale: 'Safety evaluation is crucial for responsible AI deployment in healthcare settings and ensures equitable care provision.',
            examples: [
              'Stress testing with challenging prompts',
              'Red teaming to circumvent model safeguards',
              'Bias detection algorithms and user feedback analysis',
              'Quantified reporting of harmful/biased response percentages',
              'WHO International Classification for Patient Safety framework',
              'Strategies implemented to address identified issues'
            ]
          }
        }
      ]
    },
    {
      number: '11',
      section: 'Discussion',
      subsections: [
        {
          number: '11a',
          label: 'Interpretation',
          description: 'Interpret study findings in the context of relevant evidence.',
          details: {
            explanation: 'The findings of the study should be summarised and discussed in the context of the existing evidence. Authors might refer to other studies with a similar objective that have used the same or other AI tools for clinical advice; alternatively, it should report that such evidence could not be identified. The discussion should highlight the contribution of the study to the body of literature that assesses the usefulness of generative AI-driven chatbots as decision support tools for health purposes. By contextualising the study findings with existing literature, the authors can enhance the understanding of the role that generative AI might have in the dissemination of health advice in the given context. Furthermore, the authors should compare similarities and differences in performance metrics across various contexts. Comparisons will vary depending on the purpose of the study, as well as the outcome measures used by authors (as in subitem 9ai). For illustrative purposes, one hypothetical example is a study that reports that chatbots exhibit high accuracy in symptom assessment for a given condition, but another study reports that user engagement metrics of the chatbot might not match those of traditional health advice delivery methods. Thus, the discussion of findings might need to highlight not only the effectiveness of generative AI, but also areas for improvement.',
            rationale: 'Contextual interpretation helps readers understand the significance, implications, and contribution to the literature.',
            examples: [
              'Reference to similar studies using same or other AI tools',
              'Contribution to literature on AI-driven chatbots as decision support',
              'Comparison of performance metrics across contexts',
              'Discussion of effectiveness and areas for improvement'
            ]
          }
        },
        {
          number: '11b',
          label: 'Strengths and Limitations',
          description: 'Describe the strengths and limitations of the study.',
          details: {
            explanation: 'Authors should elaborate on the strengths of the study. This may be in the context of the robustness of study methodology. For instance, strengths might include the interdisciplinarity of the collaboration, or the nature of participants involved in study development. Regardless of the advantages, it is essential that authors of CHA studies clearly outline the unique elements of their study that enables readers to interpret what their study adds to the literature. Furthermore, authors should make readers aware of study limitations in an honest, detailed, and comprehensive manner. These limitations might include insufficient design and planning or problems during conduct and execution of the study such as limited sample size, unclear definitions of ground truth(s), or minimal public or patient involvement. Limitations might be substantial with important potential for impact on the internal or external validity of the study, or they could be of lesser importance, with limited expected impact on study validity. This subitem will give readers a better understanding of the credibility of the study findings and help other researchers who are performing similar research to avoid problems that they might encounter in this process. In addition, investigators should discuss any limitations related to the generalisability of study findings across populations and results of analyses conducted to address applicability to vulnerable or under-represented subgroups.',
            rationale: 'Honest appraisal of strengths and limitations helps readers properly interpret results and assists future researchers.',
            examples: [
              'Interdisciplinarity of collaboration and participant nature',
              'Unique elements that add to the literature',
              'Honest reporting of design, planning, and execution problems',
              'Discussion of impact on internal/external validity',
              'Generalisability across populations and subgroups'
            ]
          }
        },
        {
          number: '11c',
          label: 'Implications',
          description: 'Describe the potential implications for practice, education, policy, regulation, and research.',
          details: {
            explanation: 'Authors should provide a comprehensive explanation of how their study findings might impact various aspects of the healthcare ecosystem. Depending on the nature and scope of the study, authors might discuss practice implications, including the integration of generative AI models into existing workflows; their effects on patient-provider interactions; potential changes in healthcare delivery and financing models; implementation barriers; and ethical, medicolegal, and regulatory considerations. Educational implications should be explored, focusing on how AI chatbots might be incorporated into medical education and training, implications for curriculum design, opportunities for patient empowerment, and potential advancements in patient education. Research implications should also be outlined, including future areas of study, methodological improvements, the necessity for clinical validation, or potential collaborations between AI researchers and healthcare professionals.',
            rationale: 'Clear implications help stakeholders understand the practical significance and potential impact across the healthcare ecosystem.',
            examples: [
              'Integration into existing clinical workflows',
              'Effects on patient-provider interactions',
              'Implementation barriers and regulatory considerations',
              'Medical education and training implications',
              'Future research areas and methodological improvements'
            ]
          }
        }
      ]
    },
    {
      number: '12',
      section: 'Open Science',
      subsections: [
        {
          number: '12a',
          label: 'Disclosures',
          description: 'Report any relevant conflicts of interest for all authors.',
          details: {
            explanation: 'Declare all potential conflicts of interest that could influence the research or its interpretation.',
            rationale: 'Transparency about conflicts of interest maintains research integrity and reader trust.',
            examples: [
              'Financial relationships with AI companies',
              'Intellectual property interests',
              'Advisory board positions',
              'Research funding sources'
            ]
          }
        },
        {
          number: '12b',
          label: 'Funding',
          description: 'Report sources of funding and their role in the conduct and reporting of the study.',
          details: {
            explanation: 'Identify all funding sources and describe any influence on study design or conduct.',
            rationale: 'Funding transparency allows assessment of potential bias and research independence.',
            examples: [
              'Grant numbers and funding agencies',
              'Industry sponsorship details',
              'Role of funders in study design',
              'Independence statements'
            ]
          }
        },
        {
          number: '12c',
          label: 'Ethics',
          description: 'Describe the process undertaken for ethical approval.',
          subItems: [
            {
              number: '12ci',
              label: 'Data Privacy',
              description: 'Describe the measures taken to safeguard data privacy of patient health information, as applicable.',
              details: {
                explanation: 'Detail specific steps taken to protect patient privacy and sensitive health information.',
                rationale: 'Privacy protection is crucial for ethical research conduct and regulatory compliance.',
                examples: [
                  'De-identification procedures',
                  'Data encryption methods',
                  'Access controls and user authentication',
                  'Data retention and destruction policies'
                ]
              }
            },
            {
              number: '12cii',
              label: 'Permissions and Licensing',
              description: 'State whether permission/licensing was obtained for the use of original, copyrighted data.',
              details: {
                explanation: 'Document any required permissions for using copyrighted materials or proprietary data.',
                rationale: 'Proper licensing ensures legal compliance and respect for intellectual property rights.',
                examples: [
                  'Publisher permissions for clinical vignettes',
                  'Dataset licensing agreements',
                  'Copyright clearances for educational materials',
                  'Attribution requirements'
                ]
              }
            }
          ],
          details: {
            explanation: 'Detail the ethical review process and any special considerations for AI research.',
            rationale: 'Ethical oversight ensures research meets standards for responsible conduct.',
            examples: [
              'Institutional Review Board approval',
              'Ethics committee review details',
              'Special considerations for AI studies',
              'Waiver justifications if applicable'
            ]
          }
        },
        {
          number: '12d',
          label: 'Protocol',
          description: 'Provide a study protocol.',
          details: {
            explanation: 'Make the complete study protocol available to enable replication and transparency.',
            rationale: 'Protocol sharing supports reproducibility and allows evaluation of adherence to planned methods.',
            examples: [
              'Pre-registered protocol in public repository',
              'Detailed protocol in supplementary materials',
              'Version-controlled protocol documentation',
              'Protocol amendments and justifications'
            ]
          }
        },
        {
          number: '12e',
          label: 'Data Availability',
          description: 'State where study data, code repository, and model parameters can be accessed.',
          details: {
            explanation: 'Provide clear information about data and code availability for reproducibility.',
            rationale: 'Open data and code sharing enables verification, replication, and advancement of research.',
            examples: [
              'Public data repositories with DOIs',
              'GitHub repositories for analysis code',
              'Model parameter sharing platforms',
              'Data sharing agreements for sensitive data'
            ]
          }
        }
      ]
    }
  ];
  
  return (
    <PageContainer>
      <BackButton theme={theme} onClick={() => navigate('/fullchecklist')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        Back to Checklist
      </BackButton>
      
      <PageHeader theme={theme}>
        <h1>Full Checklist Information</h1>
        <p>Detailed guidance for each checklist item</p>
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
                
                {subsection.subItems && subsection.subItems.map((subItem, subItemIndex) => (
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
                          {subItem.details.examples.map((example, exampleIndex) => (
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

export default FullChecklistInformation;