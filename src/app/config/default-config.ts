import { ConfigSchema } from "../services/config.schema";

export const DEFAULT_CONFIG_ES: ConfigSchema = {
    branding: {
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'sans-serif',
        logo: '/assets/img/instal-larnet.png',
    },
    section_header: {
        home: 'Inicio',
        services: 'Servicios',
        team: 'Equipo',
        maintenance: 'Mantenimiento',
    },
    section_hero: {
        visible: true,
        background: {
            color: '#f0f0f0',
            image: '',
            position: 'center',
            size: 'cover',
            repeat: 'no-repeat',
        },
        headline: {
            text: 'Bienvenidos a Instal·larnet',
            font: 'text-4xl md:text-6xl',
            weight: '700',
            textColor: 'text-white',
            fontSize: '3rem',
            animationDelay: '0.2s',
        },
        subheadline: {
            text: 'Soluciones en climatización y redes a medida',
            font: 'text-xl md:text-2xl',
            weight: '400',
            textColor: 'text-white',
            fontSize: '1.25rem',
            animationDelay: '0.4s',
        },
        buttons: [
            {
                text: 'Contactar',
                link: '#contacto',
                bgColor: 'bg-primary border border-white',
                textColor: 'text-white',
            },
            {
                text: 'Servicios',
                link: '#servicios',
                bgColor: 'bg-white',
                textColor: 'text-primary',
            },
        ],
    },
    section_services: {
        visible: true,
        title: 'Nuestros Servicios',
        items: [
            {
                icon: 'wifi',
                title: 'Redes',
                description: 'Instalación y configuración de redes seguras y rápidas.',
            },
            {
                icon: 'ac_unit',
                title: 'Climatización',
                description: 'Soluciones eficientes para calefacción y aire acondicionado.',
            },
        ],
    },
    section_contact: {
        visible: true,
        title: 'Contáctanos',
        subtitle: 'Estamos aquí para ayudarte',
        email: 'info@instal-larnet.com',
        phone: '+34 600 000 000',
        address: 'Tarragona, España',
        mapEmbedUrl: 'https://maps.google.com/?q=Tarragona',
    },
    section_footer: {
        text: '© 2025 Instal·larnet. Todos los derechos reservados.',
        links: [
            { label: 'Aviso Legal', url: '/aviso-legal' },
            { label: 'Política de Privacidad', url: '/privacidad' },
        ],
    },
};

export const DEFAULT_CONFIG_EN: ConfigSchema = {
    branding: {
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'sans-serif',
        logo: '/assets/img/instal-larnet.png',
    },
    section_header: {
        home: 'Home',
        services: 'Services',
        team: 'Team',
        maintenance: 'Maintenance',
    },
    section_hero: {
        visible: true,
        background: {
            color: '#f0f0f0',
            image: '',
            position: 'center',
            size: 'cover',
            repeat: 'no-repeat',
        },
        headline: {
            text: 'Welcome to Instal·larnet',
            font: 'text-4xl md:text-6xl',
            weight: '700',
            textColor: 'text-white',
            fontSize: '3rem',
            animationDelay: '0.2s',
        },
        subheadline: {
            text: 'Tailored climate and network solutions',
            font: 'text-xl md:text-2xl',
            weight: '400',
            textColor: 'text-white',
            fontSize: '1.25rem',
            animationDelay: '0.4s',
        },
        buttons: [
            {
                text: 'Contact Us',
                link: '#contact',
                bgColor: 'bg-primary border border-white',
                textColor: 'text-white',
            },
            {
                text: 'Services',
                link: '#services',
                bgColor: 'bg-white',
                textColor: 'text-primary',
            },
        ],
    },
    section_services: {
        visible: true,
        title: 'Our Services',
        items: [
            {
                icon: 'wifi',
                title: 'Networks',
                description: 'Installation and configuration of fast and secure networks.',
            },
            {
                icon: 'ac_unit',
                title: 'Air Conditioning',
                description: 'Efficient solutions for heating and air conditioning.',
            },
        ],
    },
    section_contact: {
        visible: true,
        title: 'Contact Us',
        subtitle: 'We are here to help you',
        email: 'info@instal-larnet.com',
        phone: '+34 600 000 000',
        address: 'Tarragona, Spain',
        mapEmbedUrl: 'https://maps.google.com/?q=Tarragona',
    },
    section_footer: {
        text: '© 2025 Instal·larnet. All rights reserved.',
        links: [
            { label: 'Legal Notice', url: '/legal' },
            { label: 'Privacy Policy', url: '/privacy' },
        ],
    },
};

export const DEFAULT_CONFIG_CA: ConfigSchema = {
    branding: {
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'sans-serif',
        logo: '/assets/img/instal-larnet.png',
    },
    section_header: {
        home: 'Inici',
        services: 'Serveis',
        team: 'Equip',
        maintenance: 'Manteniment',
    },
    section_hero: {
        visible: true,
        background: {
            color: '#f0f0f0',
            image: '',
            position: 'center',
            size: 'cover',
            repeat: 'no-repeat',
        },
        headline: {
            text: 'Benvinguts a Instal·larnet',
            font: 'text-4xl md:text-6xl',
            weight: '700',
            textColor: 'text-white',
            fontSize: '3rem',
            animationDelay: '0.2s',
        },
        subheadline: {
            text: 'Solucions a mida en climatització i xarxes',
            font: 'text-xl md:text-2xl',
            weight: '400',
            textColor: 'text-white',
            fontSize: '1.25rem',
            animationDelay: '0.4s',
        },
        buttons: [
            {
                text: 'Contacta',
                link: '#contacte',
                bgColor: 'bg-primary border border-white',
                textColor: 'text-white',
            },
            {
                text: 'Serveis',
                link: '#serveis',
                bgColor: 'bg-white ',
                textColor: 'text-primary',
            },
        ],
    },
    section_services: {
        visible: true,
        title: 'Els nostres serveis',
        items: [
            {
                icon: 'wifi',
                title: 'Xarxes',
                description: 'Instal·lació i configuració de xarxes ràpides i segures.',
            },
            {
                icon: 'ac_unit',
                title: 'Climatització',
                description: 'Solucions eficients per a calefacció i aire condicionat.',
            },
        ],
    },
    section_contact: {
        visible: true,
        title: 'Contacta amb nosaltres',
        subtitle: 'Som aquí per ajudar-te',
        email: 'info@instal-larnet.com',
        phone: '+34 600 000 000',
        address: 'Tarragona, Espanya',
        mapEmbedUrl: 'https://maps.google.com/?q=Tarragona',
    },
    section_footer: {
        text: '© 2025 Instal·larnet. Tots els drets reservats.',
        links: [
            { label: 'Avís legal', url: '/avis-legal' },
            { label: 'Política de privacitat', url: '/privacitat' },
        ],
    },
};

export const LANGUAGE_CONFIG: Record<string, ConfigSchema> = {
    es: DEFAULT_CONFIG_ES,
    en: DEFAULT_CONFIG_EN,
    ca: DEFAULT_CONFIG_CA,
};
