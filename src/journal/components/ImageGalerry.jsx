/* eslint-disable react/prop-types */
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGalerry = ({images = []}) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={164}>
      {images.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}`}
            src={`${item}`}
            alt={item + "image"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
