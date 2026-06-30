import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardHeader,
  ProgressBar,
  Text,
} from "@fluentui/react-components";

import { useHeroStyles } from "./Hero.styles";

export default function Hero() {
  const styles = useHeroStyles();

  return (
    <section className={styles.hero}>
      {/* Left Side */}
      <div className={styles.left}>
        <div className={styles.badgeContainer}>
          <Badge appearance="filled" color="success">
            🚀 New Release
          </Badge>

          <Badge appearance="outline">
            Trusted by 10,000+ teams
          </Badge>
        </div>

        <h1 className={styles.title}>
          Build Modern Apps with{" "}
          <span className={styles.highlight}>FlowAI</span>
        </h1>

        <Text className={styles.description}>
          The next-generation AI productivity platform for developers,
          designers, and businesses. Automate workflows, collaborate with your
          team, and ship faster than ever.
        </Text>

        <div className={styles.buttonGroup}>
          <Button appearance="primary" size="large">
            Get Started
          </Button>

          <Button appearance="secondary" size="large">
            Watch Demo
          </Button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <Text className={styles.statNumber}>10K+</Text>
            <Text className={styles.statLabel}>Customers</Text>
          </div>

          <div className={styles.statCard}>
            <Text className={styles.statNumber}>99.9%</Text>
            <Text className={styles.statLabel}>Uptime</Text>
          </div>

          <div className={styles.statCard}>
            <Text className={styles.statNumber}>24/7</Text>
            <Text className={styles.statLabel}>Support</Text>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <Card className={styles.imageCard}>
          <CardHeader
            header={
              <Text weight="semibold">
                Team Dashboard
              </Text>
            }
            description="Live Project Overview"
          />

          <ProgressBar value={0.82} />

          <br />

          <Text weight="semibold">Project Completion</Text>

          <Text>82% completed</Text>

          <br />

          <AvatarGroup layout="stack">
            <Avatar name="John Doe" />
            <Avatar name="Sarah Smith" />
            <Avatar name="Michael Brown" />
            <Avatar name="Emily Johnson" />
          </AvatarGroup>

          <br />

          <Card appearance="filled-alternative">
            <Text weight="semibold">
              AI Assistant
            </Text>

            <Text>
              ✔ Generated today's sprint report.
            </Text>

            <Text>
              ✔ Reviewed 15 pull requests.
            </Text>

            <Text>
              ✔ Scheduled tomorrow's stand-up meeting.
            </Text>
          </Card>
        </Card>
      </div>
    </section>
  );
}