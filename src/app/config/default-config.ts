import {ConfigSchema} from "../services/config.schema";


export const DEFAULT_CONFIG: ConfigSchema = {
    branding: {
        primaryColor: '#007BFF',
        secondaryColor: '#6C757D',
        fontFamily: 'sans-serif',
        logo: '/assets/img/instal-larnet.png',
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
            textColor: 'text-primary',
            fontSize: '3rem',
            animationDelay: '0.2s',
        },
        subheadline: {
            text: 'Soluciones en climatización y redes a medida',
            font: 'text-xl md:text-2xl',
            weight: '400',
            textColor: 'text-gray-700',
            fontSize: '1.25rem',
            animationDelay: '0.4s',
        },
        buttons: [
            {
                text: 'Contactar',
                link: '#contacto',
                bgColor: 'bg-primary',
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

    footer: {
        text: '© 2025 Instal·larnet. Todos los derechos reservados.',
        links: [
            { label: 'Aviso Legal', url: '/aviso-legal' },
            { label: 'Política de Privacidad', url: '/privacidad' },
        ],
    },
};

