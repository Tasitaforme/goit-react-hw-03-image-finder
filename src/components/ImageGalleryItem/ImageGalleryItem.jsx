import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

 const ImageGalleryItem = ({ id, src, alt, largeImageURL, onClickImage }) => {
   return (
     <GalleryItem key={id} onClick={() => onClickImage(largeImageURL, alt)}>
       <GalleryItemImage src={src} alt={alt} />
     </GalleryItem>
   );
 };
export default ImageGalleryItem;