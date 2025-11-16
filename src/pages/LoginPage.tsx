import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeartbeat } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/UserService";
import { setJwt } from "../Slices/JwtSlice";
import { setUser } from "../Slices/UserSlice";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";

const LoginPage = () => {

  const dispatch = useDispatch();

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: " ",
      password: " ",
    },

    validate: {
      email: (value:string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value:string) => (!value ? "Password is required" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);
    console.log(values);
    loginUser(values).then((_data)=>{
      dispatch(setJwt(_data));
      dispatch(setUser(jwtDecode(_data)));
      successNotification("Logged in Successfully")
    }).catch((error)=>{
      errorNotification(error?.response?.data?.errorMessage)
    }).finally(()=>setLoading(false));
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
            Login
          </div>
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
          <Button loading={loading} radius="md" size="md" type="submit" color="pink">
            Login
          </Button>
          <div className="text-neutral-100 text-sm self-center">Don't have an account? <Link to="/register" className="hover:underline" >Register</Link></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
