/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://todo-backend-ogqc.onrender.com/api'

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}


type RequestMethod = 'GET' | 'POST' | 'PUT' |'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, 
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>() => request<{ data: T[][] }>('/todos'),
  // get: <T>() => request<T>('/todos'),
  post: <T>(data: any) => request<T>('/todos','POST', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
