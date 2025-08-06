import { Types } from "mongoose";

export interface ITourType {
    name: string;
}
export interface ITour {
    title: string;
    slug: string;
    description?: string;
    images?: string[];
    location?: string;
    costFrom?: number;
    startDate?: Date
    departureLocation?: string;
    arrivalLocation?: string;
    endDate?: Date;
    included?: string[]; // user ki ki faselatis pabe tar array hobe
    excluded?: string[]
    amenities?: string[]; // tala ki ki dibe.
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    division: Types.ObjectId
    tourType: Types.ObjectId
    deleteImages?: string[]
}