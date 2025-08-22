import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {

    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }

    // amra division create korar jonno ekta pre save hook banaisi tai nicher line gula commend kore disi
    // const baseSlug = payload.name.toLowerCase().split(" ").join("-")  // name k space diye vag korlam then  tar majhe - diye dilam.
    // let slug = `${baseSlug}-division` // && last division ta add kore dilam.

    // let counter = 0;
    // while (await Division.exists({ slug })) { // ==>> jodi division ta already thake taile by chanch abar jodi create kore taile last a ekta unic  number add korbe
    //     slug = `${slug}-${counter++}` // dhaka-division-2
    // }

    // payload.slug = slug;

    const division = await Division.create(payload);

    return division
};

// get all division
const getAllDivisions = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Division.find(), query)

    const divisionsData = queryBuilder
        .search(divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

// geting single division
const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    return {
        data: division,
    }
};

// update division
const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id }, /// ai id sara o division model ai name onno jaigei thakte parbe na.
    });

    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }

    // if (payload.name) {
    //     const baseSlug = payload.name.toLowerCase().split(" ").join("-")
    //     let slug = `${baseSlug}-division`

    //     let counter = 0;
    //     while (await Division.exists({ slug })) {
    //         slug = `${slug}-${counter++}` // dhaka-division-2
    //     }

    //     payload.slug = slug
    // }

    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    if (payload.thumbnail && existingDivision.thumbnail) { /// jokhon amader division update success hobe tokhon amra ai kaj ta korbo
        await deleteImageFromCLoudinary(existingDivision.thumbnail)
    }

    return updatedDivision

};

// delete division
const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);
    return null;
};

export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
