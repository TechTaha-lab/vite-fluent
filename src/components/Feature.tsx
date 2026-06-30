import {
  makeStyles,
  Card,
  CardHeader,
  Text,
  tokens,
  shorthands,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
  },

  subtitle: {
    color: tokens.colorNeutralForeground2,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  card: {
    ...shorthands.padding("18px"),
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
    },
  },

  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground,
    marginBottom: "12px",
  },

  featureText: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Feature() {
  const styles = useStyles();

  const features = [
    {
      title: "AI Automation",
      desc: "Automate workflows with intelligent AI agents.",
    },
    {
      title: "Fast Performance",
      desc: "Built for speed and scalability at every level.",
    },
    {
      title: "Secure System",
      desc: "Enterprise-grade security and data protection.",
    },
    {
      title: "API Integration",
      desc: "Connect easily with REST APIs and services.",
    },
    {
      title: "Custom Dashboards",
      desc: "Build dashboards tailored to your needs.",
    },
    {
      title: "Real-time Sync",
      desc: "Live updates across all your devices.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Text className={styles.title}>Powerful Features</Text>
        <Text className={styles.subtitle}>
          Everything you need to build modern AI-powered apps
        </Text>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {features.map((f, index) => (
          <Card key={index} className={styles.card}>
            <div className={styles.iconBox} />

            <CardHeader header={<Text weight="semibold">{f.title}</Text>} />

            <Text className={styles.featureText}>{f.desc}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}