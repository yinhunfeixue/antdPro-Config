export interface IUserData {
  id: string;
  name: string;
  age?: number;
}

export function createEmptyUserData() {
  return {
    id: Math.random().toString(),
    name: '',
  };
}

export function fillUserData(orgData: IUserData, newData: IUserData) {
  const id = orgData.id;
  for (let key in orgData) {
    orgData[key] = newData[key];
  }
  orgData.id = id;
}
