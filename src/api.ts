import axios, { AxiosPromise } from "axios";

const haApi = axios.create({
  baseURL: `http://${process.env.HA_DOMAIN}/services`,
  headers: {
    Authorization: `Bearer ${process.env.SUPERVISOR_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export function changeHaSensorValue(
  service: "turn_on" | "turn_off",
  entityId: string
): AxiosPromise<{
  attributes: object;
  entity_id: string;
  last_changed: string;
  state: string;
}> {
  return haApi.post(`/input_boolean/${service}`, {
    entity_id: `input_boolean.${entityId}`,
  });
}
