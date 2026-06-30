import {
  makeStyles,
  Card,
  CardHeader,
  Text,
  Button,
  tokens,
  shorthands,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    alignItems: "center",
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    width: "100%",

    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  card: {
    ...shorthands.padding("20px"),
    textAlign: "center",
    backgroundColor: tokens.colorNeutralBackground1,
  },

  price: {
    fontSize: "26px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },

  desc: {
    color: tokens.colorNeutralForeground2,
  },
});

const items = [
  {
    id: "1",
    title: "Starter Plan",
    description: "Perfect for beginners and small projects",
    price: "20$",
  },
  {
    id: "2",
    title: "Pro Plan",
    description: "Best for growing teams and startups",
    price: "49$",
  },
  {
    id: "3",
    title: "Enterprise Plan",
    description: "Advanced features for large organizations",
    price: "99$",
  },
];

export default function Pricing() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Title */}
      <Text className={styles.title}>Pricing Plans</Text>

      {/* Grid */}
      <div className={styles.grid}>
        {items.map((item) => (
          <Card key={item.id} className={styles.card}>
            <CardHeader header={<Text weight="semibold">{item.title}</Text>} />

            <Text className={styles.price}>{item.price}</Text>

            <Text className={styles.desc}>{item.description}</Text>

            <Button appearance="primary" style={{ marginTop: "16px" }}>
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}