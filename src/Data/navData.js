const commonNavData = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/blogs",
    title: "Blogs",
  },
  
 
];

export const afterLoginNavData = [
  ...commonNavData,
  {
    path: "/dashboard",
    title: "Dashboard",
  },
];

export const beforeLoginNavData = [
  ...commonNavData,

  {
    path: "/login",
    title: "Login",
  },
];

