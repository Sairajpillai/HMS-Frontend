import {
  ActionIcon,
  Button,
  Fieldset,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { frequencies, symptoms, tests } from "../../Data/DropDown";
import { IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { createAppointmentReport } from "../../../Service/AppointmentService";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { useDispatch } from "react-redux";

type Medicine = {
  name: string;
  medicineId?: number;
  dosage: string;
  frequency: string;
  duration: number;
  route: string;
  type: string;
  instructions: string;
  prescriptionId?: number;
};

const ApReport = ({ appointment }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      symptoms: [],
      tests: [],
      diagnosis: "",
      referral: "",
      notes: "",
      prescription: {
        medicines: [] as Medicine[],
      },
    },
    validate: {
      symptoms: (value) =>
        value.length > 0 ? null : "Please select at least one symptom",
      diagnosis: (value) => (value?.trim() ? null : "Diagnosis is required"),
      prescription: {
        medicines: {
          name: (value) => (value?.trim() ? null : "MEdicine is required"),
          dosage: (value) => (value?.trim() ? null : "Dosage is required"),
          frequency: (value) => (value ? null : "Frequency is required"),
          duration: (value) =>
            value > 0 ? null : "Duration must be greater than 0",
          route: (value) => (value ? null : "Route is required"),
          type: (value) => (value ? null : "Type is required"),
          instructions: (value) =>
            value?.trim() ? null : "Instructions are required",
        },
      },
    },
  });
  const insertMedicine = () => {
    form.insertListItem("prescription.medicines", {
      name: "",
      dosage: "",
      frequency: "",
      duration: 0,
      route: "",
      type: "",
      instructions: "",
    });
  };
  const removeMedicine = (index: number) => {
    form.removeListItem("prescription.medicine", index);
  };
  const handleSubmit = (values: typeof form.values) => {
    console.log("values", values);
    let data = {
      ...values,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      appointmentId: appointment.id,
      prescription: {
        ...values.prescription,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        appointmentId: appointment.id,
      },
    };
    setLoading(true);
    createAppointmentReport(data)
      .then((res) => {
        successNotification("Report Created successfully");
        form.reset();
      })
      .catch((err) => {
        errorNotification(
          err?.response?.data?.errorMessage || "Failed to create report"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
      <Fieldset
        className="grid gap-4 grid-cols-2"
        legend={
          <span className="text-lg font-medium text-primary-500">
            Personal information
          </span>
        }
        radius="md"
      >
        <MultiSelect
          {...form.getInputProps("symptoms")}
          className="col-span-2"
          withAsterisk
          label="Symptoms"
          placeholder="Pick symptoms"
          data={symptoms}
        />
        <MultiSelect
          {...form.getInputProps("tests")}
          className="col-span-2"
          label="Tests"
          placeholder="Pick tests"
          data={tests}
        />
        <TextInput
          {...form.getInputProps("diagnosis")}
          withAsterisk
          label="Diagnosis"
          placeholder="Enter Diagnosis"
        />
        <TextInput
          {...form.getInputProps("referral")}
          label="Referral"
          placeholder="Enter Referral"
        />

        <Textarea
          {...form.getInputProps("notes")}
          className="col-span-2"
          label="Notes"
          placeholder="Enter any additional notes"
        />
      </Fieldset>
      <Fieldset
        className="grid gap-5"
        legend={
          <span className="text-lg font-medium text-primary-500">
            Prescription
          </span>
        }
        radius="md"
      >
        {form.values.prescription.medicines.map(
          (_medicine: Medicine, index: number) => (
            <Fieldset
              legend={
                <div className="flex items-center gap-5">
                  <h1 className="text-lg font-medium">Medicine {index + 1}</h1>
                  <ActionIcon
                    onClick={() => removeMedicine(index)}
                    variant="filled"
                    color="red"
                    size="md"
                    className="mb-2"
                  >
                    <IconTrash></IconTrash>
                  </ActionIcon>
                </div>
              }
              className="grid gap-4 col-span-2 grid-cols-2"
            >
              <div className="flex col-span-2 items-center justify-between">
                <h1 className="text-lg font-medium">Medicine {index + 1}</h1>
                <ActionIcon
                  onClick={() => removeMedicine(index)}
                  variant="filled"
                  color="red"
                  size="lg"
                  className="mb-2"
                >
                  <IconTrash></IconTrash>
                </ActionIcon>
              </div>
              <TextInput
                {...form.getInputProps(`prescription.medicines.${index}.name`)}
                withAsterisk
                label="Medicine"
                placeholder="Enter Medicine Name"
              />
              <TextInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.dosage`
                )}
                label="Dosage"
                placeholder="Select Dosage"
                withAsterisk
              />
              <Select
                {...form.getInputProps(
                  `prescription.medicines.${index}.frequency`
                )}
                withAsterisk
                label="Frequency"
                placeholder="Select Frequency"
                data={frequencies}
              />
              <NumberInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.duration`
                )}
                label="Duration (days)"
                placeholder="Enter duration in days"
                withAsterisk
              ></NumberInput>
              <Select
                {...form.getInputProps(`prescription.medicines.${index}.route`)}
                label="Route"
                placeholder="Select route"
                withAsterisk
                data={["Oral", "Intravenous", "Topical", "Inhalation"]}
              />
              <Select
                {...form.getInputProps(`prescription.medicines.${index}.type`)}
                label="Type"
                placeholder="Select type"
                withAsterisk
                data={["Tablet", "Syrup", "Injection", "Capsule", "Ointment"]}
              />
              <TextInput
                {...form.getInputProps(
                  `prescription.medicines.${index}.instructions`
                )}
                label="Instructions"
                placeholder="Enter Instructions"
                withAsterisk
              />
            </Fieldset>
          )
        )}
        <div className="flex items-start col-span-2 justify-center">
          <Button
            onClick={insertMedicine}
            variant="outline"
            color="primary"
            className="col-span-2"
          >
            Add Medicine
          </Button>
        </div>
      </Fieldset>
      <div className="flex justify-center gap-5 justify-center">
        <Button
          loading={loading}
          type="submit"
          className="w-full"
          variant="filled"
          color="primary"
        >
          Submit Report
        </Button>
        <Button loading={loading} variant="filled" color="red">
          Submit Report
        </Button>
      </div>
    </form>
  );
};

export default ApReport;
