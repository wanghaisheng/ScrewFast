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


interface EmailSub{
  section:string;
  title:string;
  label:string;
  content:string;
  placeholder:string;
}
export interface Navlinks {
  navBarLinks: NavBarLink[];
  footerLinks: FooterSection[];
  socialLinks: SocialLinks;
  emailsub:EmailSub;
  powerBy:PowerBy;
}

export interface PowerBy{
  text:string;
  link:string;
  linkText:string;
}