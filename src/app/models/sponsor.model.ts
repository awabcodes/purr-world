
export class Sponsor {
    constructor(
        public name?: string, // Name of the person/team/company sponsoring the API
        public description?: string, // A breif strapline or description of the company
        public url?: string, // Companies website url
        public logo_url?: string, // URL of the companies logo (250x100)
    ) {
    }
}