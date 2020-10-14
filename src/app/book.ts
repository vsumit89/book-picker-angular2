export class Book {
    title : string
    authors: string[]
    averageRating: string
    imageLink: string
    description: string
    comments: [
        {
            'user' : string,
            'comment': string
        }
    ]
}
