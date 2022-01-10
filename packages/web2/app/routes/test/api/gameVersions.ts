import axios from "axios";
import { json, redirect } from "remix";
import { RESTRICTED_TYPE_IDS } from "~/constants";

export const loader = () => {
  return redirect('/');
};

// TODO: Move into utils?
const filterGameVersions = (gameVersions: GameVersion[]) => {
  return gameVersions.filter((el) => !RESTRICTED_TYPE_IDS.includes(el.type));
};

const fetchGameVersions = async () => {
  const response = await axios.get('http://localhost:3001/api/versions');
  return filterGameVersions(response.data);
};

export const action = async () => {
  return await fetchGameVersions();
};
