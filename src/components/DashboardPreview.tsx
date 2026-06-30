import {
  Card,
  CardHeader,
  Text,
  Button,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "24px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "22px",
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },

  card: {
    ...shorthands.padding("16px"),
    backgroundColor: tokens.colorNeutralBackground1,
  },

  statNumber: {
    fontSize: "26px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
});

export default function DashboardPreview() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Text className={styles.title}>Dashboard Preview</Text>
          <Text size={200}>Welcome back 👋 here’s your overview</Text>
        </div>

        <div className={styles.actions}>
          <Button appearance="primary">Create New</Button>
          <Button appearance="subtle">Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.grid}>
        <Card className={styles.card}>
          <CardHeader header={<Text>Total Users</Text>} />
          <Text className={styles.statNumber}>12,430</Text>
        </Card>

        <Card className={styles.card}>
          <CardHeader header={<Text>Revenue</Text>} />
          <Text className={styles.statNumber}>$48,920</Text>
        </Card>

        <Card className={styles.card}>
          <CardHeader header={<Text>Active Projects</Text>} />
          <Text className={styles.statNumber}>18</Text>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className={styles.card}>
        <CardHeader header={<Text>Recent Activity</Text>} />
        <Text size={300}>
          • User John created a new project  
          • Payment received from Stripe  
          • New user registered  
        </Text>
      </Card>
    </div>
  );
}