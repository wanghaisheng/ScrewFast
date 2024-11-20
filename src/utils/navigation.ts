interface NavBarLink {
  name: string;
  url: string;
}

interface FooterLink {
  name: string;
  url: string;
}

interface FooterSection {
  section: string;
  links: FooterLink[];
}

interface SocialLinks {
  facebook: string;
  x: string; // Twitter/X
  github: string;
  google: string;
  slack: string;
}

export interface Navlinks {
  navBarLinks: NavBarLink[];
  footerLinks: FooterSection[];
  socialLinks: SocialLinks;
}

