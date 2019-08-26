import request from '@/utils/request';

const URL = '/api/';

export async function add(data: any): Promise<any> {
  return request(URL, {
    method: 'POST',
    body: data,
  });
}

export async function update(id: string, data: any): Promise<any> {
  return request(URL, {
    method: 'POST',
    body: {
      ...data,
      id,
    },
  });
}

export async function remove(id: string): Promise<any> {
  return request(`${URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function select(id: string): Promise<any> {
  return request(`${URL}/${id}`, {
    method: 'get',
  });
}
