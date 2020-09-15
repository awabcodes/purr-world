
export class Breed {
    constructor(
        public id?: string,
        public name?: string,
        public temperament?: string,
        public life_span?: string,
        public alt_names?: string,
        public wikipedia_url?: string,
        public origin?: string,
        public weight_imperial?: string,
        public experimental?: number, // min: 0, max: 1
        public hairless?: number, // min: 0, max: 1
        public natural?: number, // min: 0, max: 1
        public rare?: number, // min: 0, max: 1
        public rex?: number, // min: 0, max: 1
        public suppress_tail?: number, // min: 0, max: 1
        public short_legs?: number, // min: 0, max: 1
        public hypoallergenic?: number, // min: 0, max: 1
        public adaptability?: number, // min: 1, max: 5
        public affection_level?: number, // min: 1, max: 5
        public country_code?: string,
        public child_friendly?: number, // min: 1, max: 5
        public dog_friendly?: number, // min: 1, max: 5
        public energy_level?: number, // min: 1, max: 5
        public grooming?: number, // min: 1, max: 5
        public health_issues?: number, // min: 1, max: 5
        public intelligence?: number, // min: 1, max: 5
        public shedding_level?: number, // min: 1, max: 5
        public social_needs?: number, // min: 1, max: 5
        public stranger_friendly?: number, // min: 1, max: 5
        public vocalisation?: number, // min: 1, max: 5
    ) {
    }
}