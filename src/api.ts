import axios from "axios";

const haApi = axios.create({
  baseURL: `http://supervisor/core/api/services`,
  headers: {
    Authorization: `Bearer ${process.env.SUPERVISOR_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function changeHaSensorValue(
  service: "turn_on" | "turn_off",
  entityId: string
): Promise<any> {
  try {
    await haApi.post(`/input_boolean/${service}`, {
      entity_id: `input_boolean.${entityId}`,
    });
  } catch (err) {
    console.log("HA api error");
    console.log(err);
  }
}
