import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getPatient,
  updatePatient,
} from "../../../Service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { arrayToCsv } from "../../../Utility/OtherUtility";
import { bloodGroup, bloodGroups } from "../../Data/DropDown";

const patient: any = {
  name: "John Doe",
  email: "john@gmail.com",
  dob: "1990-05-15",
  phone: "+91 8956231245",
  address: "Mumbai",
  aadharNo: "1234-5678-9012",
  bloodGroup: "O+",
  allergies: "Peanuts",
  chronicDisease: "Diabetes",
};

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    console.log(user);
    getPatient(user.profileId)
      .then((data) => {
        console.log(data);
        setProfile({
          ...data,
          allergies: data.allergies
            ?JSON.parse(data.allergies)
            : null,
          chronicDisease: data.chronicDisease
            ? JSON.parse(data.chronicDisease)
            : null,
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
      aadharNo: '',
      bloodGroup: '',
      allergies: [],
      chronicDisease: [],
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      dob: (value: any) => (!value ? "Date Of Birth is required" : undefined),
      phone: (value: any) => (!value ? "Phone number is required" : undefined),
      address: (value: any) => (!value ? "Address is required" : undefined),
      aadharNo: (value: any) =>
        !value ? "Aadhar Number is required" : undefined,
    },
  });

  const handleSubmit = (e: any) => {
    let values = form.getValues();
    form.validate();
    if (!form.isValid()) return;
    console.log(values);
    updatePatient({
      ...profile,
      ...values,
      allergies: values.allergies ? JSON.stringify(values.allergies) : null,
      chronicDisease: values.chronicDisease
        ? JSON.stringify(values.chronicDisease)
        : null,
    })
      .then((data) => {
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
      dob: profile.dob ? new Date(profile.dob) : undefined,
      chronicDisease: profile.chronicDisease ?? [],
      allergies: profile.allergies ?? [],
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
              <Button onClick={open} size="sm" variant="filled">
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
                <Table.Td className="font-semibold text-xl">Aadhar No</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <NumberInput
                      placeholder="Aadhar Number"
                      hideControls
                      maxLength={12}
                      clampBehavior="strict"
                      {...form.getInputProps("aadharNo")}
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {profile.aadharNo ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">
                  Blood Group
                </Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <Select
                      {...form.getInputProps("bloodGroup")}
                      placeholder="Select Bloodgroup"
                      data={bloodGroups}
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {bloodGroup[profile.bloodGroup] ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">Allergies</Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <TagsInput
                      {...form.getInputProps("allergies")}
                      placeholder="Enter Allergies seperated by comma"
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {arrayToCsv(profile.allergies) ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>

              <Table.Tr>
                <Table.Td className="font-semibold text-xl">
                  Chronic Diseases
                </Table.Td>
                {editMode ? (
                  <Table.Td className="text-xl">
                    <TagsInput
                      {...form.getInputProps("chronicDisease")}
                      placeholder="Enter Chronic Diseases seperated by comma"
                    />
                  </Table.Td>
                ) : (
                  <Table.Td className="text-xl">
                    {arrayToCsv(profile.chronicDisease) ?? "None"}
                  </Table.Td>
                )}
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={<span className="text-xl medium">Upload Profile Picture</span>}
      >
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Profile;
