import {
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";

export const useHeroStyles = makeStyles({
  hero: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    ...shorthands.padding("80px", "64px"),

    backgroundColor: tokens.colorNeutralBackground1,
    gap: "80px",

    "@media (max-width: 1024px)": {
      flexDirection: "column",
      textAlign: "center",
      ...shorthands.padding("60px", "32px"),
    },

    "@media (max-width: 768px)": {
      ...shorthands.padding("40px", "20px"),
    },
  },

  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  badgeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  title: {
    fontSize: "64px",
    lineHeight: "72px",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,

    "@media (max-width:768px)": {
      fontSize: "42px",
      lineHeight: "48px",
    },
  },

  highlight: {
    color: tokens.colorBrandForeground1,
  },

  description: {
    fontSize: "20px",
    lineHeight: "34px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "600px",

    "@media (max-width:768px)": {
      fontSize: "18px",
      lineHeight: "30px",
      maxWidth: "100%",
    },
  },

  buttonGroup: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",

    "@media (max-width:768px)": {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },

  stats: {
    display: "flex",
    gap: "40px",
    marginTop: "40px",

    "@media (max-width:768px)": {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },

  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    minWidth: "120px",

    backgroundColor: tokens.colorNeutralBackground2,

    ...shorthands.padding("20px"),

    ...shorthands.borderRadius(tokens.borderRadiusLarge),

    boxShadow: tokens.shadow4,
  },

  statNumber: {
    fontSize: "30px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },

  statLabel: {
    fontSize: "15px",
    color: tokens.colorNeutralForeground2,
    marginTop: "8px",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  imageCard: {
    width: "100%",
    maxWidth: "560px",

    backgroundColor: tokens.colorNeutralBackground2,

    ...shorthands.padding("32px"),

    ...shorthands.borderRadius(tokens.borderRadiusXLarge),

    boxShadow: tokens.shadow16,
  },

  dashboardImage: {
    width: "100%",
    borderRadius: tokens.borderRadiusLarge,
    display: "block",
  },
});