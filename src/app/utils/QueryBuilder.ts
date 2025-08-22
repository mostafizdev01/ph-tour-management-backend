import { Query } from "mongoose";
import { excludeField } from "../constants";

//*** ai khane searching, filtering, sorting, pagination er functionality er kaj gula kora hoise. jno amara sob model ei use korte pari
export class QueryBuilder<T> { // create class => class name is QueryBuilder
    public modelQuery: Query<T[], T>; /// create class variable. variable name is modelQuery. && type Query ta mongoose theke ashtese. aitar type hobe generic type => generic type => anything types
    public readonly query: Record<string, string>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }


    filter(): this { // get filter query
        const filter = { ...this.query } // copy filter query

        for (const field of excludeField) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[field]
        }

        this.modelQuery = this.modelQuery.find(filter) // Tour.find().find(filter)

        return this;
    }

    search(searchableField: string[]): this { // searchableField ekta parametter er mordhe => query ashtese
        const searchTerm = this.query.searchTerm || "" /// search keyword ta paitesi
        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))  // field arr theke searchtearm khujtesi
        }
        this.modelQuery = this.modelQuery.find(searchQuery)
        return this
    }

    sort(): this {

        const sort = this.query.sort || "-createdAt";

        this.modelQuery = this.modelQuery.sort(sort)

        return this;
    }
    fields(): this {

        const fields = this.query.fields?.split(",").join(" ") || ""

        this.modelQuery = this.modelQuery.select(fields)

        return this;
    }
    paginate(): this {

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10
        const skip = (page - 1) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this;
    }

    build() {
        return this.modelQuery  // model query ta jno build call kore pai tar jonno build function ta crate korsi.
    }

    async getMeta() {
        const totalDocuments = await this.modelQuery.model.countDocuments()

        const page = Number(this.query.page) || 1
        const limit = Number(this.query.limit) || 10

        const totalPage = Math.ceil(totalDocuments / limit)

        return { page, limit, total: totalDocuments, totalPage }
    }
}
