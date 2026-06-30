import {
  makeStyles,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    padding: "40px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,
  },

  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Faq() {
  const styles = useStyles();

  const items = [
    {
      question: "What is FlowAI?",
      answer:
        "FlowAI is a modern SaaS platform that helps you build AI-powered workflows faster.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes, you can start for free and upgrade anytime for advanced features.",
    },
    {
      question: "Can I integrate APIs?",
      answer:
        "Yes, FlowAI supports REST APIs and custom integrations.",
    },
    {
      question: "Is there mobile support?",
      answer:
        "Yes, the platform is fully responsive and works on all devices.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div>
        <Text className={styles.title}>Frequently Asked Questions</Text>
        <Text className={styles.subtitle}>
          Everything you need to know about FlowAI
        </Text>
      </div>

      {/* Accordion */}
      <Accordion collapsible>
        {items.map((item, index) => (
          <AccordionItem key={index} value={index}>
            <AccordionHeader>{item.question}</AccordionHeader>
            <AccordionPanel>
              <Text>{item.answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}