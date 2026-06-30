import {
  makeStyles,
  Card,
  Text,
  Avatar,
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

  subtitle: {
    color: tokens.colorNeutralForeground2,
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
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    backgroundColor: tokens.colorNeutralBackground1,
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  name: {
    fontWeight: 600,
  },

  text: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Testimonials() {
  const styles = useStyles();

  const data = [
    {
      name: "Sarah Ahmed",
      role: "Product Manager",
      text: "FlowAI completely changed how we build workflows. Super fast and intuitive!",
    },
    {
      name: "John Carter",
      role: "Developer",
      text: "The best AI tool I’ve used. Clean UI and powerful automation features.",
    },
    {
      name: "Emily Smith",
      role: "Founder",
      text: "We scaled our startup faster thanks to FlowAI. Highly recommended.",
    },
  ];
  

  return (
    <div className={styles.container}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <Text className={styles.title}>What Users Say</Text>
        <Text className={styles.subtitle}>
          Real feedback from our customers
        </Text>
      </div>

      {/* Testimonials */}
      <div className={styles.grid}>
        {data.map((item, index) => (
          <Card key={index} className={styles.card}>
            <Text className={styles.text}>"{item.text}"</Text>

            <div className={styles.user}>
              <Avatar name={item.name} />
              <div>
                <Text className={styles.name}>{item.name}</Text>
                <Text size={200}>{item.role}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}