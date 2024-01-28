import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "src/context";

export const PersonalInfoForm = ({ onNext, user }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} my={"20px"}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            defaultValue={user?.email || ""}
            render={({ field }) => (
              <TextField {...field} label="Email" disabled={true} required fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="first_name"
            control={control}
            defaultValue={user?.first_name || ""}
            render={({ field }) => (
              <TextField {...field} label="First Name" disabled={true} required fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="last_name"
            control={control}
            defaultValue={user?.last_name || ""}
            render={({ field }) => (
              <TextField {...field} label="Last Name" disabled={true} required fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="other_name"
            control={control}
            defaultValue={user?.other_name || ""}
            render={({ field }) => <TextField {...field} label="Other Name" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue={user?.gender || ""}
              render={({ field }) => (
                <Select {...field} labelId="gender-label" label="Gender" required>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dob"
            control={control}
            defaultValue={user?.dob || ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            )}
          />
        </Grid>
        {/* Add other personal info fields */}
      </Grid>

      <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
        <Button variant="contained" type="submit">
          Next
        </Button>
      </Stack>
    </form>
  );
};
