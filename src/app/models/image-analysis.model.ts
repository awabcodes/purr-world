
export class ImageAnalysis {
    constructor(
        public image_id?: string,
        public labels?: any[],
        public moderation_labels?: any[],
        public vendor?: string,
        public approved?: number, // min: 0, max: 1
        public rejected?: number, // min: 0, max: 1
    ) {
    }
}