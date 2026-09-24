export declare const BRAND: {
    name: string;
    tagline: string;
    subheadline: string;
    location: {
        address: string;
        city: string;
        country: string;
        mapQuery: string;
        phone: string;
        email: string;
    };
    hours: {
        day: string;
        time: string;
    }[];
    colors: {
        primaryNavy: string;
        accentCoral: string;
        neutralLight: string;
        warmCreamBg: string;
        deepCinematicBg: string;
        darkText: string;
        lightText: string;
    };
};
export declare const INITIAL_SERVICES: ({
    id: string;
    name: string;
    slug: string;
    description: string;
    category: "HAIRCUTS";
    price: number;
    duration: number;
    featured: boolean;
    active: boolean;
} | {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: "COMBOS";
    price: number;
    duration: number;
    featured: boolean;
    active: boolean;
} | {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: "BEARD";
    price: number;
    duration: number;
    featured: boolean;
    active: boolean;
} | {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: "TREATMENTS";
    price: number;
    duration: number;
    featured: boolean;
    active: boolean;
})[];
export declare const INITIAL_BARBERS: {
    id: string;
    name: string;
    slug: string;
    role: string;
    bio: string;
    specialties: string[];
    photo: string;
    actionPhoto: string;
    experienceYears: number;
    active: boolean;
}[];
export declare const PROMOTIONS: {
    code: string;
    title: string;
    description: string;
    discountType: "FIXED";
    discountValue: number;
    addonServiceName: string;
    active: boolean;
}[];
