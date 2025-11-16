import {
  Button,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeartbeat } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";

const RegisterPage = () => {

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      role: "PATIENT",
      name:"",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name:(value:string) => (!value?"Name is required":null),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        !value
          ? "Password is required"
          : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
              value
            )
          ? null
          : "Password must be 8-15 chars, include upper, lower, number & special char",

      confirmPassword: (value: string, values: any) =>
        value === values.password ? null : "Password dont match",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    setLoading(true);
    registerUser(values).then((data)=>{
      console.log(data);
      successNotification("Registered Successfully")
      navigate("/login");
    }).catch((error)=>{
      console.log(error);
      errorNotification(error.response.data.errorMessage)
    }).finally(()=>setLoading(false))
  };

  return (
    <div
      style={{ background: 'url("/bg.jpg")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center"
    >
      <div className=" py-3 text-pink-500 flex gap-1 items-center">
        <IconHeartbeat size={45} stroke={2.5} />
        <span className="font-heading font-semibold text-4xl">Pulse</span>
      </div>
      <div className="w-[450px] backdrop-blur-md p-10 py-8 rounded-lg">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:text-white focus-within:[&_.mantine-Input-input]:!border-pink-400"
        >
          <div className="self-center font-medium font-heading text-white text-xl">
            Register
          </div>
          <SegmentedControl
            color="pink"
            {...form.getInputProps("role")}
            fullWidth
            size="md"
            radius="md"
            bg="none"
            className="[&_*]:!text-white border border-white"
            data={[
              { label: "Patient", value: "PATIENT" },
              { label: "Doctor", value: "DOCTOR" },
              { label: "Admin", value: "Admin" },
            ]}
          />
          <TextInput
            className="transition duration-300"
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            className="transition duration-300"
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            className="transition duration-300"
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            className="transition duration-300"
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Confirm Password"
            {...form.getInputProps("confirmPassword")}
          />
          <Button loading={loading} radius="md" size="md" type="submit" color="pink">
            Register
          </Button>
          <div className="text-neutral-100 text-sm self-center">
            Have an account?{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
