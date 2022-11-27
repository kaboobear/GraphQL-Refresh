import { Grid } from "@mui/material";
import { Post } from "../../types/post.interface";
import { Item } from "./Item";

interface Props {
  items: Post[];
}

export const ItemsList = ({ items }: Props) => {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.id} item sm={4}>
          <Item item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
