import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function IngredientCard() {
  //   const [imageUrl, setImageUrl] = useState("");

  //   useEffect(() => {
  //     getImageByQuery(name)
  //       .then((res) => {
  //         setImageUrl(res.photos[0].src.tiny);
  //       })
  //       .catch((err) => console.error(err));
  //   });

  return (
    // <Card
    //     className="card"
    //     style={{ maxWidth: '500px', minHeight: '200px', display: 'flex' }}
    // >
    //     <CardActionArea>
    //         <Link to={`/ingredient/${id}`}>
    //             <CardMedia
    //                 style={{
    //                     width: '100%',
    //                     height: '100%',
    //                     backgroundColor: 'var(--light-orange)',
    //                 }}
    //                 image={imageUrl}
    //             />
    //         </Link>
    //     </CardActionArea>
    //     <div
    //         style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             justifyContent: 'space-between',
    //             minWidth: '140px',
    //         }}
    //     >
    //         <CardContent>
    //             <Typography gutterBottom variant="body1">
    //                 {name}
    //             </Typography>
    //         </CardContent>
    //         <CardActions>
    //             <Link to={`/ingredient/${id}`}>
    //                 <Button size="small" color="primary">
    //                     Learn More
    //                 </Button>
    //             </Link>
    //         </CardActions>
    //     </div>
    // </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/carrots.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Carrots
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor, sit amet.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default IngredientCard;
