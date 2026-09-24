"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMOTIONS = exports.INITIAL_BARBERS = exports.INITIAL_SERVICES = exports.BRAND = void 0;
exports.BRAND = {
    name: "Gentleman's Grooming Bar",
    tagline: "The Gentleman's Cut, Reconsidered.",
    subheadline: "Traditional gentlemanly refinement interpreted through a modern African grooming studio.",
    location: {
        address: "12 Bath Road, Avondale",
        city: "Harare",
        country: "Zimbabwe",
        mapQuery: "Avondale, Harare, Zimbabwe",
        phone: "+263 77 123 4567",
        email: "concierge@gentlemansbar.co.zw"
    },
    hours: [
        { day: "Monday – Friday", time: "08:00 – 18:00" },
        { day: "Saturday", time: "08:00 – 16:00" },
        { day: "Sunday", time: "Closed (By Special Request Only)" }
    ],
    colors: {
        primaryNavy: "#2A4759",
        accentCoral: "#F79B72",
        neutralLight: "#EEEEEE",
        warmCreamBg: "#F7F3EC",
        deepCinematicBg: "#16232B",
        darkText: "#18252C",
        lightText: "#F8F5EF"
    }
};
exports.INITIAL_SERVICES = [
    {
        id: "srv-classic",
        name: "The Classic Cut",
        slug: "classic-cut",
        description: "Tailored precision cut finished with hot lather neck shave, wash, and bespoke styling.",
        category: "HAIRCUTS",
        price: 10,
        duration: 35,
        featured: true,
        active: true
    },
    {
        id: "srv-fade",
        name: "The Signature Fade",
        slug: "signature-fade",
        description: "Seamless skin fade, textured top artistry, edge crisping, and premium matte finish.",
        category: "HAIRCUTS",
        price: 14,
        duration: 45,
        featured: true,
        active: true
    },
    {
        id: "srv-gentleman",
        name: "The Gentleman Experience",
        slug: "the-gentleman",
        description: "Our flagship ritual: Full haircut, precision beard sculpting, eucalyptus steam towel & scalp therapy.",
        category: "COMBOS",
        price: 20,
        duration: 60,
        featured: true,
        active: true
    },
    {
        id: "srv-beard-sculpt",
        name: "Beard Sculpt & Treatment",
        slug: "beard-sculpt",
        description: "Freehand sculpting, straight razor line definition, infused botanical oil treatment & hot towel compress.",
        category: "BEARD",
        price: 8,
        duration: 25,
        featured: false,
        active: true
    },
    {
        id: "srv-father-son",
        name: "Father & Son Duo",
        slug: "father-and-son",
        description: "Side-by-side chairs, full signature cuts for both, warm beverages, and complimentary styling.",
        category: "COMBOS",
        price: 22,
        duration: 50,
        featured: false,
        active: true
    },
    {
        id: "srv-ritual",
        name: "The Royal Grooming Ritual",
        slug: "royal-ritual",
        description: "The complete studio takeover: Custom cut, facial cleanse, hot towel lather shave, and neck massage.",
        category: "TREATMENTS",
        price: 30,
        duration: 75,
        featured: true,
        active: true
    }
];
exports.INITIAL_BARBERS = [
    {
        id: "barber-tawanda",
        name: "Tawanda Moyo",
        slug: "tawanda-moyo",
        role: "Master Barber & Studio Lead",
        bio: "With over 11 years perfecting gentleman fades and beard artistry in Harare, Tawanda crafts sharp, enduring silhouettes with surgical precision.",
        specialties: ["Precision Skin Fades", "Scissor Work", "Beard Sculpting"],
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        actionPhoto: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
        experienceYears: 11,
        active: true
    },
    {
        id: "barber-farai",
        name: "Farai Chiwara",
        slug: "farai-chiwara",
        role: "Senior Stylist & Texture Specialist",
        bio: "Farai is known for bespoke textured cuts, artistic taper designs, and revitalizing hot-towel scalp relaxation rituals.",
        specialties: ["Textured Cuts", "Taper Fades", "Scalp Massage"],
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        actionPhoto: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
        experienceYears: 8,
        active: true
    },
    {
        id: "barber-simba",
        name: "Simbarashe Mutasa",
        slug: "simbarashe-mutasa",
        role: "Traditional Blade & Shave Craftsman",
        bio: "Trained in old-world straight razor mechanics, Simba delivers the smoothest traditional hot-lather shaves in Zimbabwe.",
        specialties: ["Straight Razor Shaves", "Classic Gentlemen Cuts", "Beard Conditioning"],
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        actionPhoto: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80",
        experienceYears: 9,
        active: true
    }
];
exports.PROMOTIONS = [
    {
        code: "FIRSTGUEST",
        title: "Welcome to The Chair",
        description: "Complimentary beard tidy or $4 off any signature haircut on your first booking.",
        discountType: "FIXED",
        discountValue: 4,
        addonServiceName: "Complimentary Beard Sculpt",
        active: true
    }
];
