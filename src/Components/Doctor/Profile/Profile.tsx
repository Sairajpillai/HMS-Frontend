import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TextInput
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDoctor, updateDoctor } from "../../../Service/DoctorProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import { doctorDepartments, doctorSpecializations } from "../../Data/DropDown";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";

const doctor:any = {
  name: "Dr. Priya Sharma",
  email: "priya.sharma@hospital.com",
  dob: "1982-09-20",
  phone: "+91 9876543210",
  address: "Pune",
  licenseNo: "MHMC-2021-4567",
  specialization: "Cardiologist",
  department: "Cardiology",
  totalExp: 12
};

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [opened,{open,close}] = useDisclosure(false);
  const [profile, setProfile] = useState<any>({});
    useEffect(() => {
      console.log(user);
      getDoctor(user.profileId)
        .then((data) => {
          console.log(data);
          setProfile({
            ...data,
            
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const form = useForm({
      initialValues: {
        dob: '',
        phone: '',
        address: '',
        licenseNo: '',
        specialization: '',
        department: '',
        totalExp: '',
      },
  
      validate: {
        // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        dob: (value: any) => (!value ? "Date Of Birth is required" : undefined),
        phone: (value: any) => (!value ? "Phone number is required" : undefined),
        address: (value: any) => (!value ? "Address is required" : undefined),
        licenseNo: (value: any) =>
          !value ? "License Number is required" : undefined,
      },
    });
  
    const handleSubmit = (e: any) => {
      let values = form.getValues();
      form.validate();
      if (!form.isValid()) return;
      console.log(values);
      updateDoctor({
        ...profile,
        ...values,
      })
        .then((_data) => {
          successNotification("Profile Updated successfully");
          setProfile({...profile,...values});
          setEditMode(false);
        })
        .catch((error) => {
          errorNotification(error.response.data.errorMessage);
        });
    };
  
    const handleEdit = () => {
      form.setValues({
        ...profile,
       dob:profile.dob?new Date(profile.dob):undefined,
      });
      setEditMode(true);
    };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar
              variant="filled"
              src="avatar.png"
              size="{150}"
              alt="it's me"
            />
            {editMode && (
              <Button
                onClick={open}
                size="sm"
                variant="filled"
              >
                Upload
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl font-medium text-neutral-900">
              {user.name}
            </div>
            <div className="text-xl font-medium text-neutral-300">
              {user.email}
            </div>
          </div>
          {!editMode ? (
                      <Button
                        type="button"
                        onClick={handleEdit}
                        size="lg"
                        variant="filled"
                        leftSection={<IconEdit />}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        size="lg"
                        variant="filled"
                      >
                        Submit
                      </Button>
                    )}
        </div>
      </div>
      <Divider my="xl"></Divider>
      <div>
        <div>
          <div className="text-2xl font-medium mb-5 text-neutral-900">
            Personal Information
          </div>
          <Table
            striped
            withRowBorders={false}
            stripedColor="primary.1"
            verticalSpacing="md"
          >
            <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
              <Table.Tr>
                <Table.Td className="font-semibold text-xl">
                  Date Of Birth
                </Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <DateInput
                      {...form.getInputProps("dob")}
                      placeholder="Date Of Birth"
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {formatDate(profile.dob) ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">Phone</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <NumberInput
                      placeholder="Phone Number"
                      hideControls
                      maxLength={10}
                      clampBehavior="strict"
                      {...form.getInputProps("phone")}
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {profile.phone ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">Address</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <TextInput
                      {...form.getInputProps("address")}
                      placeholder="Enter address"
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {profile.address ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>


              <Table.Tr>
                <Table.Td className="font-semibold text-xl">License No</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <TextInput
                    {...form.getInputProps("licenseNo")}
                      placeholder="License Number"
        
                      maxLength={12}
                      
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">{profile.licenseNo ?? "None"}</Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">
                  Specialization
                </Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <Select
                    {...form.getInputProps("specialization")}
                      placeholder="Select Specialization"
                      data={doctorSpecializations}
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">{doctor.specialization}</Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">Department</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <Select
                    {...form.getInputProps("department")}
                      placeholder="Select Department"
                      data={doctorDepartments}
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {doctor.department || "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">
                  Total Expirence
                </Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <NumberInput
                    {...form.getInputProps("totalExp")}
                      placeholder="Total Exprience"
                      hideControls
                      maxLength={2}
                      max={50}
                      clampBehavior="strict"
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {profile.totalExp ?? "None"}{profile.totalExp ? ' years':''}
                  </Table.Td>
                )}
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <Modal centered opened={opened} onClose={close} title={<span className="text-xl medium">Upload Profile Picture</span>}>
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Profile;
