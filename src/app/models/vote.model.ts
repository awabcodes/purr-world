
export class Vote {
    constructor(
        public value?: number, // required
        public image_id?: string, // required
        public sub_id?: string,
        public created_at?: string, // format: date-time
        public id?: string,
        public country_code?: string,
    ) {
    }
}