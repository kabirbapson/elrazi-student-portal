import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
} from "@mui/material";
import { use, useContext } from "react";
import { AuthContext } from "src/context";

export const AddressForm = ({ onNext, onBack, user }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} my={"20px"}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            defaultValue={user?.country || ""}
            render={({ field }) => <TextField {...field} label="Country" required fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            defaultValue={user?.state || ""}
            render={({ field }) => <TextField {...field} label="State" fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            defaultValue={user?.address || ""}
            render={({ field }) => <TextField {...field} label="Address" fullWidth />}
          />
        </Grid>
      </Grid>
      <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
        <Button varian={"outlined"} onClick={onBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Stack>
    </form>
  );
};
