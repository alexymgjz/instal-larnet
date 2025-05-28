export interface Branding {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logo: string;
}
export interface SectionHeader {
    home: string;
    services: string;
    team: string;
    maintenance: string;
}
export interface HeroButton {
    text: string;
    link: string;
    bgColor: string;
    textColor: string;
}

export interface SectionHeadline {
    text: string;
    font: string;
    weight: string;
    textColor: string;
    fontSize: string;
    animationDelay: string;
}

export interface SectionBackground {
    color: string;
    image: string;
    position: string;
    size: string;
    repeat: string;
}

export interface SectionHero {
    visible: boolean;
    headline: SectionHeadline;
    subheadline: SectionHeadline;
    background: SectionBackground;
    buttons: HeroButton[];
}

export interface SectionServiceItem {
    icon: string;
    title: string;
    description: string;
}

export interface SectionServices {
    visible: boolean;
    title: string;
    items: SectionServiceItem[];
}

export interface SectionContact {
    visible: boolean;
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
    mapEmbedUrl: string;
}

export interface Footer {
    text: string;
    links: {
        label: string;
        url: string;
    }[];
}

export interface ConfigSchema {
    branding: Branding;
    section_header: SectionHeader;
    section_hero: SectionHero;
    section_services: SectionServices;
    section_contact: SectionContact;
    section_footer: Footer;
}
