import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useNavbarStyles = makeStyles({
  navbar: {
    height: "72px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    ...shorthands.padding("0", "48px"),

    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,

    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontSize: "28px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },

  links: {
    display: "flex",
    alignItems: "center",
    columnGap: "30px",
    "@media (max-width: 768px)": {
      display: "none", // 👈 hides desktop links on mobile
    },
  },

  right: {
    display: "flex",
    alignItems: "center",
    columnGap: "18px",
  },

  search: {
    width: "260px",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },

  // ✅ NEW: desktop CTA button
  desktopButton: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },

  // ✅ NEW: mobile menu button
  mobileMenuButton: {
    display: "none",

    "@media (max-width: 768px)": {
      display: "inline-flex",
    },
  },

  // (optional but recommended) hide full nav on mobile
  linksMobileHidden: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },

  // (optional) hide search on small screens if needed
  searchMobileHidden: {
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
});
