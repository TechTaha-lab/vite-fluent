import {
  makeStyles,
  Text,
  Link,
  Divider,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  footer: {
    marginTop: "60px",
    padding: "40px 24px",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
  },

  brand: {
    fontSize: "20px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },

  links: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  bottom: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
});

export default function Footer() {
  const styles = useStyles();

  const items = ["Home", "Features", "Pricing", "About", "Contact"];

  return (
    <footer className={styles.footer}>
      {/* Top section */}
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.column}>
          <Text className={styles.brand}>FlowAI</Text>
          <Text size={200}>
            Build modern AI-powered workflows faster.
          </Text>
        </div>

        {/* Links */}
        <div className={styles.column}>
          <Text weight="semibold">Quick Links</Text>
          <div className={styles.links}>
            {items.map((item) => (
              <Link key={item} href="#">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className={styles.column}>
          <Text weight="semibold">Resources</Text>
          <Link href="#">Docs</Link>
          <Link href="#">Support</Link>
          <Link href="#">Privacy Policy</Link>
        </div>
      </div>

      <Divider />

      {/* Bottom section */}
      <div className={styles.bottom}>
        <Text>© {new Date().getFullYear()} FlowAI. All rights reserved.</Text>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="#">Terms</Link>
          <Link href="#">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}