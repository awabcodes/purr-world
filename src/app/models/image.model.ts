import { Breed } from './breed.model';
import { Category } from './category.model';

export class Image {
    constructor(
        public id?: string,
        public url?: string, // format: url
        public sub_id?: string,
        public created_at?: string, // format: date-time
        public original_filename?: string,
        public categories?: Category[],
        public breeds?: Breed[],
    ) {
    }
}