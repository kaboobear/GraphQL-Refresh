import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Post } from "../../types/post.interface";

interface Props {
  item: Post;
}

export const Item = ({ item }: Props) => {
  return (
    <Card sx={{ height: 1, display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Typography variant="subtitle2">{item.title}</Typography>
        <Typography variant="body2">{item.content}</Typography>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button size="small" LinkComponent={Link}>
          <Link to={`/${item.id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
