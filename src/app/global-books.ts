import { Injectable } from '@angular/core';
@Injectable()
class volume_info {
    volumeInfo : book
}
class book {
    title : string
    description : string
    authors : Array<''>
    averageRating : number
    imageLinks : image_link
}
class image_link {
    thumbnail = ''
}
export class GlobalBooks {
    items : volume_info[]
}
