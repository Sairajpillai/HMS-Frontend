import {
  Badge,
  Breadcrumbs,
  Card,
  Divider,
  Group,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import {
  IconClipboardHeart,
  IconStethoscope,
  IconVaccine,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAppointmentDetails } from "../../../Service/AppointmentService";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import ApReport from "./ApReport";
import Prescriptions from "./Prescriptions";

const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState<any>({});

  const { id } = useParams();

  useEffect(() => {
    getAppointmentDetails(id)
      .then((res) => {
        console.log("Appointment Details:", res);
        setAppointment(res);
      })
      .catch((err) => {
        console.log("Error fetching appointment details:", err);
      });
  }, [id]);

  return (
    <div>
      <Breadcrumbs mb="md">
        <Link
          className="text-primary-400 hover:underline"
          to="/doctor/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-primary-400 hover:underline"
          to="/doctor/appointments"
        >
          Appointments
        </Link>
        <Text className="text-primary-400">Details</Text>
      </Breadcrumbs>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="sm">
          <Title order={2}>{appointment.patientName}</Title>
          <Badge
            color={appointment.status === "CANCELLED" ? "red" : "green"}
            variant="light"
          ></Badge>
        </Group>
        <div className="grid grid-cols-2 gap-5 mb-2">
          <Text>
            <strong>Email:</strong>
            {appointment.patientEmail}
          </Text>
          <Text>
            <strong>Phone:</strong>
            {appointment.patientPhone}
          </Text>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Text>
            <strong>Reason:</strong>
            {appointment.reason}
          </Text>
          <Text>
            <strong>Appointment Time:</strong>
            {formatDateWithTime(appointment.appointmentTime)}
          </Text>
        </div>

        {appointment.notes && (
          <Text mt="sm" color="dimmed" size="sm">
            <strong>Notes:</strong>
            {appointment.notes}
          </Text>
        )}
      </Card>
      <Tabs my="mb" variant="pills" defaultValue="mdeical">
        <Tabs.List>
          <Tabs.Tab value="medical" leftSection={<IconStethoscope size={20} />}>
            Medical History
          </Tabs.Tab>
          <Tabs.Tab
            value="prescriptions"
            leftSection={<IconVaccine size={20} />}
          >
            Prescriptions
          </Tabs.Tab>
          <Tabs.Tab
            value="report"
            leftSection={<IconClipboardHeart size={20} />}
          >
            Reports
          </Tabs.Tab>
        </Tabs.List>
        <Divider my="md" />

        <Tabs.Panel value="medical">Medical</Tabs.Panel>

        <Tabs.Panel value="prescriptions">
          <Prescriptions appointment={appointment} />
        </Tabs.Panel>

        <Tabs.Panel value="report">
          <ApReport appointment={appointment} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AppointmentDetails;
